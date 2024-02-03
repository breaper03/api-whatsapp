const verifyToken = (req, res) => {

  try {
    const accessToken = "LKJ124JH124J1K2";
    const token = req.query["hub.verify_token"];
    const challenge = req.body["hub.challenge"];
    
    token === accessToken && token !== null && challenge !== null
      ? res.send(challenge)
      : res.status(400).send()

  } catch (error) {
    res.status(400).send()
  }

  // return res.send("hola verify token")
}

const receivedMessage = (req, res) => {
  return res.send("hola received message")
}

module.exports = {
  verifyToken,
  receivedMessage
}