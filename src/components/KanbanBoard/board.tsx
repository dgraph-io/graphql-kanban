import React from "react"
import { useParams } from "react-router-dom"
import { KanbanBoard as Board } from "./board.js"

interface KanbanBoardParams {
  projID: string
}

export function KanbanBoard() {
  const { projID } = useParams<KanbanBoardParams>()

  return (
    <Board />
  )
}
