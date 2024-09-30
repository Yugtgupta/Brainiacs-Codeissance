 
    const Messages = require("../constants/Messages");
const JsonResponse = require("../helper/JsonResponse");
const TryCatch = require("../helper/TryCatch");
const Tutor = require("../models/Tutor");
const jwt = require("jsonwebtoken");


// how long a token lasts before expiring
const tokenLasts = "365d";


//LOGIN
exports.apiLogin = async function (req, res) {
  let tutor = new Tutor(req.body);

  let result = await tutor.login();
  if (result) {
    let data = {
      token: jwt.sign(
        { _id: tutor.data._id, name: tutor.data.name, email: tutor.data.email },
        process.env.JWTSECRET,
        { expiresIn: tokenLasts }
      ),
      id: tutor.data._id,
      name: tutor.data.name,
      role: "tutor",
    };

    new JsonResponse(req, res).jsonSuccess(data, "Login success");
  } else {
    res.locals.data = {
      isValid: false,
      loginFailed: true,
    };
    res.locals.message = new Messages().INVALID_CREDENTIALS;
    new JsonResponse(req, res).jsonError();
  }
};

//REGISTER
exports.apiRegister = async function (req, res) {
  let tutor = new Tutor(req.body);
  console.log(req.body);

  let result = await tutor.register();
  if (result) {
    let data = {
      token: jwt.sign(
        { _id: tutor.data._id, name: tutor.data.fName, email: tutor.data.email },
        process.env.JWTSECRET,
        { expiresIn: tokenLasts }
      ),
      id: tutor.data._id,
      name: tutor.data.name,
      role: "tutor",
    };
    new JsonResponse(req, res).jsonSuccess(data, "Register success");
  } else {
    res.locals.data = {
      isVaild: false,
      authorizationFailed: true,
    };
    res.locals.message = regErrors;
    new JsonResponse(req, res).jsonError();
  }
};

//Tutor Exists?
exports.doesEmailExist = async function (req, res) {
  // throw new Error("This is a dummy exception for testing");
  console.log(Tutor.doesEmailExist(req.body.email));
  let emailBool = await Tutor.doesEmailExist(req.body.email);
  new JsonResponse(req, res).jsonSuccess(
    emailBool,
    new Messages().SUCCESSFULLY_RECEIVED
  );
};



exports.getById = async function(req, res){
  let tutor = new Tutor()
  let tutorDoc = await tutor.getById(req.params.id)
  new JsonResponse(req, res).jsonSuccess(tutorDoc, new Messages().SUCCESSFULLY_RECEIVED)

}

exports.getByEmail = async function(req, res){
  let tutor = new Tutor()
  let tutorDoc = await tutor.findByEmail(req.params.email)
  console.log(tutorDoc)
  new JsonResponse(req, res).jsonSuccess(tutorDoc, new Messages().SUCCESSFULLY_RECEIVED)
}

exports.getAllTutors = async function(req, res){
  let tutor = new Tutor()
  let tutors = await tutor.getAllTutors()
  new JsonResponse(req, res).jsonSuccess(tutors, new Messages().SUCCESSFULLY_RECEIVED)
  return tutors
}

exports.deleteById= async function(req, res){
 let tutor = new Tutor();
 await tutor.deleteById()
 new JsonResponse(req, res).jsonSuccess(true, new Messages().SUCCESSFULLY_DELETED)
}
    