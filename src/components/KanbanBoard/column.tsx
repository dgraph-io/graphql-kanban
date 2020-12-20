import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { NewTicket } from "./newTicket";
import { Ticket } from "./ticket";

interface ColumnProps {
  column: any;
  index: number;
}

export function Column(props: ColumnProps) {
  const { column, index } = props;
  return (
    <Draggable draggableId={column.colID} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            minWidth: "min(360px,80%)",
            maxWidth: "80%",
            flex: "1 0",
            display: "Flex",
            flexDirection: "column",
            marginLeft: "5px",
            marginRight: "5px",
            marginBottom: "5px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#ededed",
            boxShadow: "0 1px 2px rgba(34,36,38,.15)",
            borderRadius: "0.5em",
          }}
        >
          <div
            {...provided.dragHandleProps}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
            <h3>{column?.name}</h3>
          </div>
          <Droppable droppableId={column.colID} type="tickets">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  overflowY: "scroll",
                  height: "-webkit-fill-available",
                  paddingLeft: "10px",
                  paddingRight: "5px",
                }}
              >
                {column.tickets.map(
                  (
                    ticket: { id: string | number | null | undefined },
                    index: number
                  ) => (
                    <Ticket ticket={ticket} index={index} key={ticket.id} />
                  )
                )}
                {provided.placeholder}
                <NewTicket
                  colID={column?.colID}
                  columnName={column?.name}
                  withDelete
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
