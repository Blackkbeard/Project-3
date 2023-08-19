import React from "react";
import Button from "@mui/material/Button";
import { StyledEngineProvider } from "@mui/material/styles";

const Btn = (props) => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Button
          variant="contained"
          onClick={props.onClick}
          className={props.isBrown ? "btn brown" : "btn burgundy"}
          style={{ width: `${props.width}rem` }}
        >
          {props.children}
        </Button>
      </StyledEngineProvider>
    </>
  );
};

export default Btn;
