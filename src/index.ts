// Data to this server can be sent using ncat, a tool that comes with nmap
// Example usage: ncat -u <host> <port>

import dgram from "dgram";

const socket = dgram.createSocket("udp4");

socket.on("listening", () => {
  const address = socket.address();
  console.log(
    `Server is ready for communication on ${address.address}:${address.port}`
  );
});

socket.on("message", (msg, info) => {
  console.log(`Message received: ${msg.toString()}`);
  console.log(`From: ${info.address}:${info.port}`);

  socket.send("Acknowledged!\n", info.port, info.address, (err) => {
    if (err) console.error(`Failed to send response: ${err.message}`);
    else console.log("Response sent.");
  });
});

socket.on("error", (err) => {
  console.error(`Error: ${err.message}`);
  socket.close();
});

socket.on("close", () => {
  console.log("Socket closed.");
});

socket.bind(5500, "127.0.0.1");
