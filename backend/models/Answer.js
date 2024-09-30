
                const bcrypt = require("bcryptjs");
                const Messages = require("../constants/Messages");
                const TryCatch = require("../helper/TryCatch");
                const { ObjectId } = require('mongodb');
                const answersCollection = require("../db").db().collection("answer");
                
                let Answer = function (data) {
                  this.data = data;
                  this.errors = [];
                };
                
                Answer.prototype.cleanUp = function () {
                  // get rid of any bogus properties
                  this.data = {
                      
                answerBody: this.data.answerBody,
questionId: this.data.questionId,

                //predfined start
                    createdAt: new Date(),
                //predefined end
                  };
                };

                Answer.prototype.createAnswer = async function(){
                  this.cleanUp()
                 const answerDoc = await answersCollection.insertOne(this.data);
                  return answerDoc
                }
                              
                Answer.prototype.getById = async function (id){
                  let answerDoc = await answersCollection.findOne({_id: new ObjectId(id)})
                  return answerDoc
                }
                
                Answer.prototype.getAllAnswers = async function (){
                  let answerDoc = await answersCollection.find({}).toArray()
                  return answerDoc
                }
                
                Answer.prototype.deleteById = async function (id){
                 await answersCollection.deleteOne({_id: new ObjectId(id)})
                  return 
                }
                
                module.exports = Answer;             
            