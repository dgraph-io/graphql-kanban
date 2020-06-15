import React, { useState } from "react"
import {
  Modal,
  Button,
  Container,
  Header,
  Loader,
  Icon,
  Menu,
  Table,
} from "semantic-ui-react"
import ProjectModal from "./project-modal"
import { useAllProjectsDetailsQuery } from "./types/operations"
import UserWithIcon from "./user"

export interface ProjectProps {
  withProjectEdits: boolean
}

function Projects(props: ProjectProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Container text style={{ marginTop: "10em" }}>
      {props.withProjectEdits && (
        <Modal
          open={modalVisible}
          closeOnDimmerClick={true}
          onClose={closeModal}
        >
          <ProjectModal closeModal={closeModal} />
        </Modal>
      )}

      <Menu pointing secondary>
        <Menu.Item header>Projects</Menu.Item>
        <Menu.Menu position="right">
          {props.withProjectEdits && (
            <Menu.Item onClick={openModal}>
              <Icon name="plus" />
              New Project
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>

      {ProjectList(props.withProjectEdits)}
    </Container>
  )
}

function ProjectList(withProjectEdits: boolean) {
  const { loading, error, data } = useAllProjectsDetailsQuery()

  if (loading) return <Loader />
  if (error) return `Error! ${error.message}`

  const items = data?.queryProject?.map((proj) => {
    let icon: "github" | "gitlab" | "microsoft" | "google" | "react" = "github"
    if (proj?.url?.includes("gitlab")) {
      icon = "gitlab"
    } else if (proj?.url?.includes("microsoft")) {
      icon = "microsoft"
    } else if (proj?.url?.includes("google")) {
      icon = "google"
    } else if (proj?.url?.includes("react")) {
      icon = "react"
    }
    return (
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <a href={proj?.url ?? ""} target="__blank" style={{color: "black"}}>
              <Icon name={icon} size="large" verticalAlign="middle" />
            </a>
            <Header.Content>
              {proj?.name}
              <Header.Subheader>{proj?.description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{proj?.admin && UserWithIcon(proj?.admin)}</Table.Cell>
        <Table.Cell>
          {withProjectEdits && (
            <Modal
              trigger={
                <Button>
                  <Icon name="edit" />
                  Edit
                </Button>
              }
            >
              <ProjectModal projID={proj?.projID} />
            </Modal>
          )}
        </Table.Cell>
      </Table.Row>
    )
  })

  return (
    <Table basic="very">
      <Table.Body>{items}</Table.Body>
    </Table>
  )
}

export default Projects
