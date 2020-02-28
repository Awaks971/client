import { gql } from "apollo-boost";

export const ADD_TECHNICIAN = gql`
  mutation AddTechnician($technician: TechnicianInputType!) {
    add_technician(technician: $technician) {
      id
      firstname
      lastname
      email
      phone
    }
  }
`;

export const DISABLE_TECHNICIAN = gql`
  mutation DisableTechnician($technicianId: ID!, $status: String!) {
    disable_technician(technicianId: $technicianId, status: $status) {
      id
    }
  }
`;
