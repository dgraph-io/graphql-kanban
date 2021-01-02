import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Card, Form, Icon, Ref } from "semantic-ui-react";
import { DeleteTicketPayload, UpdateTicketPayload } from "../../types/graphql";
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

const UPDATE_TICKET = gql`
  mutation UDPATE_TICKET($id: ID!, $title: String!, $description: String!) {
    updateTicket(
      input: {
        filter: { id: [$id] }
        set: { title: $title, description: $description }
      }
    ) {
      numUids
      ticket {
        id
        title
        description
      }
    }
  }
`;

export function Ticket(props: TicketProps) {
  const { ticket, index } = props;
  const [editing, editTicket] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setTitle(ticket?.title);
    setDescription(ticket?.description);
  }, [ticket]);
  const [commenting, addComment] = useState(false);
  const [deleteTicket] = useDelete<
    { deleteTicket: DeleteTicketPayload },
    { id: string }
  >(DELETE_TICKET);
  const [updateTicket] = useMutation<
    { updateTicekt: UpdateTicketPayload },
    { id: string; title: string; description: string }
  >(UPDATE_TICKET);
  const handleEditTicket = () => {
    updateTicket({
      variables: {
        id: ticket.id,
        title,
        description,
      },
    });
    editTicket(false);
  };
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
            {...provided.dragHandleProps}
          >
            <Card.Content>
              {editing && (
                <Form onSubmit={handleEditTicket}>
                  <Form.Input
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e, { value }) => setTitle(value)}
                  />
                  <Form.TextArea
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e, { value }) => setDescription(value as string)}
                  />
                </Form>
              )}
              {!editing && (
                <>
                  <Card.Header>{ticket?.title}</Card.Header>
                  <Card.Description>{ticket?.description}</Card.Description>
                </>
              )}
            </Card.Content>
            <Card.Content>
              <Button.Group widths={3} size="mini">
                <Button
                  inverted
                  negative
                  animated="vertical"
                  color={editing ? "grey" : "blue"}
                  onClick={() =>
                    editing ? editTicket(false) : addComment(!commenting)
                  }
                >
                  <Button.Content visible>
                    <Icon
                      color={editing ? "grey" : undefined}
                      name={editing ? "cancel" : "comment outline"}
                    />
                  </Button.Content>
                  <Button.Content hidden>
                    {editing ? "Cancel" : "Add Comment"}
                  </Button.Content>
                </Button>
                <Button
                  inverted
                  negative
                  animated="vertical"
                  color={editing ? "green" : "orange"}
                  onClick={() =>
                    editing ? handleEditTicket() : editTicket(!editing)
                  }
                  // active={editing}
                >
                  <Button.Content visible>
                    <Icon name={editing ? "save outline" : "edit outline"} />
                  </Button.Content>
                  <Button.Content hidden>
                    {editing ? "Save Edits" : "Edit Ticket"}
                  </Button.Content>
                </Button>
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
