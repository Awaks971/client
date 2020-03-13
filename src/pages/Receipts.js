import React from "react";
import { Grid } from "@material-ui/core";
import PageHeader from "../components/PageHeader";
import ReceiptsTable from "../containers/ReceiptTable";
import { RECEIPTS_BY_CASH_JOURNAL } from "../apollo/receipts/queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

function Receipts({ match }) {
  const cash_journal_id = match.params.id;

  const { data, loading } = useQuery(RECEIPTS_BY_CASH_JOURNAL, {
    variables: { cash_journal_id }
  });
  if (!data || !data.cash_journal || data.cash_journal.length <= 0) {
    return "Loading ...";
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader
          title="Tickets"
          subtitle={`JDC du ${moment(parseInt(data.cash_journal.date)).format(
            "LL"
          )}`}
        />
      </Grid>
      <Grid item xs={12}>
        <ReceiptsTable
          receipts={data ? data.receipts : []}
          loading={loading}
          cash_journal={data ? data.cash_journal : []}
        />
      </Grid>
    </Grid>
  );
}

export default Receipts;
