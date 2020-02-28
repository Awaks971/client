import { gql } from "apollo-boost";

export const TOP_PAYMENT_MODE = gql`
  query TopPaymentMode($range: RangeInputType) {
    top_payment_mode(range: $range) {
      label
      amount
    }
  }
`;
