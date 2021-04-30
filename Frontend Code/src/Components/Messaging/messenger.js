import { useReducer, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import theme from "../../theme";
import "../../App.css";
import MessageBubbleList from "./ChatBubble/messagebubblelist";
const Messenger = (props) => {
  const initialState = {
    typingMsg: "",
    isTyping: false,
    message: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      props.socket.emit("typing", { from: props.chatName }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
  };

  // enter key handler to send message
  const handleSendMessage = (e) => {
    if (state.message !== "") {
      props.socket.emit(
        "message",
        { from: props.chatName, text: state.message },
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
    }
  };

  return (
    <div>
      <div className="scenario-container">
        Messages
        {props.messages && (
          <div className="messageList">
            <MessageBubbleList
              messages={props.messages}
              user={props.chatName}
            />
          </div>
        )}
      </div>
      <TextField
        onChange={onMessageChange}
        placeholder="type something here"
        autoFocus={true}
        value={state.message}
        onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
      />
      <div>
        <Typography color="primary">{props.typingMsg}</Typography>
      </div>
    </div>
  );
};
export default Messenger;
