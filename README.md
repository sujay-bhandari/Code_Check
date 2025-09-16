# CodeCheck: AI-Powered Code Analysis

<div align="center">
  
</div>

<div align="center">
  <br />
  <p>
    <strong>Find Bugs Before They Find You.</strong>
  </p>
  <p>
    An AI-powered code reviewer that scans any public GitHub repository for bugs, errors, and potential improvements.
  </p>
</div>

## About The Project

CodeCheck is a web application built to demonstrate the power of generative AI in code analysis. Users can simply paste a URL to a public GitHub repository, and the AI assistant will perform a review of the codebase. It identifies potential issues, explains them in plain English, and even suggests fixes.

This project was built with a modern tech stack and showcases how to integrate Google's Gemini AI into a Next.js application using Genkit.

## Features

- **AI-Powered Code Analysis**: Leverages the Gemini AI model to intelligently scan code.
- **Analyze Any Public Repository**: Simply provide a GitHub URL to start the analysis.
- **Detailed Issue Reports**: Get clear descriptions of found errors, including file path and line number.
- **Suggested Fixes**: Receive AI-generated code snippets to resolve identified issues.
- **Clean & Responsive UI**: A modern interface built with ShadCN UI and Tailwind CSS.

## Built With

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) with [Google AI (Gemini)](https://ai.google/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the root of the project.
    -   Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Add your key to the `.env` file:
        ```env
        GEMINI_API_KEY=your_api_key_here
        ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## License

Distributed under the MIT License. See `LICENSE` for more information.
