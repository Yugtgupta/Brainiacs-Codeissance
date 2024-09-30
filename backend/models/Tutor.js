const bcrypt = require("bcryptjs")
const Messages = require("../constants/Messages")
const TryCatch = require("../helper/TryCatch")
const { ObjectId } = require("mongodb")
const tutorsCollection = require("../db").db().collection("tutor")

let Tutor = function (data) {
  this.data = data
  this.errors = []
}

Tutor.prototype.cleanUp = function () {
  // get rid of any bogus properties
  this.data = {
    //predfined start
    name: this.data.name,
    lName: this.data.lName,
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
    contactNumber: this.data.contactNumber,
    address: this.data.address,
    city: this.data.city,
    role: "tutor",
    createdAt: new Date(),
    //predefined end
    fieldOfStudy: this.data.fieldOfStudy,
    expInYears: this.data.expInYears,
    qualifications: this.data.qualifications,
    lectureIds: this.data.lectureIds,
    bio: this.data.bio
  }
}

Tutor.prototype.login = async function () {
  let attemptedUser = await tutorsCollection.findOne({ email: this.data.email })
  this.cleanUp()
  if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
    this.data = attemptedUser
    return true
  } else {
    return false
  }
}

Tutor.prototype.register = async function () {
  this.cleanUp()

  let salt = bcrypt.genSaltSync(10)
  this.data.password = bcrypt.hashSync(this.data.password, salt)
  await tutorsCollection.insertOne(this.data)
  return true
}

Tutor.prototype.findByEmail = async function (email) {
  let tutorDoc = await tutorsCollection.findOne({ email: email })
  return tutorDoc
}

Tutor.prototype.doesEmailExist = async function (email) {
  let tutor = await tutorsCollection.findOne({ email: email })
  if (tutor) {
    return true
  } else {
    return false
  }
}

Tutor.prototype.getById = async function (id) {
  let tutorDoc = await tutorsCollection.findOne({ _id: new ObjectId(id) })
  return tutorDoc
}

Tutor.prototype.getAllTutors = async function () {
  let tutorDoc = await tutorsCollection.find({}).toArray()
  return tutorDoc
}

Tutor.prototype.deleteById = async function (id) {
  await tutorsCollection.deleteOne({ _id: new ObjectId(id) })
  return
}

module.exports = Tutor
