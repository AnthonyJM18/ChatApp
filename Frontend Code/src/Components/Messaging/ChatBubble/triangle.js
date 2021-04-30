const Triangle = (props) => {
  return (
    <div
      style={{
        content: "" /* triangle */,
        position: "relative",
        bottom: "-15px" /* value = - border-top-width - border-bottom-width */,
        float: props.isUser ? "right" : "left",
        borderWidth:
          "15px 15px 0" /* vary these values to change the angle of the vertex */,
        borderStyle: "solid",
        borderColor: `${props.colour} transparent`,
      }}
    />
  );
};
export default Triangle;
