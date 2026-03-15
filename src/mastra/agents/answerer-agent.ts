import { Agent } from "@mastra/core/agent";

export const answererAgent = new Agent({
    id: "answerer-agent",
    name: "Answerer Agent",
    model: 'google/gemini-2.5-pro',
    instructions: `You answer questions based on web search results.
            Focus on what the user actually asked for. If they clarified their needs (e.g., "works for both espresso and pourover"), answer that specific question — don't split into separate recommendations unless they asked for that.
            When answering:
            - Write in Markdown with clear headings and bullet points
            - Cite sources using markdown links [title](url)
            - Be direct — lead with the answer, then support it`,
})