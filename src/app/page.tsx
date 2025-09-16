'use client';

import { useState, useEffect } from 'react';
import {
  SearchCode,
  Github,
  Loader2,
  ServerCrash,
  Eye,
  Star,
} from 'lucide-react';
import {
  analyzeRepository,
  getVisitorCount,
  getStarCount,
  incrementStarCount,
} from '@/app/actions';
import { type IdentifyAndExplainCodeErrorsOutput } from '@/app/actions';
import { CodeCheckForm } from '@/components/code-check-form';
import { ErrorDisplay } from '@/components/error-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IdentifyAndExplainCodeErrorsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [starCount, setStarCount] = useState<number | null>(null);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    async function fetchCounts() {
      const [visitors, stars] = await Promise.all([
        getVisitorCount(),
        getStarCount(),
      ]);
      setVisitorCount(visitors);
      setStarCount(stars);
    }
    fetchCounts();

    // Check if user has already starred from local storage
    if (localStorage.getItem('isStarred') === 'true') {
      setIsStarred(true);
    }
  }, []);

  const handleAnalysis = async (repoUrl: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setSubmittedUrl(repoUrl);

    const response = await analyzeRepository(repoUrl);

    if (response.success && response.data) {
      setResults(response.data);
    } else {
      setError(response.error || 'An unknown error occurred.');
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setError(null);
    setResults(null);
    setSubmittedUrl(null);
  };

  const handleStarClick = async () => {
    if (isStarred) return;

    // Optimistic UI update
    setStarCount((prev) => (prev !== null ? prev + 1 : 1));
    setIsStarred(true);
    localStorage.setItem('isStarred', 'true');

    try {
      // Sync with server
      await incrementStarCount();
    } catch (e) {
      // Revert if server call fails
      setStarCount((prev) => (prev !== null ? prev - 1 : 0));
      setIsStarred(false);
      localStorage.removeItem('isStarred');
      console.error('Failed to increment star count:', e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SearchCode className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold tracking-tighter">CodeCheck</h1>
          </div>
          <div className="flex items-center gap-4">
            {visitorCount !== null && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{visitorCount.toLocaleString()} Views</span>
              </div>
            )}
            <Button
              variant={isStarred ? 'default' : 'ghost'}
              size="sm"
              onClick={handleStarClick}
              disabled={isStarred}
              className="flex items-center gap-2"
            >
              <Star
                className={`h-4 w-4 ${isStarred ? 'text-yellow-300 fill-yellow-400' : ''}`}
              />
              <span className="hidden sm:inline">Star</span>
              {starCount !== null && (
                <span className="text-xs font-mono bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                  {starCount.toLocaleString()}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/sujay-bhandari/Code_Check"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {!submittedUrl && !isLoading && (
          <section className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-fit p-2 mx-auto mb-4 animate-pulse">
                <SearchCode className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Find Bugs Before They Find You
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Paste a public GitHub repository URL and let our AI assistant
                scan for bugs, errors, and potential improvements in your code.
              </p>

              <div className="mt-8">
                <CodeCheckForm
                  onFormSubmit={handleAnalysis}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 pb-12 md:pb-20 lg:pb-28">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h3 className="text-2xl font-semibold">
                Analyzing Repository...
              </h3>
              <p className="max-w-md text-muted-foreground">
                Our AI is diligently scanning your code. This may take a few
                moments.
              </p>
            </div>
          )}

          {error && !isLoading && (
            <div className="max-w-2xl mx-auto py-10 animate-in fade-in-50">
              <Alert variant="destructive">
                <ServerCrash className="h-4 w-4" />
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={handleReset}>
                  Try another repository
                </Button>
              </div>
            </div>
          )}

          {results && submittedUrl && !isLoading && (
            <div className="animate-in fade-in-50">
              <ErrorDisplay results={results} repoUrl={submittedUrl} />
              <div className="mt-8 text-center">
                <Button variant="default" size="lg" onClick={handleReset}>

                  Analyze Another Repository
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
