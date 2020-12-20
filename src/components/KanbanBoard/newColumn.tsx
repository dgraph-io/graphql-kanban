import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Icon } from "semantic-ui-react";

const ADD_COLUMN = gql`
  mutation ADD_COLUMN($projID: ID!, $name: String!) {
    addColumn(input: [{ inProject: { projID: $projID }, name: $name }]) {
      numUids
      column {
        colID
        inProject {
          projID
          columns {
            colID
          }
        }
      }
    }
  }
`;

interface ParamProps {
  projID: string;
}

export function NewColumn() {
  const { projID } = useParams<ParamProps>();
  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [addColumn] = useMutation(ADD_COLUMN, {
    variables: { projID, name },
    ignoreResults: true,
    onCompleted: () => {
      setActive(false);
      setName("");
    },
  });
  return (
    <div
      style={{
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
      }}
      onClick={() => (!active ? setActive(true) : {})}
    >
      <div
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          margin: active ? "" : "auto",
        }}
      >
        {active && (
          <div>
            <Input
              placeholder="Enter Column Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%" }}
            />
            {name !== "" && (
              <Button
                primary={true}
                style={{ width: "100%", marginTop: "10px" }}
                onClick={() => addColumn()}
              >
                Submit
              </Button>
            )}
            <Button
              secondary={true}
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => {
                setActive(false);
                setName("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        {!active && <Icon name="plus" size="big" color="grey" />}
      </div>
    </div>
  );
}
