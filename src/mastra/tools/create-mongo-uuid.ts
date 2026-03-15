import { createTool } from "@mastra/core/tools";
import { ObjectId } from "bson";
import z from "zod";

export const mongoUuidGenerator = createTool({
    id: "mongoDB-uuid-generator",
    description: "Create a mongo db compatible uuid",
    inputSchema: z.object({}),
    outputSchema: z.object({id: z.string()}),
    execute: async inputData => {
        const id = new ObjectId();
        return {id: id.toString()};
    }
})
