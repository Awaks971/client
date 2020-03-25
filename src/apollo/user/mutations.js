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
export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($new_password: String!) {
    update_password(new_password: $new_password) {
      id
    }
  }
`;
export const UPDATE_PERSONAL_INFORMATIONS = gql`
  mutation UpdatePersonnalInformation(
    $personal_informations: PersonalInformationsInputType!
  ) {
    update_personal_informations(
      personal_informations: $personal_informations
    ) {
      id
    }
  }
`;
