import { NextResponse } from "next/server";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request, context: any) {
  const query = new URLSearchParams(request.url).values().next().value;

  console.log("You asked: ", query);

  if(!query) {
    return NextResponse.json({ data: [], message: "You did not provide question!" })
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    temperature: 0,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return NextResponse.json({ data: response.data })
}
