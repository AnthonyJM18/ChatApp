const colours = require("./Colours.json").colours;
const moment = require("moment-timezone");
const adminColour = "#8a1212";
let rooms = [];

const handleJoin = (socket, clientData) => {
  // Check if the username exists in the specified chat room
  let user = null;
  let room = null;
  if (rooms.length > 0) {
    room = rooms.find((e) => e.roomName === clientData.roomName);
    user = room?.users.find((u) => u.chatName === clientData.chatName);
  }
  if (user == null) {
    let randomNumberSeed = Math.floor(Math.random() * colours.length);
    socket.colour = colours[randomNumberSeed];
    // add room and user to rooms array
    if (room == null) {
      rooms.push({
        roomName: clientData.roomName,
        users: [
          { chatName: clientData.chatName, colour: colours[randomNumberSeed] },
        ],
      });
    } else {
      room.users.push({
        chatName: clientData.chatName,
        colour: colours[randomNumberSeed],
      });
      rooms.forEach((element, i) => {
        if (element === room) {
          rooms[i] = room;
          return;
        }
      });
    }
    socket.join(clientData.roomName);
    socket.name = clientData.chatName;
    socket.room = clientData.roomName;
    // emit a welcome message
    socket.emit("welcome", {
      from: "Admin",
      room: clientData.roomName,
      colour: adminColour,
      text: `Welcome ${clientData.chatName}!`,
      time: moment().tz("America/Toronto").format("h:mm:ss a"),
    });
    // emit a someonejoined message
    socket.to(clientData.roomName).emit("someonejoined", {
      from: "Admin",
      room: clientData.roomName,
      colour: adminColour,
      text: `${clientData.chatName} has joined the ${clientData.roomName} room`,
      time: moment().tz("America/Toronto").format("h:mm:ss a"),
    });
  } else {
    socket.emit("nameexists", {
      text: `Username already exists in room: ${clientData.roomName}`,
    });
  }
};

const handleDisconnect = (socket) => {
  socket.to(socket.room).emit("someoneleft", {
    from: "Admin",
    room: socket.room,
    colour: adminColour,
    text: `${socket.name} has left the ${socket.room} room`,
    time: moment().tz("America/Toronto").format("h:mm:ss a"),
  });
  rooms.forEach((room, i) => {
    let arr = [];
    if (room.roomName === socket.room) {
      room.users = room.users.filter((e) => e.chatName !== socket.name);
    }
  });
  rooms = rooms.filter((e) => e.users.length > 0);
};

const handleTyping = (socket) => {
  socket.to(socket.room).emit("someoneistyping", {
    text: `${socket.name} is typing`,
  });
};

const handleMessage = (io, socket, data) => {
  io.in(socket.room).emit("newmessage", {
    from: data.from,
    room: socket.room,
    colour: socket.colour,
    text: `${data.text}`,
    time: moment().tz("America/Toronto").format("h:mm:ss a"),
  });
};

const handleGetRoomsAndUsers = (io) => {
  let value = [];
  rooms.forEach((r, i) => {
    r.users.forEach((u) => {
      value.push({
        text: `${u.chatName} is in room ${r.roomName}`,
        colour: u.colour,
      });
    });
  });
  io.emit("userschanged", {
    users: value,
  });
};

const fetchRooms = (io) => {
  let value = [];
  rooms.forEach((r) => {
    value.push(r.roomName);
  });
  io.emit("roomsavailable", { rooms: value });
};

module.exports = {
  handleJoin,
  handleDisconnect,
  handleTyping,
  handleMessage,
  handleGetRoomsAndUsers,
  fetchRooms,
};
