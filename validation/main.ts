import * as neo4j from "neo4j-driver";

import Claude_Haiku_4_5 from "../queries/claude-haiku-4.5.json" with { type: "json" };
import Claude_Sonnet_4_6 from "../queries/claude-sonnet-4.6.json" with { type: "json" };
import DeepSeek_V3_2 from "../queries/deepseek-v3.2.json" with { type: "json" };
import GPT_5_3 from "../queries/gpt-5.3.json" with { type: "json" };
import Gemini_3_Flash from "../queries/gemini-3-flash.json" with { type: "json" };
import Gemini_3_1_Pro from "../queries/gemini-3.1-pro.json" with { type: "json" };
import Grok_4_20 from "../queries/grok-4.20.json" with { type: "json" };
import Qwen3_5_Plus from "../queries/qwen3.5-plus.json" with { type: "json" };
import Qwen3_5_Flash from "../queries/qwen3.5-flash.json" with { type: "json" };
import Mistral_Large_2_1 from "../queries/mistral-large-2.1.json" with { type: "json" };
import GLM_5 from "../queries/glm-5.json" with { type: "json" };
import Llama_4_Scout from "../queries/llama-4-scout.json" with { type: "json" };

const allQueries = {
  "Claude Haiku 4.5": Claude_Haiku_4_5,
  "Claude Sonnet 4.6": Claude_Sonnet_4_6,
  "DeepSeek V3.2": DeepSeek_V3_2,
  "GPT-5.3": GPT_5_3,
  "Gemini 3 Flash": Gemini_3_Flash,
  "Gemini 3.1 Pro": Gemini_3_1_Pro,
  "Grok 4.20": Grok_4_20,
  "Qwen3.5 Plus": Qwen3_5_Plus,
  "Qwen3.5 Flash": Qwen3_5_Flash,
  "Mistral Large 2.1": Mistral_Large_2_1,
  "GLM-5": GLM_5,
  "Llama 4 Scout": Llama_4_Scout,
};

async function main() {
  const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "password"),
  );

  await driver.verifyConnectivity();

  let totalErrors = 0;

  for (const [model, queries] of Object.entries(allQueries)) {
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];

      try {
        const { summary } = await driver.executeQuery(query);
        console.log(
          `[${model}] Success after ${summary.resultAvailableAfter}ms (${i + 1}/${queries.length})`,
        );
      } catch (error) {
        totalErrors++;
        const e = error as neo4j.Neo4jError;
        console.error(`[${model}] Error\nQuery: ${query}\n`, e.message);
      }
    }
  }

  const totalQueries = Object.values(allQueries).reduce(
    (sum, queries) => sum + queries.length,
    0,
  );
  console.log(`Errors: ${totalErrors}/${totalQueries}`);

  await driver.close();
}

if (import.meta.main) main();
