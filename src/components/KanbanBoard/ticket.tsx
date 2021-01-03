import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Card, Form, Icon, Ref } from "semantic-ui-react";
import updateCacheAfterDelete from "../../utils/updateCacheAfterDelete";
import { useDeleteTicketMutation, useUpdateTicketMutation } from "./types/operations";

interface TicketProps {
  ticket: any;
  index: number;
}

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
  const [deleteTicket] = useDeleteTicketMutation({
    update: updateCacheAfterDelete
  })
  const [updateTicket] = useUpdateTicketMutation()
  const handleEditTicket = () => {
    updateTicket({
      variables: {
        ticketID: ticket.id,
        ticket: {
          title,
          description,
        }
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
                  onClick={() => deleteTicket({ variables: { ticketID: ticket.id } })}
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
