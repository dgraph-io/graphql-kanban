import React, { useState } from "react";
import {
  Modal,
  Button,
  Container,
  Header,
  Loader,
  List,
  Icon,
  Grid,
} from "semantic-ui-react";
import ProjectModal from "./project-modal";
import {
  useAllProjectsDetailsQuery,
} from "./types/operations";
import UserWithIcon from "./user";

export interface ProjectProps {
  withProjectEdits: boolean;
}

function Projects(props: ProjectProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

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

      <Grid container={true}>
        <Grid.Row stretched>
          <Grid.Column floated="left">
            <Header as="h1">Projects</Header>
          </Grid.Column>
          <Grid.Column floated="right">
            {props.withProjectEdits && (
              <Button onClick={openModal}>
                <Icon name="plus" />
                New Project
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {ProjectList(props.withProjectEdits)}
    </Container>
  );
};

function ProjectList(withProjectEdits: boolean) {
  const { loading, error, data } = useAllProjectsDetailsQuery();

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;

  const items = data?.queryProject?.map((proj) => {
    let icon: "github" | "gitlab" | "microsoft" | "google" | "react" = "github";
    if (proj?.url?.includes("gitlab")) {
      icon = "gitlab";
    } else if (proj?.url?.includes("microsoft")) {
      icon = "microsoft";
    } else if (proj?.url?.includes("google")) {
      icon = "google";
    } else if (proj?.url?.includes("react")) {
      icon = "react";
    }

    return (
      <List.Item>
        <List.Icon name={icon} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a">{proj?.name}</List.Header>
          {proj?.description} Admin: {proj?.admin && UserWithIcon(proj?.admin)}
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
        </List.Content>
      </List.Item>
    );
  });

  return (
    <List divided relaxed>
      {items}
    </List>
  );
};

export default Projects;
