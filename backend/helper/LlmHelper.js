const { ChatOllama } = require("@langchain/ollama")
const { ChatPromptTemplate } = require("@langchain/core/prompts")
const { SystemMessage, HumanMessage, AIMessage } = require("@langchain/core/messages")
const JsonResponse = require("./JsonResponse")
const Messages = require("../constants/Messages")
const axios = require("axios")
const conversationHistories = new Map()

const getOrCreateHistory = sessionId => {
  if (!conversationHistories.has(sessionId)) {
    // Initialize conversation history with the system message if it doesn't exist
    conversationHistories.set(sessionId, [new SystemMessage("Your work is to generate quiz questions and answer based on the users said topic and the difficulty level. Give your response as a JSON object as  question:, options: and answer : . Your response should be like this {question:What is the capital of France?, options: [Berlin, Madrid, Paris, Lisbon],correctAnswer:Paris} Generate 5 questions and answers on each topic.Make sure that your response is in Json format and question and answers are easily differentiable")])
  }
  return conversationHistories.get(sessionId)
}

exports.llmModel = async function (req, res) {
  const chatModel = new ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama3.1"
  })
  console.log(req.apiUser._id)
  const sessionId = req.apiUser._id // Using a header for session ID; use something appropriate for your case
  const conversationHistory = getOrCreateHistory(sessionId)

  const sendMessage = async input => {
    // Add user input to conversation history
    conversationHistory.push(new HumanMessage(input))

    // Create the prompt with the current conversation history
    const prompt = ChatPromptTemplate.fromMessages(conversationHistory)

    // Call the model with the updated prompt
    const response = await prompt.pipe(chatModel).invoke({})
    // Add model's response to the conversation history
    conversationHistory.push(new AIMessage(response.content))
    // Return the response content
    return response.content
  }

  // Extract the user input from the request body
  console.log(req.body.input)
  const userInput = req.body.input

  // Send the user input to the model and get the response
  const modelResponse = await sendMessage(userInput)
  // res.status(200).json({ response: modelResponse })

  new JsonResponse(req, res).jsonSuccess(modelResponse, new Messages().SUCCESSFULLY_GENERATED)
}
