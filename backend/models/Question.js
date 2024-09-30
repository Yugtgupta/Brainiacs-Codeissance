
                const bcrypt = require("bcryptjs");
                const Messages = require("../constants/Messages");
                const TryCatch = require("../helper/TryCatch");
                const { ObjectId } = require('mongodb');
                const questionsCollection = require("../db").db().collection("question");
                
                let Question = function (data) {
                  this.data = data;
                  this.errors = [];
                };
                
                Question.prototype.cleanUp = function () {
                  // get rid of any bogus properties
                  this.data = {
                      
                questionTitle: this.data.questionTitle,
questionBody: this.data.questionBody,
answers: this.data.answers,

                //predfined start
                    createdAt: new Date(),
                //predefined end
                  };
                };

                Question.prototype.createQuestion = async function(){
                  this.cleanUp()
                 const questionDoc = await questionsCollection.insertOne(this.data);
                  return questionDoc
                }
                              
                Question.prototype.getById = async function (id){
                  let questionDoc = await questionsCollection.findOne({_id: new ObjectId(id)})
                  return questionDoc
                }
                
                Question.prototype.getAllQuestions = async function (){
                  let questionDoc = await questionsCollection.find({}).toArray()
                  return questionDoc
                }
                
                Question.prototype.deleteById = async function (id){
                 await questionsCollection.deleteOne({_id: new ObjectId(id)})
                  return 
                }
                
                module.exports = Question;             
            