import React from "react";
import { User } from "../types/graphql";
import Header from "./header";
import Projects from "./projects";

export interface HomeProps {
  user: User;
}

function HomePage(props: HomeProps) {
  return (
    <div>
      <Header user={props.user} />
      <Projects withProjectEdits={props.user.isAdmin === true} />
    </div>
  );
}

export default HomePage;
