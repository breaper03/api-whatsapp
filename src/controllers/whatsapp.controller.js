const fs = require("fs");
const sendMessagesWhatsapp = require("../services/whastapp.service");

const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));


const verifyToken = (req, res) => {

  try {
    const accessToken = "LKJ124JH124J1K2";
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    
    token === accessToken && token !== null && challenge !== null
      ? res.send(challenge)
      : res.status(400).send()

  } catch (error) {
    res.status(400).send()
  }

  // return res.send("hola verify token")
}

const receivedMessage = (req, res) => {
  try {
    const entry = (req.body["entry"])[0]; 
    const changes = (entry["changes"])[0];
    const value = changes["value"];
    const messageObject = value["messages"];
    
    if (typeof messageObject !== "undefined") {
      const text = getTextUser(messageObject[0]);
      myConsole.log(text)

      sendMessagesWhatsapp(`enviaste un mensaje diciendo: ${text}.`, messageObject[0]["from"])
    }
    res.send("EVENT_RECEIVED");
  } catch (error) {
    res.send("EVENT_RECEIVED");
  }
}

const getTextUser = (message) => {
  let text = ""
  const typeOfMessage = message["type"]

  if ( typeOfMessage === "text") {
    text = (message["text"])["body"]
  } else if ( typeOfMessage === "interactive") {
    const interactiveObject = message["interactive"]
    interactiveObject["type"] === "button_reply"
      ? text = (interactiveObject["button_reply"])["title"]
      : interactiveObject["type"] === "list_reply"
        ? text = (interactiveObject["list_reply"])["title"]
        : myConsole("No se puedo obtener el formato del mensaje del usuario...")
  } else {
    myConsole("No se puedo obtener el formato del mensaje del usuario...")
  }

  return text;
}

module.exports = {
  verifyToken,
  receivedMessage
}