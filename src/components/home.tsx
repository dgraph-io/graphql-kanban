import React from "react"
import { User } from "../types/graphql"
import { Header } from "./Header"
import { Projects } from "./Projects"

export interface HomeProps {
  user: User
}

export function Home(props: HomeProps) {
  return (
    <div>
      <Header user={props.user} />
      <Projects withProjectEdits={props.user.isAdmin === true} />
    </div>
  )
}
