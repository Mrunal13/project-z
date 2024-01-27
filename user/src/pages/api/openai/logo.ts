import { NextApiRequest, NextApiResponse } from "next";
import {
  createOpenAIAssistant,
  createOpenAIThread,
  createOpenAIMessage,
  runOpenAIAssistant,
  checkOpenAIRunStatus,
  getOpenAIResponse,
} from "@/utils/openai";
import {
  brandNameInstructions,
  generatePromptForBusinessName,
} from "@/utils/helper";

let openaiAssistantId: string | undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the request method is POST
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Bad Request: Invalid method" });
    }

    // Parse incoming JSON body
    const { industryCategory, industrySubCategory } = req.body;

    // Validate required data
    if (
      !industryCategory
      // || !industrySubCategory
    ) {
      return res.status(400).json({ message: "Bad Request: Missing data" });
    }

    // OpenAI Assistant
    openaiAssistantId = process.env.OPENAI_ASSISTANT_ID;

    // If Assistant ID is not available in .env, create a new assistant
    if (!openaiAssistantId) {
      openaiAssistantId = await createOpenAIAssistant();
    }

    // Step 2: Create OpenAI Thread
    const threadId = "thread_0dTpyQvhSuuAW7BpH43j0Un8";
    // const threadId = await createOpenAIThread();

    // Step 3: Send a message to OpenAI Thread
    const message = generatePromptForBusinessLogo({
      brandName,
      industryCategory,
      industrySubCategory,
    });

    await createOpenAIMessage({ threadId, message });

    // Step 4: Run OpenAI Assistant
    const runResponse = await runOpenAIAssistant({
      openaiAssistantId,
      threadId,
      message: brandNameInstructions,
    });

    const { id: runId } = runResponse;

    // Step 5: Check Run Status
    let runStatus = await checkOpenAIRunStatus({ threadId, runId });

    // Poll until the run is completed
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      runStatus = await checkOpenAIRunStatus({ threadId, runId });
    }
    // Step 6: Get OpenAI Response
    const response = await getOpenAIResponse({ threadId });
    //console.log(response.data[0].content[0].text.value,'generatePromptForBusinessName');
    // Return the OpenAI response
    return res.status(200).json(response);
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
}
