import { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import "../../App.css";
import TopBar from "./topbar";
const HeaderBar = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => setOpen(false);
  const list = props?.users?.map((e, idx) => {
    return (
      <p style={{ color: e.colour }} key={idx}>
        {e.text}
      </p>
    );
  });
  return (
    <div>
      <TopBar viewDialog={handleOpenDialog} />
      <Dialog open={open} onClose={handleCloseDialog} style={{ margin: 20 }}>
        <DialogTitle style={{ textAlign: "center" }}>Who's On?</DialogTitle>
        <DialogContent>{list}</DialogContent>
      </Dialog>
    </div>
  );
};
export default HeaderBar;
