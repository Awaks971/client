import React, { useState } from "react";
import List from "@material-ui/core/List";
import { useQuery } from "@apollo/react-hooks";
import Paper from "../components/Paper";
import TechnicianItem from "../containers/TechnicianItem";
import { LIST_ALL_TECHNICIANS } from "../apollo/technician/queries";

function ListTechnicians() {
  const { data, loading: queryLoading } = useQuery(LIST_ALL_TECHNICIANS, {
    fetchPolicy: "cache-and-network"
  });
  const [isLoading, setLoading] = useState(false);
  return (
    <Paper
      title="Tous mes techniciens"
      titleLoading={isLoading}
      bodyLoading={queryLoading}
    >
      <List dense>
        {data &&
          data.technicians.map(technician => {
            return (
              <TechnicianItem
                isLoading={loading => setLoading(loading)}
                key={technician.id}
                id={technician.id}
                status={technician.status}
                name={`${technician.firstname} ${technician.lastname}`}
                created_at={technician.created_at}
              />
            );
          })}
      </List>
    </Paper>
  );
}

export default ListTechnicians;
