
import agent from "../../AI/Agent.js";
import {StringOutputParser} from "@langchain/core/output_parsers"
import e from "express";
import { HumanMessage } from "@langchain/core/messages";


const AiChatController = async (req, res) => {
  try {
    const { message } = req.body;
    const { token } = req.headers;
    
    

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "❌ Message is required.",
      });
    }

 

    // ✅ Send input as a LangChain HumanMessage
    const result = await agent.invoke(
      {messages: [new HumanMessage(message)]},
     
        { configurable: { token ,thread_id: req.headers["thread_id"] || "global-session"} }, //context passing
          
    );

    const parser = new StringOutputParser();

    // ✅ The agent returns { messages: [...] }
     const rawOutput =
      result?.output_text ||
      result?.output ||
      result?.messages?.at(-1)?.content ||
      "";

    const parsedOutput = await parser.invoke(rawOutput);
  
    const finalReply =
      parsedOutput
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        ?.replace(/\n/g, " ") || "🤖 No response generated.";

    return res.status(200).json({
      success: true,
      reply: finalReply.trim(),
    });

  } catch (error) {
    console.error(" AiChatController Error:", error);
    return res.status(500).json({
      success: false,
      reply: " Something went wrong while processing your request.",
    });
  }
};

export default AiChatController;