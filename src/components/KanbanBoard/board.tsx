import React from "react"
import { useParams } from "react-router-dom"

interface KanbanBoardParams {
  projID: string
}

export function KanbanBoard() {
  const { projID } = useParams<KanbanBoardParams>()

  return (
    <div>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
      <p>Board Number {projID}</p>
    </div>
  )
}
