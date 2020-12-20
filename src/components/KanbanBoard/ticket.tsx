import { gql } from "@apollo/client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Card, Icon, Ref } from "semantic-ui-react";
import { DeleteTicketPayload } from "../../types/graphql";
import useDelete from "../../utils/useDelete";

interface TicketProps {
  ticket: any;
  index: number;
}

const DELETE_TICKET = gql`
  mutation DELETE_TICKET($id: ID!) {
    deleteTicket(filter: { id: [$id] }) {
      ticket {
        id
      }
    }
  }
`;

export function Ticket(props: TicketProps) {
  const { ticket, index } = props;
  const [deleteTicket] = useDelete<
    { deleteTicket: DeleteTicketPayload },
    { id: string }
  >(DELETE_TICKET);
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <Ref innerRef={provided.innerRef}>
          <Card
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              width: "unset",
              backgroundColor: "#fefefe",
              padding: "10px",
              boxShadow: "0 1px 2px rgba(34,36,38,.15)",
              borderRadius: "0.5em",
              marginTop: "5px",
            }}
          >
            <Card.Content>
              <Card.Header {...provided.dragHandleProps}>
                {ticket?.title}
              </Card.Header>
              <Card.Description>{ticket?.description}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Button.Group widths={2} size="mini">
                <Button
                  inverted
                  negative
                  animated="vertical"
                  color="red"
                  onClick={() => deleteTicket({ variables: { id: ticket.id } })}
                >
                  <Button.Content visible>
                    <Icon name="trash alternate outline" />
                  </Button.Content>
                  <Button.Content hidden>Delete Ticket</Button.Content>
                </Button>
              </Button.Group>
            </Card.Content>
          </Card>
        </Ref>
      )}
    </Draggable>
  );
}
