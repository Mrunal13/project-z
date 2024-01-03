// pages/api/nameSuggest.ts
import { NextApiRequest, NextApiResponse } from "next";

const openaiApiEndPoint = process.env.OPENAI_API_ENDPOINT;
const openaiApiKey = process.env.OPENAI_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  try {
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Invalid name parameter" });
    }

    // Make a request to the OpenAI API to suggest names using fetch
    const response = await fetch(
      `${openaiApiEndPoint}/engines/davinci-codex/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          prompt: `Suggest brandnames similar to ${name}`,
          max_tokens: 15,
          n: 10,
          stop: "\n",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Extract suggested names from the response
    const responseData = await response.json();
    const suggestedNames = responseData.choices.map((choice: any) =>
      choice.text.trim()
    );

    res.status(200).json({ suggestedNames });
  } catch (error) {
    console.error("Error suggesting names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default handler;
