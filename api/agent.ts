import type { NextApiRequest, NextApiResponse } from "next";
import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "agent-v0",
  model: "gpt-4.1-mini",
  instructions: "Instructions simples (placeholder).",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages } = req.body ?? {};

    if (!Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages" });
      return;
    }

    const result = await run(agent, messages);

    res.status(200).json({ output: result.final_output });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
}
