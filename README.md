# GenAI Client Intelligence

**Live Demo:** [https://gen-ai-client-intelligence.vercel.app/](https://gen-ai-client-intelligence.vercel.app/)

An AI-powered coaching dashboard prototype that automatically analyzes conversations between health coaches and clients. This tool extracts key metrics, flags risks, and tracks engagement, presenting them in a beautiful, human-in-the-loop review dashboard.

## Features

- **Deep Evidence Grounding:** Every extracted insight is strictly categorized into one of four buckets:
  - ✅ `Confirmed Fact` (Objective, observable facts)
  - 🗣 `Client Report` (Subjective feelings, symptoms, or opinions)
  - 🧠 `AI Inference` (Logical, cautiously-worded conclusions)
  - ❓ `Missing Information` (Explicit mentions of missing data)
- **Multi-Model Fallback System:** Uses the OpenRouter API to route requests through a fallback array of powerful LLMs (Gemma 4 31B, Nemotron 120B, Cohere, etc.). If one model hits a rate limit or fails, it seamlessly falls back to the next.
- **Human-in-the-Loop Review:** Coaches can explicitly "Approve", "Edit", or "Reject" the AI-generated insights before they are finalized.
- **Fast-Path Caching:** For demonstration purposes, running the default transcript bypasses the API to deliver a perfect, cached response instantly.
- **Responsive Dashboard:** A clean, light-themed masonry grid layout that maximizes horizontal screen real estate.
- **Accidental Navigation Protection:** Alerts you before leaving or refreshing the page if you have an unsaved report on your screen.

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amansheikh3110/GenAI-Client-Intelligence.git
   cd GenAI-Client-Intelligence
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the example `.env` file to create your own:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and replace `your_api_key_here` with your actual OpenRouter API key.
   - *Note: You can get a free API key by signing up at [OpenRouter.ai](https://openrouter.ai).*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL provided in your terminal (usually `http://localhost:5173`).

## Technologies Used

- **React + Vite:** For ultra-fast frontend development and HMR.
- **Vanilla CSS:** For custom, flexible, glassmorphism-inspired styling.
- **OpenRouter API:** To access state-of-the-art LLMs using a standardized endpoint.

## How It Works

1. The coach pastes the raw chat transcript between them and the client into the text area.
2. Clicking **Analyze Conversation** sends the transcript alongside a highly-detailed system prompt to the OpenRouter API.
3. The AI returns a strictly formatted JSON object that decomposes the conversation into specific, evidence-backed observations.
4. The React frontend maps this JSON into the dashboard grid, providing UI controls for the coach to verify the data.

## Assignment Alignment

This prototype was explicitly designed to fulfill advanced assignment requirements regarding **hallucination prevention** and **evidence traceability**. By forcing the AI to tag every statement with a specific evidence category and append the direct quote from the transcript, the coach can trust (and verify) exactly how the AI arrived at its conclusions.
