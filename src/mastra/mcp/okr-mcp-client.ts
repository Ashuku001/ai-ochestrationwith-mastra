import { MCPClient } from '@mastra/mcp'

export const okrMcpClient = new MCPClient({
  id: 'okr-mcp-client',
  servers: {
    tenda_okr: {
      url: new URL("http://localhost:3500/mcp"),
      requestInit: {
        headers: {
          'Cookie': 'tenda.session_token=JabzpK9yPbrGkgnZUEmAsrW6LnYcfR2j.qCJnIBMDRTFLQzQA2X2ZTmrgmIXhqRBs5DxJUjowSWo%3D;',
        },
      },
      connectTimeout: 6000 
    },
  },
})