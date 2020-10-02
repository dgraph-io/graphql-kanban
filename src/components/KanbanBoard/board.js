import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Button,
  Icon,
  Menu,
  Input,
  TextArea, Form
} from "semantic-ui-react"
import { useParams } from 'react-router-dom'

const GET_PROJECT = gql`
  query GET_PROJECT($projID: ID!) {
    getProject(projID:$projID) {
      projID
      name
      url
      description
      admin {
        username
        displayName
      }
      roles {
        id
        permission
        assignedTo {
          username
          displayName
        }
      }
      columns {
        colID
        name
        tickets {
          id
          title
          description
          orderPreference
          assignedTo {
            username
            displayName
          }
        }
        order
      }
      order
    }
  }
`

const ADD_COLUMN = gql`
  mutation ADD_COLUMN ($projID: ID! $name: String!) {
    addColumn(input:[{
      inProject: {projID:$projID}
      name: $name
    }]) {
      numUids
    }
  }
`

const ADD_TICKET = gql`
  mutation ADD_TICKET ($colID: ID!, $title: String!, $description: String) {
    addTicket(input:[{
      onColumn:{colID:$colID}
      title: $title
      description: $description
    }]) {
      numUids
    }
  }
`

const SET_COLUMN_ORDER = gql`
  mutation SET_COLUMN_ORDER ($projID: ID! $order: String!) {
    updateProject(input:{
      filter:{projID:[$projID]}
      set:{order:$order}
    }) {
      numUids
    }
  }
`

const SET_TICKET_ORDER = gql`
  mutation SET_TICKET_ORDER ($colID: ID! $order: String!) {
    updateColumn(input:{
      filter:{colID:[$colID]}
      set:{order:$order}
    }) {
      numUids
    }
  }
`

const MOVE_TICKET = gql`
  mutation MOVE_TICKET ($id: ID! $colID: ID!, $order: String!) {
  updateTicket(input:{
    filter: { id: [$id] }
    set: {
      onColumn: { colID: $colID }
    }
  }) {
    numUids
  }
  updateColumn(input:{
    filter: { colID: [$colID] }
    set: {order:$order}
  }) {
    numUids
  }
}
`

const tryParseJSON = (jsonString, check, def = false) => {
  try {
    var o = JSON.parse(jsonString)
    if (typeof check === "function") {
      if (check(o)) {
        return o
      }
    }
  }
  catch (_e) { }
  return def
}

const NewTicket = ({ colID }) => {
  const [active, setActive] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { colID, title, description },
    ignoreResults: true,
    refetchQueries: ["GET_PROJECT"],
    onCompleted: () => {
      setActive(false)
      setTitle("")
      setDescription("")
    }
  })
  return (
    <>
      {active &&
        <div style={{ marginTop: "10px", backgroundColor: "#fefefe", padding: "10px" }}>
          <Input placeholder="Enter Ticket Title Here" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }} />
          <Form.Field control={TextArea} placeholder="Describe the Issue Here" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", marginTop: "10px", resize: "vertical", padding: "1em" }} />
          {(title !== "") &&
            <Button primary={true} style={{ width: "100%", marginTop: "10px" }} onClick={() => addTicket()}>Submit</Button>
          }
          <Button placeholder="Enter Ticket Description Here" secondary={true} style={{ width: "100%", marginTop: "10px" }} onClick={() => {
            setActive(false)
            setTitle("")
            setDescription("")
          }} >Cancel</Button>
        </div>
      }
      {!active &&
        <div style={{ textAlign: "center", marginTop: "10px", cursor: "pointer" }} onClick={() => setActive(true)}>
          <Icon name="plus" size="big" color="grey" />
        </div>
      }
    </>
  )
}

const Ticket = ({ ticket, index }) => {
  const [active, setActive] = useState(false)
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: "#fefefe",
            padding: "10px",
            boxShadow: "0 1px 2px rgba(34,36,38,.15)",
            borderRadius: "0.5em",
            marginTop: "5px",
          }}
        >
          <h4 onClick={() => setActive(!active)} style={{ cursor: "pointer" }}>{ticket?.title}</h4>
          {active && <p>{ticket?.description}</p>}
        </div>
      )}
    </Draggable>
  )
}

const NewColumn = () => {
  const { projID } = useParams()
  const [active, setActive] = useState(false)
  const [name, setName] = useState("")
  const [addColumn] = useMutation(ADD_COLUMN, {
    variables: { projID, name },
    ignoreResults: true,
    refetchQueries: ["GET_PROJECT"],
    onCompleted: () => {
      setActive(false)
      setName("")
    }
  })
  return (
    <div style={{
      minWidth: active ? "min(360px,80%)" : "min(20%,120px)",
      flex: active ? "1 0" : "0 0",
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
      cursor: active ? "" : "pointer",
    }} onClick={() => !active ? setActive(true) : {}}>
      <div style={{
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: active ? "" : "auto",
      }}>
        {active &&
          <div>
            <Input placeholder="Enter Column Title" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }} />
            {(name !== "") &&
              <Button primary={true} style={{ width: "100%", marginTop: "10px" }} onClick={() => addColumn()}>Submit</Button>
            }
            <Button secondary={true} style={{ width: "100%", marginTop: "10px" }} onClick={() => {
              setActive(false)
              setName("")
            }} >Cancel</Button>
          </div>
        }
        {!active &&
          <Icon name="plus" size="big" color="grey" />
        }
      </div>
    </div >
  )
}

const Column = ({ column, index }) => {
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
          <div  {...provided.dragHandleProps} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
                {column.tickets.map((ticket, index) => (
                  <Ticket ticket={ticket} index={index} key={ticket.id} />
                ))}
                {provided.placeholder}
                <NewTicket colID={column?.colID} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

const orderColumns = (dataColumns, order) => {
  const columns = Array.isArray(dataColumns) ? dataColumns.map(c => {
    const column = { ...c }
    const order = tryParseJSON(column?.order, (order) => Array.isArray(order), [])
    const tickets = Array.isArray(column?.tickets) ? [...column.tickets] : []
    tickets.sort((a, b) => {
      if (!order.includes(a.id) && !order.includes(b.id)) return 0
      if (!order.includes(a.id)) return 1
      if (!order.includes(b.id)) return -1
      return order.indexOf(a.id) - order.indexOf(b.id)
    })
    column.tickets = tickets
    return column
  }) : []
  columns.sort((a, b) => {
    if (!order.includes(a.colID) && !order.includes(b.colID)) return 0
    if (!order.includes(a.colID)) return 1
    if (!order.includes(b.colID)) return -1
    return order.indexOf(a.colID) - order.indexOf(b.colID)
  })
  return columns
}

export const KanbanBoard = () => {
  const { projID } = useParams()
  const { data, loading, error } = useQuery(GET_PROJECT, { variables: { projID } })
  const columnOrder = data?.getProject?.order
  const queriedOrder = useMemo(() => tryParseJSON(columnOrder, (order) => Array.isArray(order), []), [columnOrder])
  const [order, setOrder] = useState(queriedOrder)
  useEffect(() => {
    setOrder(queriedOrder)
  }, [queriedOrder])
  const projectColumns = data?.getProject?.columns
  const memoizedColumns = useMemo(() => orderColumns(projectColumns, order), [projectColumns, order])
  const [columns, setColumns] = useState(memoizedColumns)
  useEffect(() => setColumns(memoizedColumns), [memoizedColumns])

  const [pushColumnOrder] = useMutation(SET_COLUMN_ORDER)
  const [pushTicketOrder] = useMutation(SET_TICKET_ORDER)
  const [moveTicket] = useMutation(MOVE_TICKET)
  // function to catch onDgragEnd and process changes
  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return null
    // dragging column to column position
    switch (type) {
      case "columns":
        if (destination.droppableId === source.droppableId) {
          const tempOrder = columns.map(column => column.colID)
          let start = source.index
          let end = destination.index
          if (start === end) return null
          const [removed] = tempOrder.splice(start, 1)
          tempOrder.splice(end, 0, removed)
          setOrder(tempOrder)
          pushColumnOrder({
            variables: {
              projID: destination.droppableId,
              order: JSON.stringify(tempOrder)
            },
            ignoreResults: true,
            refetchQueries: ["GET_PROJECT"],
            onCompleted: () => {
              console.log("Updated Order!")
            }
          })
        }
        break
      case "tickets":
        if (destination.droppableId === source.droppableId) {
          if (source.index === destination.index) return null
          // reordering
          const tempOrder = []
          columns.filter(column => column.colID === source.droppableId).forEach(column => {
            column.tickets.forEach(ticket => {
              tempOrder.push(ticket.id)
            })
          })
          let start = source.index
          let end = destination.index
          if (start === end) return null
          const [removed] = tempOrder.splice(start, 1)
          tempOrder.splice(end, 0, removed)
          setColumns(columns.map(c => {
            const column = { ...c }
            if (column.colID === source.droppableId) {
              column.order = tempOrder
            }
            return column
          }))
          pushTicketOrder({
            variables: {
              colID: destination.droppableId,
              order: JSON.stringify(tempOrder)
            },
            ignoreResults: true,
            refetchQueries: ["GET_PROJECT"],
            onCompleted: () => {
              console.log("Updated Order!")
            }
          })
          return null
        } else {
          // moving
          const tempOrder = []
          columns.filter(column => column.colID === destination.droppableId).forEach(column => {
            column.tickets.forEach(ticket => {
              tempOrder.push(ticket.id)
            })
          })
          tempOrder.splice(destination.index, 0, draggableId)
          moveTicket({
            variables: {
              id: draggableId,
              colID: destination.droppableId,
              order: JSON.stringify(tempOrder)
            },
            ignoreResults: true,
            refetchQueries: ["GET_PROJECT"],
            onCompleted: () => {
              console.log("Moved Ticket!")
            }
          })
        }
        break
      default:
        break
    }
    return null
  }

  // if loading return loading message
  if (loading) return <>Loading...</>
  // if error return error message
  if (error) return <>Error!</>
  return (
    <div style={{ height: "-webkit-fill-available", display: "flex", flexDirection: "column" }}>
      <Menu pointing secondary style={{}}>
        <Menu.Item header>{data?.getProject?.name}</Menu.Item>
        <Menu.Menu position="right">
        </Menu.Menu>
      </Menu>
      {/* <div style={{
        height: "-webkit-fill-available",
      }}> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="project" direction="horizontal" type="columns">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                overflowX: "auto",
                height: "-webkit-fill-available",
                display: "Flex",
                paddingLeft: "5px",
                paddingRight: "5px",
                minWidth: "100%",
                float: "left",
              }}
            >
              {columns.map((column, index) => (
                <Column column={column} index={index} key={column.colID} />
              ))}
              {provided.placeholder}
              <NewColumn />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* </div> */}
    </div>
  );
}

export default KanbanBoard 