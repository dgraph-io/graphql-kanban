import React from "react"
import { Container, Dropdown, Image, Menu } from "semantic-ui-react"
import { User } from "../types/graphql"
import { useProjectNamesQuery } from "./types/operations"

export interface HeaderProps {
  user: User
}

function useProjectMenuList() {
  const { loading, error, data } = useProjectNamesQuery()

  if (loading || error) {
    return <Dropdown.Menu />
  }

  return (
    <Dropdown.Menu>
      {data?.queryProject?.map((proj) => (
        <Dropdown.Item>{proj?.name}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  )
}

function Header(props: HeaderProps) {
  const user = props.user

  return (
    <Menu fixed="top" borderless={true}>
      <Container>
        <Menu.Item as="a">
          <Image
            size="tiny"
            src="/diggy.png"
            style={{ marginRight: "1.5em" }}
          />
        </Menu.Item>

        <Menu.Item as="a">Home</Menu.Item>

        <Dropdown item simple text="Projects">
          {useProjectMenuList()}
        </Dropdown>

        <Menu.Menu position="right">
          <Menu.Item position="right" as="a" icon="setting" />

          <Menu.Item position="right" as="a">
            {user.displayName ? user.displayName : user.username}
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Header
