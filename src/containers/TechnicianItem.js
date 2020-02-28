import React, { useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { ListItemSecondaryAction, Switch } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { DISABLE_TECHNICIAN } from "../apollo/technician/mutations";
import { LIST_ALL_TECHNICIANS } from "../apollo/technician/queries";

function TechnicianItem({ name, created_at, id, status, isLoading }) {
  const [disable_technician, { loading }] = useMutation(DISABLE_TECHNICIAN, {
    refetchQueries: [
      { query: LIST_ALL_TECHNICIANS, notifyOnNetworkStatusChange: true }
    ]
  });
  useEffect(() => {
    isLoading && isLoading(loading);
  }, [loading, isLoading]);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={new Date(parseInt(created_at)).toLocaleDateString()}
      />
      <ListItemSecondaryAction
        style={{ display: "flex", alignItems: "center" }}
      >
        <Switch
          disabled={loading}
          checked={status === "1"}
          onChange={() => {
            disable_technician({
              variables: {
                technicianId: id,
                status: status === "1" ? "0" : "1"
              }
            });
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TechnicianItem;
