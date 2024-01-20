import { Badge } from "@/components/ui/badge"
import { Status } from "@/data/models/status/status"

export interface StatusBadgeProps {
  status: Status
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge variant="outline">{status}</Badge>
}

export default StatusBadge
