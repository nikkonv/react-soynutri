import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import DateRangeIcon from "@material-ui/icons/DateRange";

const WeeklyDietMenuStyled = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  .button-menu {
    color: white;
  }
  .menu-item:hover {
    background-color: var(--lightPurple);
    color: white;
  }
  .icon {
    margin-right: 0.2em;
  }
`;

export default function UserMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <WeeklyDietMenuStyled>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="text"
        className="button-menu"
      >
        <DateRangeIcon fontSize="inherit" className="icon" />
        Minutas semanales
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className="paper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_minuta_semanal/agregar"
                  >
                    Agregar minuta semanal
                  </MenuItem>
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_minuta_semanal/ver"
                  >
                    Ver minuta semanal
                  </MenuItem>
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_minuta_semanal/modificar"
                  >
                    Modificar minuta semanal
                  </MenuItem>
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_minuta_semanal/eliminar"
                  >
                    Eliminar minuta semanal
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </WeeklyDietMenuStyled>
  );
}
