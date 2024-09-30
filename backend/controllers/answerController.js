 
const Messages = require("../constants/Messages");
  const JsonResponse = require("../helper/JsonResponse");
  const TryCatch = require("../helper/TryCatch");
  const Answer = require("../models/Answer");
const jwt = require("jsonwebtoken");

exports.createAnswer = async function(req, res){
  let answer = new Answer(req.body)
 let answerDoc = await answer.createAnswer();
 new JsonResponse(req, res).jsonSuccess(answerDoc, "Created")
}

exports.getById = async function (req, res) {
  let answer = new Answer ()
let answerDoc = await answer.getById(req.params.id)
new JsonResponse(req, res).jsonSuccess(answerDoc, new Messages().SUCCESSFULLY_RECEIVED)

}


exports.getAllAnswers = async function (req, res) {
  let answer = new Answer ()
let answers = await answer.getAllAnswers()
new JsonResponse(req, res).jsonSuccess(answers, new Messages().SUCCESSFULLY_RECEIVED)
return answers
}

exports.deleteById = async function (req, res) {
  let answer = new Answer ();
await answer.deleteById()
new JsonResponse(req, res).jsonSuccess(true, new Messages().SUCCESSFULLY_DELETED)
}
    