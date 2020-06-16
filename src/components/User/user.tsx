import { User } from "../../types/graphql";
import { Image } from "semantic-ui-react";
import React from "react";

export function UserWithIcon(user: User) {

  // FIXME: We can get the user icons as their git image.
  // It's url is in the json of the github user resource.
  // Really, we should have this in the schema and be getting the icon url
  // as part of the user query with integration to github api, etc.

  return (<span>
    <Image src='https://github.githubassets.com/images/modules/logos_page/Octocat.png' avatar />
    <span>{user.displayName ?? user.username}</span>
  </span>)
}
