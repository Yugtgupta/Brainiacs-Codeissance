 
const Messages = require("../constants/Messages");
  const JsonResponse = require("../helper/JsonResponse");
  const TryCatch = require("../helper/TryCatch");
  const Question = require("../models/Question");
const jwt = require("jsonwebtoken");

exports.createQuestion = async function(req, res){
  let question = new Question(req.body)
 let questionDoc = await question.createQuestion();
 new JsonResponse(req, res).jsonSuccess(questionDoc, "Created")
}

exports.getById = async function (req, res) {
  let question = new Question ()
let questionDoc = await question.getById(req.params.id)
new JsonResponse(req, res).jsonSuccess(questionDoc, new Messages().SUCCESSFULLY_RECEIVED)

}


exports.getAllQuestions = async function (req, res) {
  let question = new Question ()
let questions = await question.getAllQuestions()
new JsonResponse(req, res).jsonSuccess(questions, new Messages().SUCCESSFULLY_RECEIVED)
return questions
}

exports.deleteById = async function (req, res) {
  let question = new Question ();
await question.deleteById()
new JsonResponse(req, res).jsonSuccess(true, new Messages().SUCCESSFULLY_DELETED)
}
    