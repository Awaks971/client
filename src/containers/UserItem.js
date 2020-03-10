import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { ListItemSecondaryAction, Switch } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { DISABLE_USER, VALID_USER } from "../apollo/user/mutations";
import { LIST_ALL_USERS } from "../apollo/user/queries";

function UserItem({ name, email, id, status, isLoading, company_id }) {
  const [valid_user, { loading: valid_user_loading }] = useMutation(
    VALID_USER,
    {
      refetchQueries: [{ query: LIST_ALL_USERS }],
      notifyOnNetworkStatusChange: true
    }
  );

  const [disable_user, { loading: disable_user_loading }] = useMutation(
    DISABLE_USER,
    {
      refetchQueries: [{ query: LIST_ALL_USERS }],
      notifyOnNetworkStatusChange: true
    }
  );

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email} />
      <ListItemSecondaryAction
        style={{ display: "flex", alignItems: "center" }}
      >
        <Switch
          disabled={valid_user_loading || disable_user_loading}
          checked={status === "validated"}
          onChange={() => {
            if (status === "waiting") {
              valid_user({ variables: { userId: id, company_id } });
            }
            if (status === "locked") {
              disable_user({ variables: { status: "validated", userId: id } });
            }
            if (status === "validated") {
              disable_user({ variables: { status: "locked", userId: id } });
            }
            isLoading && isLoading(valid_user_loading || disable_user_loading);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default UserItem;
