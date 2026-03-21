import { MCPClient } from '@mastra/mcp'

export const okrMcpClient = new MCPClient({
  id: 'okr-mcp-client',
  servers: {
    tenda_okr: {
      url: new URL("http://localhost:3500/mcp"),
      requestInit: {
        headers: {
          "x-api-key": "tenda_GXtIMlLYtyrQBXKohXuxaNeeXgVCThsEDDMovKwWxyJBZzNasOCIeeIzlVYvqIbX"
        },
      },
      connectTimeout: 6000 
    },
  },
})