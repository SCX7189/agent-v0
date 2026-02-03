import { Agent, run } from "openai/agents";

const agent = new Agent({
  name: "agent-v0",
  model: "gpt-4.1-mini",
  instructions:
    "Comportement neutre. Réponses claires et structurées. Aucune hypothèse.",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages } = req.body ?? {};

    if (!Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }

    const result = await run(agent, { messages });
    const output =
      result?.final_output ??
      result?.finalOutput ??
      result?.final?.output_text ??
      result?.output_text ??
      "";

    res.status(200).json({ message: output });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}
