import { type IdentifyAndExplainCodeErrorsOutput } from '@/app/actions';
import { AlertTriangle, FileText, Lightbulb } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type ErrorDisplayProps = {
  results: IdentifyAndExplainCodeErrorsOutput;
  repoUrl: string;
};

export function ErrorDisplay({ results, repoUrl }: ErrorDisplayProps) {
  const repoName = new URL(repoUrl).pathname.slice(1);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Analysis Complete</h2>
        <p className="text-muted-foreground mt-2">
          Found {results.errors.length} potential issue
          {results.errors.length !== 1 ? 's' : ''} in{' '}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {repoName}
          </a>
          .
        </p>
      </div>

      <div className="space-y-6">
        {results.errors.map((error, index) => (
          <Card
            key={index}
            className="overflow-hidden shadow-sm transition-all hover:shadow-lg"
          >
            <CardHeader className="bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Potential Issue Found
                  </CardTitle>
                  <CardDescription className="mt-2 flex items-center gap-2 flex-wrap">
                    <FileText className="h-4 w-4" />
                    <span className="font-mono break-all">{error.filePath}</span>
                    <Badge variant="outline">Line: {error.lineNumber}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Description
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {error.errorDescription}
                </p>
              </div>

              {error.suggestedFix && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      Suggested Fix
                    </h4>
                    <div className="rounded-md bg-muted/50 p-4 overflow-x-auto">
                      <pre>
                        <code className="font-code text-sm text-foreground">
                          {error.suggestedFix}
                        </code>
                      </pre>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
