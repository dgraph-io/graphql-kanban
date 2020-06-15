import { gql } from "@apollo/client";

const UPDATE_TICKET = gql`
  mutation updateTicket($ticketID: ID!, $ticket: TicketPatch) {
    updateTicket(input: { filter: { id: [$ticketID] }, set: $ticket }) {
      ticket {
        title
      }
    }
  }
`;

const CREATE_TICKET = gql`
  mutation addTicket($ticket: AddTicketInput!) {
    addTicket(input: [$ticket]) {
      ticket {
        title
      }
    }
  }
`;

const DELETE_TICKET = gql`
  mutation deleteTicket($ticketID: ID!) {
    deleteTicket(filter: { id: [$ticketID] }) {
      msg
    }
  }
`;

const CREATE_COLUMN = gql`
  mutation addColumn($column: AddColumnInput!) {
    addColumn(input: [$column]) {
      column {
        colID
        name
      }
    }
  }
`;

const CHANGE_COL = gql`
  mutation updateColumn($colID: ID!, $ticketID: ID!) {
    updateColumn(
      input: {
        filter: { colID: [$colID] }
        set: { tickets: [{ id: $ticketID }] }
      }
    ) {
      column {
        name
      }
    }
  }
`;