import "../../../App.css";
import Triangle from "./triangle";
const Bubble = (props) => {
  return (
    <div
      className="userBubble"
      style={{
        backgroundColor: props.colour,
      }}
    >
      <div style={{ display: "inline-block" }}>
        <p
          className="scenario-nopadding"
          style={{ float: "left", marginRight: "10px" }}
        >
          {props.msg.from} says:
        </p>
        <div style={{ float: "right" }}>
          <p className="scenario-nopadding">room: {props.msg.room}</p>
          <p
            className="scenario-nopadding"
            style={{ clear: "both", float: "right" }}
          >
            @ {props.msg.time}
          </p>
        </div>
      </div>
      <p
        className="scenario-nopadding"
        style={{ clear: "both", marginTop: "5px" }}
      >
        {props.msg.text}
      </p>

      <Triangle
        colour={props.msg.colour}
        isUser={props.user === props.msg.from}
      />
    </div>
  );
};
export default Bubble;
