import { Workspace, LocalFilesystem, LocalSandbox, WORKSPACE_TOOLS } from '@mastra/core/workspace'
import { resolve } from 'node:path'

const glolbalWorkspace = new Workspace({
  bm25: true,
  filesystem: new LocalFilesystem({
    basePath: resolve(import.meta.dirname, "../../workspace"),
  }),
  sandbox: new LocalSandbox({
    workingDirectory: './workspace',
  }),
  skills: ['/skills'],
  tools: {
    [WORKSPACE_TOOLS.SANDBOX.EXECUTE_COMMAND]: {
      requireApproval: true,
    },
    [WORKSPACE_TOOLS.FILESYSTEM.READ_FILE]: { name: 'view' },
    [WORKSPACE_TOOLS.FILESYSTEM.GREP]: { name: 'search_content' },
    [WORKSPACE_TOOLS.FILESYSTEM.LIST_FILES]: { name: 'find_files' },
  }
})

export {
    glolbalWorkspace
}