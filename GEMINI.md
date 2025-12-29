# RIA Command Center

## Project Overview

This is a React-based web application designed to help Registered Investment Advisors (RIAs) evaluate and select technology vendors. It uses a weighted scoring model to rank vendors based on various categories, and it leverages the Gemini API to provide AI-powered insights and analysis. The application is built with Vite, TypeScript, and React, and it uses Firebase for its database and backend services.

The core of the application is a vendor comparison tool that allows users to assign weights to different categories (e.g., "CRM", "Financial Planning", "Portfolio Management") and then see a ranked list of vendors based on their scores in those categories. The application also provides detailed information about each vendor, including their pros and cons, and it uses the Gemini API to generate an executive summary of the top-ranked vendor and to compare vendors against each other.

The application is divided into three main modules:

*   **Vendors:** This is the main module of the application, and it contains the vendor comparison tool.
*   **AI Research:** This module provides a view for conducting AI-powered research.
*   **mini-apps & infographics:** This module contains a collection of smaller applications and infographics.

## Building and Running

To build and run the project, you will need to have Node.js and npm installed.

1.  Install the dependencies:

    ```
    npm install
    ```

2.  Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.

3.  Run the application:

    ```
    npm run dev
    ```

## Development Conventions

The project follows standard conventions for React and TypeScript development.

*   **Components:** All React components are located in the `src/components` directory.
*   **Services:** All services that interact with external APIs (e.g., Firebase, Gemini) are located in the `src/services` directory.
*   **Types:** All TypeScript types are located in the `types.ts` file.
*   **Constants:** All constants are located in the `constants.ts` file.
*   **Styling:** The project uses Tailwind CSS for styling.
