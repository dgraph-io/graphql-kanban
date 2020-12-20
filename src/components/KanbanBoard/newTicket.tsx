import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Input,
  Form,
  TextArea,
  Button,
  Icon,
  Confirm,
} from "semantic-ui-react";
import { DeleteColumnPayload } from "../../types/graphql";
import useDelete from "../../utils/useDelete";

const ADD_TICKET = gql`
  mutation ADD_TICKET($colID: ID!, $title: String!, $description: String) {
    addTicket(
      input: [
        {
          onColumn: { colID: $colID }
          title: $title
          description: $description
        }
      ]
    ) {
      numUids
      ticket {
        id
        onColumn {
          colID
          tickets {
            id
            title
            description
          }
        }
      }
    }
  }
`;

const DELETE_COLUMN = gql`
  mutation DELETE_COLUMN($colID: ID!) {
    deleteColumn(filter: { colID: [$colID] }) {
      column {
        colID
      }
    }
  }
`;

interface NewTicketProps {
  colID: string;
  columnName: string;
  withDelete?: boolean;
}

export function NewTicket(props: NewTicketProps) {
  const { colID, columnName, withDelete = false } = props;
  const [active, setActive] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteColumn] = useDelete<
    { deleteColumn: DeleteColumnPayload },
    { colID: string }
  >(DELETE_COLUMN);
  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { colID, title, description },
    ignoreResults: true,
    onCompleted: () => {
      setActive(false);
      setTitle("");
      setDescription("");
    },
  });
  return (
    <>
      {active && (
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#fefefe",
            padding: "10px",
          }}
        >
          <Input
            placeholder="Enter Ticket Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
          <Form.Field
            control={TextArea}
            placeholder="Describe the Issue Here"
            value={description}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setDescription(e.target.value)}
            style={{
              width: "100%",
              marginTop: "10px",
              resize: "vertical",
              padding: "1em",
            }}
          />
          {title !== "" && (
            <Button
              primary={true}
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => addTicket()}
            >
              Submit
            </Button>
          )}
          <Button
            placeholder="Enter Ticket Description Here"
            secondary={true}
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              setActive(false);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      {!active && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!active && (
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => setActive(true)}
            >
              <Icon name="plus" size="big" color="grey" />
            </div>
          )}
          {!showDelete && withDelete && (
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => setShowDelete(true)}
            >
              <Icon name="trash alternate outline" size="big" color="grey" />
            </div>
          )}
          <Confirm
            open={showDelete && withDelete}
            header="Delete Column?"
            content="Deleting this column will not delete the Tickets on this column."
            cancelButton="Nevermind"
            confirmButton={`Delete ${columnName} Column`}
            onCancel={() => setShowDelete(false)}
            onConfirm={() => deleteColumn({ variables: { colID: colID } })}
          />
        </div>
      )}
    </>
  );
}
