
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
     
        { configurable: { token } } //context passing
    );

    // ✅ The agent returns { messages: [...] }
    const aiMsg = result.messages[result.messages.length - 1]; // last message
    const parser = new StringOutputParser();
    const finalReply = await parser.parse(aiMsg.content); 

    return res.status(200).json({
      success: true,
      reply: finalReply,
    });

  } catch (error) {
    console.error("💥 AiChatController Error:", error);
    return res.status(500).json({
      success: false,
      reply: "😕 Something went wrong while processing your request.",
    });
  }
};

export default AiChatController;