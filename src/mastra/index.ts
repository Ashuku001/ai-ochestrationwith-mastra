
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { Observability, DefaultExporter, CloudExporter, SensitiveDataFilter } from '@mastra/observability';
import { toolCallAppropriatenessScorer, completenessScorer, translationScorer } from './scorers/weather-scorer';
import { okrAgent } from './agents/okr/supervisor';
import { intentClarifierAgent } from './agents/intent-clarifier-agent';
import { researchPlannerAgent } from './agents/research-planner-agent';
import { searchResultEvaluatorAgent } from './agents/search-result-evaluator-agent';
import { answererAgent } from './agents/answerer-agent';
import { deepSearch } from './workflows/deep-search-workflow';
import { docsManager } from './agents/docs-manager';
import { culturalCoachAgent } from './agents/okr/cultural-coach';
import { governanceLeadAgent } from './agents/okr/governance-lead';
import { strategicMapperAgent } from './agents/okr/strategic-mapper';
import { MastraEditor } from '@mastra/editor'

export const mastra = new Mastra({
  workflows: {  deepSearch },
  agents: { okrAgent, intentClarifierAgent, researchPlannerAgent, searchResultEvaluatorAgent, answererAgent, docsManager, culturalCoachAgent, governanceLeadAgent, strategicMapperAgent },
  scorers: { toolCallAppropriatenessScorer, completenessScorer, translationScorer },
  storage: new LibSQLStore({
    id: "mastra-storage",
    // stores observability, scores, ... into persistent file storage
    url: "file:./mastra.db",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra',
        exporters: [
          new DefaultExporter(), // Persists traces to storage for Mastra Studio
          new CloudExporter(), // Sends traces to Mastra Cloud (if MASTRA_CLOUD_ACCESS_TOKEN is set)
        ],
        spanOutputProcessors: [
          new SensitiveDataFilter(), // Redacts sensitive data like passwords, tokens, keys
        ],
      },
    },
  }),
  editor: new MastraEditor(),
});
