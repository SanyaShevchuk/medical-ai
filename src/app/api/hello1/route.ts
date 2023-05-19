import { NextResponse } from "next/server";
import path from "path";
const { readFileSync } = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OpenAIApiKey,
});
const openai = new OpenAIApi(configuration);

const openAIRequest = async (prompt: string) => {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
}


export async function GET(request: Request, context: any) {
  const query = new URLSearchParams(request.url).values().next().value;

  console.log("You asked:", query);

  if (!query) {
    return NextResponse.json({
      data: [],
      message: "You did not provide question!",
    });
  }
  // const fullPath = path.join(process.cwd(), 'src/app/api/hello/data.txt');
  const fullPath = path.join(process.cwd(), "src/app/api/hello/big-doc1.txt");
  let fileContents;
  try { 
    fileContents = readFileSync(fullPath, "utf8");
  } catch(error: any) {
    console.log('Error: can not read file', error?.message)
  }

  let contents = fileContents.split(' ');
  // TODO: algorithm to split context into 4000 tokens https://stackoverflow.com/a/74955497
  contents = [contents.slice(0, contents.length/2).join(' '), contents.slice(contents.length/2).join(' ')];


  let response;
  try {
    let prompt = contents[0] + "\n\n" + query;
    const response1 = await openAIRequest(prompt);
    console.log(response1?.data, 'response 1', prompt);
    prompt = contents[1] + "\n\n" + query;
    const response2 = await openAIRequest(prompt); 
    console.log(response2?.data, 'response 2', prompt);
    return NextResponse.json({ data: response2?.data });
  } catch (error: any) {
    console.log('Error: can not prompt such query', error.response.data);
    console.log('Error message:', error.message)
  }
  return NextResponse.json({ data: [] });
}