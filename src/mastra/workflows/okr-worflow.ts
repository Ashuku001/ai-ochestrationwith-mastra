import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

const stateSchema = z.object({
  companyVision: z.string().optional(),
  okrs: z.string().optional(),
  coachingAdvice: z.string().optional(),
  governanceSchedule: z.string().optional(),
  finalConsultingPackage: z.string().optional(),
});

const strategicStep = createStep({
  id: "refine-okrs",
  description: `Translates the company vision into well-structured OKRs`,
  inputSchema: z.object({ companyVision: z.string() }),
  outputSchema: z.object({}),
  stateSchema,
  execute: async ({ inputData, setState, mastra }) => {
    await setState({ companyVision: inputData.companyVision });

    const agent = mastra.getAgent("strategicMapperAgent");
    const res = await agent.generate(
      `Create refined OKRs for this goal: ${inputData.companyVision}`
    );

    await setState({ okrs: res.text });
    return {};
  },
});

const coachingStep = createStep({
  id: "cultural-coaching",
  description: `Adds people/mindset context — how the team should think and behave to achieve the OKRs`,
  inputSchema: z.object({}),
  outputSchema: z.object({}),
  stateSchema,
  execute: async ({ state, setState, mastra }) => {
    const agent = mastra.getAgent("culturalCoachAgent");
    const res = await agent.generate(
      `Provide coaching context for these OKRs: ${state.okrs}`
    );

    await setState({ coachingAdvice: res.text });
    return {};
  },
});

const governanceStep = createStep({
  id: "governance-planning",
  description: `Designs the operational rhythm — cadences, check-ins, review cycles`,
  inputSchema: z.object({}),
  outputSchema: z.object({}),
  stateSchema,
  execute: async ({ state, setState, mastra }) => {
    const agent = mastra.getAgent("governanceLeadAgent");
    const res = await agent.generate(
      `Design an operational rhythm for these OKRs: ${state.okrs}`
    );

    await setState({ governanceSchedule: res.text });
    return {};
  },
});

const combineStep = createStep({
  id: "combine-results",
  description: `Assembles all three outputs into a single consulting report`,
  inputSchema: z.object({
    "cultural-coaching": z.object({}),
    "governance-planning": z.object({}),
  }),
  outputSchema: z.object({combined: z.string()}),
  stateSchema,
  execute: async ({ state, setState }) => {
        const combined = `
            # OKR Strategy & Implementation Plan

            ## 1. Refined Objectives & Key Results
            ${state.okrs}

            ---

            ## 2. Cultural Coaching & Mindset
            ${state.coachingAdvice}

            ---

            ## 3. Operational Governance & Rhythm
            ${state.governanceSchedule}
                `.trim();

    return {combined}
  },
});

export const okrConsultationWorkflow = createWorkflow({
  id: "okr-consultation-workflow",
  description: `Company Vision Input
       ↓
[Strategic Mapper Agent]  → Refines raw vision into proper OKRs
       ↓
  ┌────┴────┐
  ↓         ↓         ← runs in PARALLEL
[Cultural   [Governance    
 Coach]      Lead]         
  ↓         ↓
  └────┬────┘
       ↓
[Combine Step] → Merges everything into one document`,
  inputSchema: z.object({ companyVision: z.string() }),
  outputSchema: z.object({
    finalConsultingPackage: z.string(),
  }),
  stateSchema, 
})
  .then(strategicStep)
  .parallel([coachingStep, governanceStep])
  .then(combineStep)
  .commit();