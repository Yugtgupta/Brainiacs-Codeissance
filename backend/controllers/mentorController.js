const Messages = require("../constants/Messages")
const JsonResponse = require("../helper/JsonResponse")
const TryCatch = require("../helper/TryCatch")
const Mentor = require("../models/Mentor")
const jwt = require("jsonwebtoken")
const Student = require("../models/Student")

// how long a token lasts before expiring
const tokenLasts = "365d"

//LOGIN
exports.apiLogin = async function (req, res) {
  let mentor = new Mentor(req.body)

  let result = await mentor.login()
  if (result) {
    let data = {
      token: jwt.sign({ _id: mentor.data._id, name: mentor.data.name, email: mentor.data.email }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
      id: mentor.data._id,
      name: mentor.data.name,
      role: "mentor"
    }

    new JsonResponse(req, res).jsonSuccess(data, "Login success")
  } else {
    res.locals.data = {
      isValid: false,
      loginFailed: true
    }
    res.locals.message = new Messages().INVALID_CREDENTIALS
    new JsonResponse(req, res).jsonError()
  }
}

//REGISTER
exports.apiRegister = async function (req, res) {
  let mentor = new Mentor(req.body)
  console.log(req.body)

  let result = await mentor.register()
  if (result) {
    let data = {
      token: jwt.sign({ _id: mentor.data._id, name: mentor.data.fName, email: mentor.data.email }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
      id: mentor.data._id,
      name: mentor.data.name,
      role: "mentor"
    }
    new JsonResponse(req, res).jsonSuccess(data, "Register success")
  } else {
    res.locals.data = {
      isVaild: false,
      authorizationFailed: true
    }
    res.locals.message = regErrors
    new JsonResponse(req, res).jsonError()
  }
}

//Mentor Exists?
exports.doesEmailExist = async function (req, res) {
  // throw new Error("This is a dummy exception for testing");
  console.log(Mentor.doesEmailExist(req.body.email))
  let emailBool = await Mentor.doesEmailExist(req.body.email)
  new JsonResponse(req, res).jsonSuccess(emailBool, new Messages().SUCCESSFULLY_RECEIVED)
}

exports.getById = async function (req, res) {
  let mentor = new Mentor()
  let mentorDoc = await mentor.getById(req.params.id)
  new JsonResponse(req, res).jsonSuccess(mentorDoc, new Messages().SUCCESSFULLY_RECEIVED)
}

exports.getByEmail = async function (req, res) {
  let mentor = new Mentor()
  let mentorDoc = await mentor.findByEmail(req.params.email)
  console.log(mentorDoc)
  new JsonResponse(req, res).jsonSuccess(mentorDoc, new Messages().SUCCESSFULLY_RECEIVED)
}

exports.getAllMentors = async function (req, res) {
  let mentor = new Mentor()
  let student = new Student()
  let studentDoc = await student.getById(req.params.studId)
  let mentors = await mentor.getAllMentors()
  console.log("student Doc")
  console.log(studentDoc)

  console.log("mentors")
  console.log(mentors)
  let studentSkills = studentDoc.skills
  console.log(studentSkills)
  let mentorsNewSeq = []
  let matchScore = 0
  mentors.forEach(mentor => {
    let matchScore = 0
    console.log(mentor.skills)
    mentor.skills.forEach(mentorSkill => {
      if (studentSkills.includes(mentorSkill)) {
        matchScore++
      }
    })
    mentorsNewSeq.push({ mentorDoc: mentor, score: matchScore })
  })

  mentorsNewSeq.sort((a, b) => b.score - a.score)

  console.log(mentorsNewSeq)

  studentDoc.skills
  new JsonResponse(req, res).jsonSuccess(mentorsNewSeq, new Messages().SUCCESSFULLY_RECEIVED)
  // res.json(mentorsNewSeq)
  return mentors
}

exports.deleteById = async function (req, res) {
  let mentor = new Mentor()
  await mentor.deleteById()
  new JsonResponse(req, res).jsonSuccess(true, new Messages().SUCCESSFULLY_DELETED)
}
