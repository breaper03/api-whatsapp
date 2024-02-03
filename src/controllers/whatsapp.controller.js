const verifyToken = (req, res) => {
  return res.send("hola verify token")
}

const receivedMessage = (req, res) => {
  return res.send("hola received message")
}

module.exports = {
  verifyToken,
  receivedMessage
}