import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const ListItems = (props: any) => {
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          props.setActive(0);
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setActive(1);
        }}
      >
        <ListItemIcon>
          <ErrorOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Not Resolved" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setActive(2);
        }}
      >
        <ListItemIcon>
          <AutorenewIcon />
        </ListItemIcon>
        <ListItemText primary="In progress" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setActive(3);
        }}
      >
        <ListItemIcon>
          <DoneOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Resolved" />
      </ListItem>
    </div>
  );
};

export default ListItems;
