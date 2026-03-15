import { createTool } from '@mastra/core/tools'
import z from 'zod'
import { tavily } from '@tavily/core'

export const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const webSearch = createTool({
  id: 'exa-web-search',
  description: 'Search the web',
  inputSchema: z.object({
    query: z.string().min(1).max(50).describe('The search query'),
  }),
  outputSchema: z.array(
    z.object({
      title: z.string().nullable(),
      url: z.string(),
      content: z.string(),
      publishedDate: z.string().optional(),
    }),
  ),
  execute: async inputData => {
    const {results} = await client.search(inputData.query, {
        searchDepth: "advanced"
    })

    return results.map(result => ({
      title: result.title,
      url: result.url,
      content: result.content.slice(0, 500),
      publishedDate: result.publishedDate,
    }))
  },
})