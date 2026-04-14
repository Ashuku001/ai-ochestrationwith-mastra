import { Tool } from "@mastra/core/tools";

export const filterTools = (input: {toolList: Record<string, Tool>, targetIds: string[]}) => {
    return Object.fromEntries(
        Object.entries(input.toolList).filter(([id]) => input.targetIds.includes(id)),
    ) ?? {};
}