import { Status } from "@/data/models/status/status"
import { StatusBadgeProps } from "./StatusBadge"

const base: StatusBadgeProps = {
  status: Status.draft,
}

export const mockStatusBadgeProps = {
  base,
}
