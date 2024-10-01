const bcrypt = require("bcryptjs")
const Messages = require("../constants/Messages")
const TryCatch = require("../helper/TryCatch")
const { ObjectId } = require("mongodb")
const mentorsCollection = require("../db").db().collection("mentor")

let Mentor = function (data) {
  this.data = data
  this.errors = []
}

Mentor.prototype.cleanUp = function () {
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
    role: "mentor",
    createdAt: new Date(),
    //predefined end
    skills: this.data.skills,
    expertise: this.data.expertise,
    bio: this.data.bio,
    qualification: this.data.qualification
  }
}

Mentor.prototype.login = async function () {
  let attemptedUser = await mentorsCollection.findOne({ email: this.data.email })
  this.cleanUp()
  if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
    this.data = attemptedUser
    return true
  } else {
    return false
  }
}

Mentor.prototype.register = async function () {
  this.cleanUp()

  let salt = bcrypt.genSaltSync(10)
  this.data.password = bcrypt.hashSync(this.data.password, salt)
  await mentorsCollection.insertOne(this.data)
  return true
}

Mentor.prototype.findByEmail = async function (email) {
  let mentorDoc = await mentorsCollection.findOne({ email: email })
  return mentorDoc
}

Mentor.prototype.doesEmailExist = async function (email) {
  let mentor = await mentorsCollection.findOne({ email: email })
  if (mentor) {
    return true
  } else {
    return false
  }
}

Mentor.prototype.getById = async function (id) {
  let mentorDoc = await mentorsCollection.findOne({ _id: new ObjectId(id) })
  return mentorDoc
}

Mentor.prototype.getAllMentors = async function () {
  let mentorDoc = await mentorsCollection.find({}).toArray()
  return mentorDoc
}

Mentor.prototype.deleteById = async function (id) {
  await mentorsCollection.deleteOne({ _id: new ObjectId(id) })
  return
}

module.exports = Mentor
