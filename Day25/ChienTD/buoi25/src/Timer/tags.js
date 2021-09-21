import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function TagMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const [valueCheckbox, setValueCheckbox] = useState([]);
  // const valueChecked = [];
  const changeCheckbox = (e) => {
    const checked = e.target.value;
    let oldValueChecked = [...valueCheckbox];

    if (oldValueChecked.includes(checked)) {
      oldValueChecked = oldValueChecked.filter(
        (checkItem) => checkItem !== checked
      );
    } else {
      oldValueChecked.push(checked);
    }
    setValueCheckbox(oldValueChecked.sort());
    props.valueTag(oldValueChecked);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ color: "black" }}
        >
          <LocalOfferIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <FormGroup
                style={{ backgroundColor: "lightBlue", padding: "10px" }}
                className="tag-menu"
                onChange={changeCheckbox}
              >
                <FormControlLabel
                  control={<Checkbox value="1"/>}
                  label="Online"
                />
                <FormControlLabel
                  control={<Checkbox value="2" />}
                  label="Meeting"
                />
                <FormControlLabel
                  control={<Checkbox value="3" />}
                  label="Training"
                />
                <FormControlLabel
                  control={<Checkbox value="4" />}
                  label="Coding"
                />
              </FormGroup>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
}
