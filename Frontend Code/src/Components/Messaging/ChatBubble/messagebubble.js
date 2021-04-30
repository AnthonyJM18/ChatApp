import { useEffect, useRef } from "react";
import { ListItem } from "@material-ui/core";
import Bubble from "./bubble";
import Triangle from "./triangle";
const MessageBubble = (props) => {
  const msgRef = useRef(null);
  useEffect(() => {
    msgRef.current.scrollIntoView(true);
  }, []);
  return (
    <div
      style={{
        float: props.user === props.msg.from ? "right" : "left",
        clear: "both",
        marginBottom: "15px",
        width: "70%",
      }}
    >
      <ListItem
        ref={msgRef}
        style={{
          padding: 0,
        }}
      >
        <Bubble msg={props.msg} colour={props.msg.colour} user={props.user} />
      </ListItem>
      <p></p>
    </div>
  );
};
export default MessageBubble;
