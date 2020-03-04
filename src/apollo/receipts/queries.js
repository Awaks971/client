import { gql } from "apollo-boost";

export const RECEIPTS_BY_CASH_JOURNAL = gql`
  query Receipts($cash_journal_id: ID!) {
    receipts(cash_journal_id: $cash_journal_id) {
      cash_journal_id
      id
      date
      amount_ttc
      receipt_number
      profit
      article_count
    }
    cash_journal(id: $cash_journal_id) {
      date
    }
  }
`;

export const RECEIPT_BY_TAX_DOCUMENT = gql`
  query Receipt($id: ID!) {
    receipt(id: $id) {
      cash_journal_id
      date
      receipt_number
      line_count
      amount_ttc
      seller_name

      lines {
        id
        label
        label_extra
        amount_ttc
        vat_rate

        article_count
      }

      vat {
        group {
          amount_ht
          amount_vat
          vat_rate
        }
        payment_mode {
          label
          paid_amount
          returned_amount
        }
        total_ht
        total_vat
      }
    }
  }
`;

export const ARTICLES_STATS = gql`
  query ArticlesStats(
    $limit: Int
    $start_at: Int
    $order_by: String
    $range: RangeInputType
  ) {
    articles_stats(
      limit: $limit
      start_at: $start_at
      order_by: $order_by
      range: $range
    ) {
      article_id
      label
      profit
      amount_ttc
      article_count
    }
    pagination(by: "article_id", table: "receipt_line") {
      total_rows
    }
  }
`;

export const TOP_5_FAMILIES = gql`
  query TopFamilies($range: RangeInputType) {
    top_families(range: $range, limit: 5) {
      label
      id
      amount_ttc
      article_count
    }
  }
`;

export const TOP_5_SELLERS = gql`
  query TopSellers($range: RangeInputType) {
    top_sellers(range: $range, limit: 5) {
      name
      id
      amount_ttc
      article_count
    }
  }
`;
