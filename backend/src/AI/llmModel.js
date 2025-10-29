import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import dotenv from "dotenv";
dotenv.config();

const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.APIKEY,
  model: "gemini-2.0-flash",
  temperature: 0.7,
 
});

export default gemini;