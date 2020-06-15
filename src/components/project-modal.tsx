import React, { Fragment, useState } from "react"
import { Header, Image, Modal, Form } from "semantic-ui-react"
import { Project } from "../types/graphql"

import {
  useAllUsersQuery,
  useGetProjectDetailsQuery,
  useAddProjectMutation,
  ProjectNamesDocument,
  useUpdateProjectDetailsMutation,
  AllProjectsDetailsQuery,
  AllProjectsDetailsQueryVariables,
  AllProjectsDetailsDocument,
} from "./types/operations"

export interface ProjectModalProps {
  closeModal?: () => void
  projID?: string
}

function useFormButton(project: Partial<Project>, closeModal: () => void) {

  // FIXME: need to also update the cache for the header project dropdown component

  const [addProjectMutation] = useAddProjectMutation({
    update(cache, { data }) {
      const projs = cache.readQuery<
        AllProjectsDetailsQuery,
        AllProjectsDetailsQueryVariables
      >({ query: ProjectNamesDocument })
      if (!projs?.queryProject || !data?.addProject?.project) {
        return
      }
      const queryProject = [...projs.queryProject, ...data.addProject.project]
      cache.writeQuery<
        AllProjectsDetailsQuery,
        AllProjectsDetailsQueryVariables
      >({
        query: AllProjectsDetailsDocument,
        data: { queryProject },
      })
    },
  })

  const [updtProjectMutation] = useUpdateProjectDetailsMutation({
    update(cache, { data }) {
      const projs = cache.readQuery<
        AllProjectsDetailsQuery,
        AllProjectsDetailsQueryVariables
      >({ query: ProjectNamesDocument })
      if (!projs?.queryProject || !projs || !data?.updateProject?.project) {
        return
      }
      const updated = data.updateProject.project[0]
      if (!updated) {
        return
      }
      const queryProject = projs.queryProject.map((proj) => {
        if (proj?.projID === updated.projID) {
          return updated
        } else {
          return proj
        }
      })
      cache.writeQuery<
        AllProjectsDetailsQuery,
        AllProjectsDetailsQueryVariables
      >({
        query: AllProjectsDetailsDocument,
        data: { queryProject },
      })
    },
    // TODO: could also do optimistic update in here
  })

  return (
    <Form.Button
      disabled={!project.name || !project.admin}
      onClick={() => {
        if (project.name && project.admin) {
          const { projID, __typename, admin, ...proj } = project
          projID
            ? updtProjectMutation({
                variables: {
                  id: projID,
                  details: { ...proj, admin: { username: admin.username } },
                },
              })
            : addProjectMutation({
                variables: { proj: { ...project, name: project.name } },
              })

          closeModal()
        }
      }}
    >
      Save Project
    </Form.Button>
  )
}

function useSelectUser(
  getUser: () => string | undefined,
  setUser: (username: string) => void
) {
  const { data, loading, error } = useAllUsersQuery()

  // FIXME: what to do on error? they couldn't select an admin
  // so I really should done something ... maybe it should just close
  // the modal?
  if (error) {
    console.log(error)
  }

  // TODO: This should use the userWithIcon component to render with a github icon
  const users = data?.queryUser
    ? data?.queryUser.map((user) => ({
        value: user?.username,
        text: user?.displayName,
        icon: "doctor",
      }))
    : []

  return (
    <Form.Select
      fluid
      loading={loading}
      label="Project Admin"
      icon="user plus"
      options={users}
      placeholder="Select an Admin"
      value={getUser()}
      onChange={(_, { value }) => {
        if (value) {
          setUser(value.toString())
        }
      }}
    />
  )
}

function ProjectModal(props: ProjectModalProps) {
  const header = props.projID ? "Edit Project" : "Add New Project"
  const [project, setProject] = useState<Partial<Project>>({})
  const noop = () => {}
  const closeModal = props.closeModal ?? noop

  const {
    loading: projectDataLoading,
    error: projectDataError,
  } = useGetProjectDetailsQuery({
    variables: {
      projID: props.projID ?? "0x0",
    },
    onCompleted: (data) => {
      if (data.getProject) {
        setProject(data.getProject)
      }
    },
  })

  if (projectDataError) {
    console.log(projectDataError)
  }

  const loading = !!props.projID && projectDataLoading

  return (
    <Fragment>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://img.icons8.com/dusk/256/000000/new-job.png"
        />
        <Modal.Description>
          <Header>Project Details</Header>

          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                loading={loading}
                label="Project Name"
                placeholder="Project Name (required)"
                value={project.name}
                onChange={(_, { value }) =>
                  setProject({ ...project, name: value })
                }
              />
              {useSelectUser(
                () => project.admin?.username,
                (username: string) =>
                  setProject({ ...project, admin: { username } })
              )}
            </Form.Group>
            <Form.Input
              loading={loading}
              label="Project URL"
              placeholder="E.G. GitHub URL (optional)"
              value={project.url}
              onChange={(_, { value }) =>
                setProject({ ...project, url: value })
              }
            />

            <Form.TextArea
              label="Project Description"
              placeholder="A short description of the project (optional)"
              value={project.description ? project.description : ""}
              onChange={(_, { value }) =>
                setProject({ ...project, description: value?.toString() })
              }
            />

            {useFormButton(project, closeModal)}
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Fragment>
  )
}

export default ProjectModal
