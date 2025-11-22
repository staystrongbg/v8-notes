import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const POST = async (request: Request) => {
  console.log('POST request to auth', request.url, request.method, await request.clone().text());
  try {
    const result = await handler.POST(request);
    console.log('Handler result status', result.status);
    return result;
  } catch (error) {
    console.error('Handler error', error);
    throw error;
  }
};

export const GET = async (request: Request) => {
  console.log('GET request to auth', request.url, request.method);
  try {
    const result = await handler.GET(request);
    console.log('Handler result status', result.status);
    return result;
  } catch (error) {
    console.error('Handler error', error);
    throw error;
  }
};
