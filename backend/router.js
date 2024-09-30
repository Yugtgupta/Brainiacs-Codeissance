const express = require("express");
const router = express.Router();
const AuthHelper = require("./helper/JWTAuthHelper");
const TryCatch = require("./helper/TryCatch");
const Messages = require("./constants/Messages");

//imports here
const mentorController = require("./controllers/mentorController");

const tutorController = require("./controllers/tutorController");

const studentController = require("./controllers/studentController");

//code here

//Entity - Mentor --start
//Authentication - Mentor
router.post(
  "/register-mentor",
  new TryCatch(mentorController.apiRegister).tryCatchGlobe()
);
router.post(
  "/login-mentor",
  new TryCatch(mentorController.apiLogin).tryCatchGlobe()
);

//CRUD Operations - Mentor
router.post(
  "/mentor/does-email-exists",
  AuthHelper.verifyToken,
  new TryCatch(mentorController.doesEmailExist).tryCatchGlobe()
);
router.get(
  "/mentor/get-by-id/:id",
  AuthHelper.verifyToken,
  new TryCatch(mentorController.getById).tryCatchGlobe()
);
router.get(
  "/mentor/get-by-email/:email",
  AuthHelper.verifyToken,
  new TryCatch(mentorController.getByEmail).tryCatchGlobe()
);
router.get(
  "/mentor/get-all",
  AuthHelper.verifyToken,
  new TryCatch(mentorController.getAllMentors).tryCatchGlobe()
);
router.delete(
  "/mentor/delete-by-id/:id",
  AuthHelper.verifyToken,
  new TryCatch(mentorController.deleteById).tryCatchGlobe()
);
//Entity - Mentor - End

//Entity - Tutor --start
//Authentication - Tutor
router.post(
  "/register-tutor",
  new TryCatch(tutorController.apiRegister).tryCatchGlobe()
);
router.post(
  "/login-tutor",
  new TryCatch(tutorController.apiLogin).tryCatchGlobe()
);

//CRUD Operations - Tutor
router.post(
  "/tutor/does-email-exists",
  AuthHelper.verifyToken,
  new TryCatch(tutorController.doesEmailExist).tryCatchGlobe()
);
router.get(
  "/tutor/get-by-id/:id",
  AuthHelper.verifyToken,
  new TryCatch(tutorController.getById).tryCatchGlobe()
);
router.get(
  "/tutor/get-by-email/:email",
  AuthHelper.verifyToken,
  new TryCatch(tutorController.getByEmail).tryCatchGlobe()
);
router.get(
  "/tutor/get-all",
  AuthHelper.verifyToken,
  new TryCatch(tutorController.getAllTutors).tryCatchGlobe()
);
router.delete(
  "/tutor/delete-by-id/:id",
  AuthHelper.verifyToken,
  new TryCatch(tutorController.deleteById).tryCatchGlobe()
);
//Entity - Tutor - End

//Entity - Student --start
//Authentication - Student
router.post(
  "/register-student",
  new TryCatch(studentController.apiRegister).tryCatchGlobe()
);
router.post(
  "/login-student",
  new TryCatch(studentController.apiLogin).tryCatchGlobe()
);

//CRUD Operations - Student
router.post(
  "/student/does-email-exists",
  AuthHelper.verifyToken,
  new TryCatch(studentController.doesEmailExist).tryCatchGlobe()
);
router.get(
  "/student/get-by-id/:id",
  AuthHelper.verifyToken,
  new TryCatch(studentController.getById).tryCatchGlobe()
);
router.get(
  "/student/get-by-email/:email",
  AuthHelper.verifyToken,
  new TryCatch(studentController.getByEmail).tryCatchGlobe()
);
router.get(
  "/student/get-all",
  AuthHelper.verifyToken,
  new TryCatch(studentController.getAllStudents).tryCatchGlobe()
);
router.delete(
  "/student/delete-by-id/:id",
  AuthHelper.verifyToken,
  new TryCatch(studentController.deleteById).tryCatchGlobe()
);
//Entity - Student - End

module.exports = router;
