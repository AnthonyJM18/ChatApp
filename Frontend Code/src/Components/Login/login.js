import { useReducer, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "../../theme";
import logo from "./logo.png";

import "../../App.css";
const Login = (props) => {
  const initialState = {
    chatName: "",
    roomName: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  // handler for name TextField entry
  const onNameChange = (e) => {
    setState({ chatName: e.target.value });
    props.setName(e.target.value);
  };
  // handler for room TextField entry
  const onRoomChange = (e) => {
    setState({ roomName: e });
    props.setRoom(e);
  };

  const autocompleteChange = (event, value) => {
    onRoomChange(value);
  };

  return (
    <div style={{ border: "solid", padding: "3vw", margin: "3vw" }}>
      <img
        src={logo}
        alt="Logo"
        className="CenterImage"
        style={{ objectFit: "contain", width: "80vw", height: "100%" }}
      ></img>
      <TextField
        onChange={onNameChange}
        placeholder="Enter unique name"
        autoFocus={true}
        required
        value={state.chatName}
        error={state.status !== ""}
        helperText={props.status}
      />
      <p></p>
      <Autocomplete
        freeSolo
        options={props?.rooms}
        getOptionLabel={(option) => option}
        style={{ width: 300, marginTop: "30px" }}
        onChange={autocompleteChange}
        onInputChange={autocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter room name"
            variant="outlined"
            fullWidth
            value={state.roomName}
          />
        )}
      />

      <p></p>
      <Button
        variant="contained"
        data-testid="submit"
        color="primary"
        style={{ marginLeft: "3%" }}
        onClick={() => props.join()}
        disabled={state.chatName === "" || state.roomName === ""}
      >
        Join
      </Button>
    </div>
  );
};
export default Login;
