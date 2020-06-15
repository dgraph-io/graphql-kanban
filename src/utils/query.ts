import { gql } from "@apollo/client";

const GET_PROJS = gql`
  query allProjects {
    queryProject {
      projID
      name
    }
  }
`;

const GET_BOARD = gql`
  query getProject($projectID: ID!) {
    getProject(projID: $projectID) {
      name
      columns {
        name
        colID
        tickets {
          id
          title
        }
      }
    }
  }
`;


const GET_TICKET = gql`
  query getTicket($ticketID: ID!) {
    getTicket(id: $ticketID) {
      title
      description
      assignedTo {
        username
      }
      onColumn {
        name
        colID
        inProject {
          name
          projID
        }
      }
    }
  }
`;

const GET_COLS = gql`
  query getProjectCols($projectID: ID!) {
    getProject(projID: $projectID) {
      columns {
        name
        colID
      }
    }
  }
`;



