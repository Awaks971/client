import React, { useEffect } from "react";
import Paper from "../components/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import StoreFrontIcon from "@material-ui/icons/Storefront";
import StyleIcon from "@material-ui/icons/Style";
import MoneyIcon from "@material-ui/icons/Money";
import ReceiptIcon from "@material-ui/icons/Receipt";
import useCurrency from "../custom_hooks/useCurrency";
import { useQuery } from "@apollo/react-hooks";
import { TOP_PAYMENT_MODE } from "../apollo/payment_journals/queries";

const default_payments = [
  {
    label: "CARTE",
    amount: 0
  },
  {
    label: "ESPECES",
    amount: 0
  },
  {
    label: "CHEQUE",
    amount: 0
  }
];

const icons = {
  CARTE: <CreditCardIcon color="secondary" style={{ fontSize: 60 }} />,
  ESPECES: <MoneyIcon color="secondary" style={{ fontSize: 60 }} />,
  CHEQUE: <ReceiptIcon color="secondary" style={{ fontSize: 60 }} />,
  CREDIT: <StoreFrontIcon color="secondary" style={{ fontSize: 60 }} />,
  "TK RESTO": <StyleIcon color="secondary" style={{ fontSize: 60 }} />
};

function PaymentsWidget({ range, get_printable, to_print }) {
  const euro = useCurrency();
  const { data, loading } = useQuery(TOP_PAYMENT_MODE, {
    skip: !!to_print,

    variables: { range: { start: range.startDate, end: range.endDate } }
  });

  const payment_modes = data
    ? data.top_payment_mode
    : to_print || default_payments;

  useEffect(() => {
    !to_print && get_printable && get_printable(payment_modes);
  }, [loading]);

  return (
    <Paper title="Ventilation de paiements" spaced bodyLoading={loading}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        {payment_modes.map(payment => {
          return (
            <Grid key={payment.label} item xs={6} sm={6} md={3}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  {icons[payment.label]}
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    style={{ fontWeight: 900 }}
                    align="center"
                    color="secondary"
                    variant="body1"
                  >
                    {payment.label}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="secondary" variant="h5">
                    {euro.format(payment.amount)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default PaymentsWidget;
