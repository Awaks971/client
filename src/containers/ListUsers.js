import React, { useState } from "react";
import List from "@material-ui/core/List";
import { useQuery } from "@apollo/react-hooks";
import Paper from "../components/Paper";
import UserItem from "../containers/UserItem";
import { LIST_ALL_USERS } from "../apollo/user/queries";

function ListUsers() {
  const { data, loading: queryLoading } = useQuery(LIST_ALL_USERS);
  const [isLoading, setLoading] = useState(null);

  return (
    <Paper
      title="Tous mes utilisateurs"
      titleLoading={isLoading}
      bodyLoading={queryLoading}
    >
      <List dense>
        {data &&
          data.users.map(user => {
            return (
              <UserItem
                isLoading={loading => setLoading(loading)}
                key={user.id}
                company_id={user.company_id}
                id={user.id}
                status={user.status}
                name={`${user.firstname} ${user.lastname}`}
                email={user.email}
              />
            );
          })}
      </List>
    </Paper>
  );
}

export default ListUsers;
