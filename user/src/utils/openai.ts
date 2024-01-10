export const createOpenAIAssistant = async (): Promise<string> => {
  const apiUrl = `${process.env.OPENAI_API_ENDPOINT}/assistants`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  const requestData = {
    instructions: "Automated website generator project",
    name: "Project Z",
    model: "gpt-3.5-turbo",
  };

  // Create a new assistant and get its ID
  const response: any = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestData),
  });
  const resp = await response.json();

  // Store the new assistant ID in .env
  process.env.OPENAI_ASSISTANT_ID = resp.id;

  return resp.id;
};

export const createOpenAIThread = async (): Promise<string> => {
  const apiUrl = `${process.env.OPENAI_API_ENDPOINT}/threads`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  // Create a new assistant and get its ID
  const response: any = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
  });
  const resp = await response.json();

  return resp.id;
};

interface Message {
  threadId: string;
  message: string;
}

export const createOpenAIMessage = async ({
  threadId,
  message,
}: Message): Promise<string> => {
  const apiUrl = `${process.env.OPENAI_API_ENDPOINT}/threads/${threadId}/messages`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  const prompt = {
    role: "user",
    content: message,
  };

  const response: any = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(prompt),
  });
  const resp = await response.json();
  return resp;
};

interface RunAssistant {
  openaiAssistantId: string;
  threadId: string;
  message: string;
}
interface RunAssistantResponse {
  id: string;
}

export const runOpenAIAssistant = async ({
  openaiAssistantId,
  threadId,
  message,
}: RunAssistant): Promise<RunAssistantResponse> => {
  const apiUrl = `${process.env.OPENAI_API_ENDPOINT}/threads/${threadId}/runs`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  const instrusctions = {
    assistant_id: openaiAssistantId,
    instructions: message,
  };

  const response: any = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(instrusctions),
  });
  const resp = await response.json();
  return resp;
};

interface CheckStatus {
  threadId: string;
  runId: string;
}
interface CheckStatusResponse {
  status: string;
}

export const checkOpenAIRunStatus = async ({
  threadId,
  runId,
}: CheckStatus): Promise<CheckStatusResponse> => {
  const apiUrl = `${process.env.OPENAI_API_ENDPOINT}/threads/${threadId}/runs/${runId}`;

  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  const response: any = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });

  const resp = await response.json();
  return resp;
};

interface GetResponse {
  threadId: string;
}

export const getOpenAIResponse = async ({
  threadId,
}: GetResponse): Promise<string> => {
  const apiUrl = `${process.env.OPENAI_API_ENDPOINT}/threads/${threadId}/messages`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  const response: any = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });

  const resp = await response.json();
  return resp;
};
