import { gql } from "apollo-boost";

export const SWITCH_COMPANY = gql`
  mutation SwitchCompany($company: SwitchCompanyInputType!) {
    switch_company(company: $company) {
      loggedAs {
        id
      }
      token
      userId
      userCompanies {
        id
        name
        address {
          line1
          postal_code
          country
        }
      }
    }
  }
`;

export const LOCAL_LOGOUT = gql`
  mutation LocalLogout($token: String!) {
    logout @client
  }
`;

export const LOCAL_LOGIN = gql`
  mutation LocalLogin($input: Object!) {
    login(input: $input) @client
  }
`;
export const LOCK_ACCOUNT = gql`
  mutation LockAccount($user: LockAccount!) {
    lock_account(user: $user) {
      id
    }
  }
`;

export const DISABLE_USER = gql`
  mutation DisableUser($userId: ID!, $status: String!) {
    disable_user(userId: $userId, status: $status) {
      id
    }
  }
`;
export const VALID_USER = gql`
  mutation ValidUser($userId: ID!, $company_id: ID!) {
    valid_user(userId: $userId, company_id: $company_id) {
      id
    }
  }
`;

export const FINISH_REGISTER = gql`
  mutation FinishRegister($user: FinishRegisterInputType!) {
    finish_register(user: $user) {
      id
    }
  }
`;
