const express = require("express")
const router = express.Router()
const AuthHelper = require("./helper/JWTAuthHelper")
const TryCatch = require("./helper/TryCatch")
const Messages = require("./constants/Messages")
const LlmHelper = require("./helper/LlmHelper")
//imports here
const chatController = require('./controllers/chatController');
const answerController = require("./controllers/answerController")

const questionController = require("./controllers/questionController")

const mentorController = require("./controllers/mentorController")

const tutorController = require("./controllers/tutorController")

const studentController = require("./controllers/studentController")

//code here

    router.post('/send-chat', AuthHelper.verifyToken, new TryCatch(chatController.sendChat).tryCatchGlobe())
    router.get('/get-my-chat/:id/:chatContactId',  AuthHelper.verifyToken, new TryCatch(chatController.getChatConvo).tryCatchGlobe())
    

//Entity - Answer --start

//CRUD Operations - Answer
router.post("/answer/create", AuthHelper.verifyToken, new TryCatch(answerController.createAnswer).tryCatchGlobe())
router.get("/answer/get-by-id/:id", AuthHelper.verifyToken, new TryCatch(answerController.getById).tryCatchGlobe())
router.get("/answer/get-all", AuthHelper.verifyToken, new TryCatch(answerController.getAllAnswers).tryCatchGlobe())
router.delete("/answer/delete-by-id/:id", AuthHelper.verifyToken, new TryCatch(answerController.deleteById).tryCatchGlobe())
//Entity - Answer - End

//Entity - Question --start

//CRUD Operations - Question
router.post("/question/create", AuthHelper.verifyToken, new TryCatch(questionController.createQuestion).tryCatchGlobe())
router.get("/question/get-by-id/:id", AuthHelper.verifyToken, new TryCatch(questionController.getById).tryCatchGlobe())
router.get("/question/get-all", AuthHelper.verifyToken, new TryCatch(questionController.getAllQuestions).tryCatchGlobe())
router.delete("/question/delete-by-id/:id", AuthHelper.verifyToken, new TryCatch(questionController.deleteById).tryCatchGlobe())
//Entity - Question - End

//Entity - Mentor --start
//Authentication - Mentor
router.post("/register-mentor", new TryCatch(mentorController.apiRegister).tryCatchGlobe())
router.post("/login-mentor", new TryCatch(mentorController.apiLogin).tryCatchGlobe())

//CRUD Operations - Mentor
router.post("/mentor/does-email-exists", AuthHelper.verifyToken, new TryCatch(mentorController.doesEmailExist).tryCatchGlobe())
router.get("/mentor/get-by-id/:id", AuthHelper.verifyToken, new TryCatch(mentorController.getById).tryCatchGlobe())
router.get("/mentor/get-by-email/:email", AuthHelper.verifyToken, new TryCatch(mentorController.getByEmail).tryCatchGlobe())
router.get("/mentor/get-all", AuthHelper.verifyToken, new TryCatch(mentorController.getAllMentors).tryCatchGlobe())
router.delete("/mentor/delete-by-id/:id", AuthHelper.verifyToken, new TryCatch(mentorController.deleteById).tryCatchGlobe())
//Entity - Mentor - End

//Entity - Tutor --start
//Authentication - Tutor
router.post("/register-tutor", new TryCatch(tutorController.apiRegister).tryCatchGlobe())
router.post("/login-tutor", new TryCatch(tutorController.apiLogin).tryCatchGlobe())

//CRUD Operations - Tutor
router.post("/tutor/does-email-exists", AuthHelper.verifyToken, new TryCatch(tutorController.doesEmailExist).tryCatchGlobe())
router.get("/tutor/get-by-id/:id", AuthHelper.verifyToken, new TryCatch(tutorController.getById).tryCatchGlobe())
router.get("/tutor/get-by-email/:email", AuthHelper.verifyToken, new TryCatch(tutorController.getByEmail).tryCatchGlobe())
router.get("/tutor/get-all", AuthHelper.verifyToken, new TryCatch(tutorController.getAllTutors).tryCatchGlobe())
router.delete("/tutor/delete-by-id/:id", AuthHelper.verifyToken, new TryCatch(tutorController.deleteById).tryCatchGlobe())
//Entity - Tutor - End

//Entity - Student --start
//Authentication - Student
router.post("/register-student", new TryCatch(studentController.apiRegister).tryCatchGlobe())
router.post("/login-student", new TryCatch(studentController.apiLogin).tryCatchGlobe())

//CRUD Operations - Student
router.post("/student/does-email-exists", AuthHelper.verifyToken, new TryCatch(studentController.doesEmailExist).tryCatchGlobe())
router.get("/student/get-by-id/:id", AuthHelper.verifyToken, new TryCatch(studentController.getById).tryCatchGlobe())
router.get("/student/get-by-email/:email", AuthHelper.verifyToken, new TryCatch(studentController.getByEmail).tryCatchGlobe())
router.get("/student/get-all", AuthHelper.verifyToken, new TryCatch(studentController.getAllStudents).tryCatchGlobe())
router.delete("/student/delete-by-id/:id", AuthHelper.verifyToken, new TryCatch(studentController.deleteById).tryCatchGlobe())
//Entity - Student - End

//LLm route
router.post("/llm/get-data", AuthHelper.verifyToken, new TryCatch(LlmHelper.llmModel).tryCatchGlobe())
module.exports = router
