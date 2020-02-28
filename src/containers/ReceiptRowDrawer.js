import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, Divider, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MUITableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useState } from "react";
import styled from "styled-components";
import { RECEIPT_BY_TAX_DOCUMENT } from "../apollo/receipts/queries";
import { CURRENT_LOGGED_USER } from "../apollo/user/queries";
import ButtonDrawer from "../components/ButtonDrawer";
import PageHeader from "../components/PageHeader";
import useCurrency from "../custom_hooks/useCurrency";

const default_receipt = {
  date: new Date().toLocaleDateString(),

  company: {
    name: "XXXX XXXX",
    address: "XXXXX XX XXXXX",
    postal_code: "XXXXX",
    city: "XXXXXXXXX",
    phone: "XXXX XX XX XX",
    siret: "XXX XXX XXX"
  },

  tax_document_code: "FCT-XXXXX-XXXXXX-00000000000",

  lines: [],
  vat: {
    group: [],
    total_ht: "0",
    total_vat: "0"
  }
};

function ReceiptRow({ receipts, current_index }) {
  const euro = useCurrency();
  const row = receipts[current_index] || default_receipt;
  return (
    <ButtonDrawer
      keepDrawerMounted={false}
      key={row.id}
      component={({ onClick }) => (
        <TableRow onClick={e => onClick(e)} hover key={row.id}>
          <MUITableCell>{row.receipt_number}</MUITableCell>
          <MUITableCell align="right">
            {euro.format(row.amount_ttc)}
          </MUITableCell>
          <MUITableCell align="right">{euro.format(row.profit)}</MUITableCell>
          <MUITableCell align="right">{row.article_count}</MUITableCell>
        </TableRow>
      )}
    >
      {({ onClose }) => (
        <ReceiptRowDrawer
          receipts={receipts}
          current_index={current_index}
          onClose={onClose}
        />
      )}
    </ButtonDrawer>
  );
}

const DrawerLoader = styled.div`
  height: 100vh;
  width: 100%;

  position: absolute;
  background-color: #ffffffc7;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function ReceiptRowDrawer({ receipts, current_index, onClose }) {
  const [receipt_index, set_receipt_index] = useState(current_index);

  const current_receipt = receipts[receipt_index];

  const set_receipt_index_safely = index => {
    if (index > receipts.length - 1 || index < 0) return;
    set_receipt_index(index);
  };

  const { data, loading } = useQuery(RECEIPT_BY_TAX_DOCUMENT, {
    variables: { id: current_receipt.id }
  });

  const next_receipt = () => set_receipt_index_safely(receipt_index + 1);
  const previous_receipt = () => set_receipt_index_safely(receipt_index - 1);

  return (
    <Grid container style={{ position: "relative" }}>
      {loading && (
        <DrawerLoader>
          <CircularProgress size={60} />
        </DrawerLoader>
      )}
      <Grid item xs={12}>
        <PageHeader small>
          <IconButton
            color="primary"
            size="small"
            onClick={() => previous_receipt()}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={() => next_receipt()}
          >
            <NavigateNextIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </PageHeader>
      </Grid>

      <Grid item xs={12}>
        <ReceiptHead />
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 20 }} />
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12}>
        <ReceiptBody
          receipt={data && data.receipt ? data.receipt : default_receipt}
        />
      </Grid>
    </Grid>
  );
}

function ReceiptHead() {
  const { data } = useQuery(CURRENT_LOGGED_USER, {
    fetchPolicy: "network-only"
  });

  const company =
    data && data.auth ? data.auth.loggedAs : default_receipt.company;
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Typography align="center" variant="h4" style={{ fontWeight: 700 }}>
          {company.name}
        </Typography>
        <Typography align="center">{company.address.line1}</Typography>
        <Typography gutterBottom align="center">
          {company.address.postal_code} {company.address.city}
        </Typography>
        <Typography align="center">
          <span style={{ fontWeight: 700 }}>Téléphone : </span>
          {company.phone}
        </Typography>
        <Typography gutterBottom align="center">
          <span style={{ fontWeight: 700 }}>Siret : </span>
          {company.siret}
        </Typography>
      </Grid>
    </Grid>
  );
}

function ReceiptBody({ receipt = default_receipt }) {
  console.log(receipt);
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        {receipt.seller_name}
      </Grid>
      <Grid item xs={12}>
        <Typography
          gutterBottom
          align="center"
          variant="h6"
          style={{ fontWeight: 300 }}
        >
          <p style={{ fontWeight: 700, marginBottom: 0 }}>TICKET DE CAISSE</p>
          {receipt.receipt_number}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          borderTop: "1px dashed black",
          borderBottom: "1px dashed black"
        }}
      >
        <LinesHeader />
      </Grid>
      <Grid item xs={12}>
        {receipt.lines.map(line => {
          return <ReceiptLine key={line.id} line={line} />;
        })}
      </Grid>
      <Grid item xs={12}>
        <ReceiptTotal
          lines_count={receipt.line_count}
          total_ttc={receipt.amount_ttc}
        />
      </Grid>
      <Grid item xs={12}>
        <PaymentMode payment={receipt.vat.payment_mode} />
      </Grid>

      <Grid item xs={12}>
        <ReceiptVAT vat={receipt.vat} />
      </Grid>
    </Grid>
  );
}

function PaymentMode({ payment = [] }) {
  const euro = useCurrency();

  const returned_amount = payment.reduce(
    (acc, pay) => acc + pay.returned_amount,
    0
  );

  return (
    <>
      <Grid
        container
        style={{
          borderTop: "1px dashed black",
          borderBottom: "1px dashed black",
          padding: 10
        }}
      >
        {payment.map(pay => (
          <Grid item xs={12} key={pay.label}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography align="center">{pay.label}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  align="center"
                  variant="h6"
                  style={{ fontWeight: 500 }}
                >
                  {euro.format(pay.paid_amount)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        style={{ padding: 10 }}
        alignItems="center"
        justify="space-between"
        spacing={2}
      >
        <Grid item>
          <Typography align="center">Montant rendu</Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h6" style={{ fontWeight: 500 }}>
            {euro.format(returned_amount || 0)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

function LinesHeader() {
  return (
    <Grid container spacing={2} justify="space-between" alignItems="flex-start">
      <Grid item xs={1}>
        <Typography variant="body2">Qte</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body2">Désignation</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={2}>
            <Typography align="right" variant="body2" gutterBottom>
              Prix
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography align="right" variant="body2" gutterBottom>
              TVA
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const default_line = {
  label: "GROIN SEAU",
  label_extra: "LE KG",
  amount_ttc: "5.80",
  currency: "EUR",
  vat_rate: "2.10 %",

  lines_count: 1,
  total_ttc: "5.80"
};

function ReceiptLine({ line = default_line }) {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={1}>
            <Typography align="right" variant="body2" gutterBottom>
              {line.article_count}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body2" gutterBottom>
              {line.label}
              <span>{line.label_extra && ` - ${line.label_extra}`}</span>
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={2}>
                <Typography
                  align="right"
                  variant="body2"
                  gutterBottom
                  style={{ fontWeight: 500 }}
                >
                  {line.amount_ttc.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontWeight: 500 }}
                >
                  {line.currency || "EUR "}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="right" variant="body2" gutterBottom>
                  {line.vat_rate.toFixed(2)}
                  {"%"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function ReceiptTotal({
  lines_count = "0",
  total_ttc = "00.00",
  currency = "EUR"
}) {
  const euro = useCurrency();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <div style={{ height: 20 }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: 700 }} variant="h6">
              TOTAL ({lines_count})
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: 700 }} variant="h6" align="right">
              {euro.format(total_ttc)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const default_vat = [
  {
    vat_rate: "2.10",
    amount_ht: "9.55",
    amount_vat: "0.41"
  },
  {
    vat_rate: "8.50",
    amount_ht: "19.15",
    amount_vat: "2.24"
  }
];

function ReceiptVAT({ vat = default_vat }) {
  const euro = useCurrency();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Grid container justify="space-around" alignItems="flex-start">
          <Grid item xs={3}>
            <Typography variant="h6">Taux</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">H.T.</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">TVA</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {vat &&
            vat.group.map(tva => (
              <Grid key={tva.vat_rate} item xs={12}>
                <Grid container justify="space-around" alignItems="flex-start">
                  <Grid item xs={3}>
                    <Typography variant="body1">
                      {" "}
                      {tva.vat_rate}
                      {" %"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">
                      {euro.format(tva.amount_ht)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">
                      {euro.format(tva.amount_vat)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid container justify="space-around" alignItems="flex-start">
            <Grid item xs={3}>
              <Typography variant="h6">Totaux:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">
                {euro.format(vat.total_ht)}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">
                {euro.format(vat.total_vat)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReceiptRow;
