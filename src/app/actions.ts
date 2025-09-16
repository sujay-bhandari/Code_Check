'use server';
export type IdentifyAndExplainCodeErrorsOutput = {
  errors: Array<{
    filePath: string;
    lineNumber: number;
    errorDescription: string;
    suggestedFix?: string;
  }>;
};
import fs from 'fs/promises';
import path from 'path';

// Unsafe: In a real-world scenario, you would use a database for this.
// This is a simplified example for demonstration purposes.
// This file-based approach is not safe for concurrent requests.
const countFilePath = path.join(process.cwd(), 'visitor-count.txt');
const starCountFilePath = path.join(process.cwd(), 'star-count.txt');

async function readCount(filePath: string): Promise<number> {
  try {
    const count = await fs.readFile(filePath, 'utf-8');
    return parseInt(count, 10);
  } catch (error) {
    // If the file doesn't exist, create it with 0.
    await fs.writeFile(filePath, '0');
    return 0;
  }
}

export async function getVisitorCount(): Promise<number> {
  const currentCount = await readCount(countFilePath);
  const newCount = currentCount + 1;
  await fs.writeFile(countFilePath, newCount.toString());
  return newCount;
}

export async function getStarCount(): Promise<number> {
  return readCount(starCountFilePath);
}

export async function incrementStarCount(): Promise<number> {
  const currentCount = await readCount(starCountFilePath);
  const newCount = currentCount + 1;
  await fs.writeFile(starCountFilePath, newCount.toString());
  return newCount;
}

export async function analyzeRepository(
  repoUrl: string
): Promise<{
  success: boolean;
  data?: IdentifyAndExplainCodeErrorsOutput;
  error?: string;
}> {
  const GITHUB_REPO_REGEX = /^https:\/\/github\.com\/[^/]+\/[^/]+(?:\.git)?\/?$/;
  if (!repoUrl || !GITHUB_REPO_REGEX.test(repoUrl)) {
    return {
      success: false,
      error:
        'Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).',
    };
  }

  console.log(`[AUDIT] Analysis requested for: ${repoUrl} at ${new Date().toISOString()}`);

  // Placeholder deterministic result to keep app functional without external AI
  const demoResult: IdentifyAndExplainCodeErrorsOutput = {
    errors: [
      {
        filePath: 'src/app/page.tsx',
        lineNumber: 1,
        errorDescription:
          'Demo result: Static analysis placeholder. Replace with real analysis later.',
      },
    ],
  };

  return { success: true, data: demoResult };
}
