import { gql } from "apollo-boost";

export const CA_TTC_BY_COMPANY_BY_DAY = gql`
  query cash_journals($range: RangeInputType) {
    cash_journals(
      group_by_day: true
      amount_ttc_sum: true
      receipt_sum: true
      order_ASC: true
      range: $range
    ) {
      date
      amount_ttc
      canceled_lines
      receipt_count
    }
  }
`;

export const CASH_JOURNALS = gql`
  query {
    cash_journals(order_DESC: true) {
      id
      date
      receipt_count
      basket_median
      canceled_lines
      profit_amount
      amount_ttc
    }
  }
`;
