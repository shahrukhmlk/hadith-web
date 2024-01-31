import { Badge } from "@/components/ui/badge"
import { Status } from "@/data/models/status/status"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status
}

const StatusBadge = ({ status, ...props }: StatusBadgeProps) => {
  return (
    <Badge variant="outline" {...props}>
      {status}
    </Badge>
  )
}

export default StatusBadge
