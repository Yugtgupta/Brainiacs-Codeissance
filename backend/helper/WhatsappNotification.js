const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()
class WhatsappNotification {
  numberToSend
  msgBody

  constructor(numberToSend, msgBody) {
    console.log("CALLLEDDDDD")
    this.numberToSend = numberToSend
    this.msgBody = msgBody
  }

  sendWhatsappNotification() {
    try {
      const url = "https://graph.facebook.com/v20.0/144528362069356/messages"
      //    process.env.WHATSAPP_URL
      const accessToken = "EAAMZAoiJPdIsBO4HwIxQrj2yTuYLBy8Suj2PjTK5KDawbzfDQny01oOOYbcEBxLNOmmkgnHrqgqx311US50Hc8hVrvDlwJcvcepk6wZCJZAtedCjZBbZBPvjIPEP9vtWg1yho4lQGs73XsZBX901l5faXYbqMCk3ZB3eS2YnGEK9WB3pz07XXFKiwkzPcNNuxdEUpSJ2fFE6wuFsBayxu5ZCsdZAyQ3EZD"
      //   process.env.WHATSAPP_ACCESS_TOKEN

      const data = {
        messaging_product: "whatsapp",
        to: this.numberToSend,
        type: "text",
        text: {
          body: this.msgBody
        }
      }

      const headers = {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      }

      axios
        .post(url, data, { headers })
        .then(response => {
          return response.data
        })
        .catch(error => {
          return error.response.data
        })
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = WhatsappNotification
