const fs = require("fs");

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
    myConsole.log("messageObject", messageObject);
    res.send("EVENT_RECEIVED");
  } catch (error) {
    res.send("EVENT_RECEIVED");
  }
}

module.exports = {
  verifyToken,
  receivedMessage
}