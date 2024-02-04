const https = require("https");

const sendMessagesWhatsapp = (textResponse, number) => {
  const data = JSON.stringify({
    "messaging_product": "whatsapp",
    "to": number,
    "text": {
      "body": textResponse
    },
    "type": "text"
  });

  const options = {
    host: "graph.facebook.com",
    path: "/v18.0/221851531013038/messages",
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer EAAFFFrIkr5EBO9FDTZAiyzGvg3jZALCLVMmrsHZAL2EYW7lbXzFjPnKeCyc6WdXQVpZBLHUmEurZCqIuDYFZA79GcQwRria2le5BxU4ZCvZAbRYdSfZCOKgr6dAyn99ZCGZB9maQk0xhpiG2BVN9lK2qxeWot0nHBKIOc6J81tjgtCqm6WO3mZAvv0EFvtyPs2Rc52OZA"
    }
  }

  const req = https.request(options, res => res.on("data", data => process.stdout.write(data)))

  req.on("error", error => console.log(error))

  req.write(data)
  req.end();

}

module.exports = sendMessagesWhatsapp