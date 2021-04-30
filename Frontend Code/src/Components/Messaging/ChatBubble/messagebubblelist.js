import { List } from "@material-ui/core";
import MessageBubble from "./messagebubble";
const MessageBubbleList = (props) => {
  let messages = props.messages.map((msg, idx) => {
    return <MessageBubble key={idx} msg={msg} user={props.user} />;
  });
  return <List>{messages}</List>;
};
export default MessageBubbleList;
