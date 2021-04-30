import { useReducer, useEffect } from "react";
import io from "socket.io-client";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import theme from "../theme";
import HeaderBar from "./HeaderBar/headerbar";
import Login from "./Login/login";
import Messenger from "./Messaging/messenger";

const ChatApp = () => {
  const initialState = {
    messages: [],
    status: "",
    showjoinfields: true,
    chatName: "",
    roomName: "",
    typingMsg: "",
    isTyping: false,
    users: [],
    rooms: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const serverConnect = () => {
    // connect to server
    //const socket = io.connect("localhost:5000", { forceNew: true });
    const socket = io();
    socket.on("nameexists", onExists);
    socket.on("welcome", addMessage);
    socket.on("someonejoined", addMessage);
    socket.on("someoneleft", addMessage);
    socket.on("someoneistyping", onTyping);
    socket.on("newmessage", onNewMessage);
    socket.on("userschanged", usersChanged);
    socket.on("roomsavailable", onLoadRooms);
    socket.emit("fetchRooms");
    setState({ socket: socket });
  };
  const onExists = (dataFromServer) => {
    setState({ status: dataFromServer.text });
  };
  // generic handler for all other messages:
  const addMessage = (dataFromServer) => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({
      messages: messages,
      showjoinfields: false,
    });
  };

  // handler for join button click
  const handleJoin = () => {
    state.socket.emit("join", {
      chatName: state.chatName,
      roomName: state.roomName,
    });
  };
  // handler for name TextField entry
  const onNameChange = (e) => {
    setState({ chatName: e });
  };
  // handler for room TextField entry
  const onRoomChange = (e) => {
    setState({ roomName: e });
  };

  const onNewMessage = (dataFromServer) => {
    addMessage(dataFromServer);
    setState({ typingMsg: "" });
  };

  const onTyping = (dataFromServer) => {
    if (dataFromServer.from !== state.chatName) {
      setState({
        typingMsg: dataFromServer.text,
      });
    }
  };

  const onLoadRooms = (dataFromServer) => {
    let rooms = [];
    rooms.push("Main");
    dataFromServer.rooms.forEach((room) => {
      rooms.push(room);
    });
    rooms = [...new Set(rooms)];
    setState({ rooms: rooms });
  };

  const usersChanged = (dataFromServer) => {
    let userlist = [];

    dataFromServer.users.forEach((user) => {
      userlist.push({ text: user.text, colour: user.colour });
    });

    setState({ users: userlist });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <HeaderBar users={state.users} />
      {state.showjoinfields && (
        <Login
          join={handleJoin}
          setName={onNameChange}
          setRoom={onRoomChange}
          status={state.status}
          rooms={state.rooms}
        />
      )}
      {!state.showjoinfields && (
        <Messenger
          socket={state.socket}
          messages={state.messages}
          chatName={state.chatName}
          typingMsg={state.typingMsg}
        />
      )}
    </MuiThemeProvider>
  );
};
export default ChatApp;
