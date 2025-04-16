import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export type ClaimStatus = "Pending" | "Approved" | "Rejected" | "Processing"

export interface Claim {
  id: string
  policyNumber: string
  claimant: string
  claimDate: string
  status: ClaimStatus
  amount: number
}

interface ClaimTableProps {
  claims: Claim[]
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onSort?: (field: keyof Claim) => void
  sortField?: keyof Claim
  sortDirection?: "asc" | "desc"
}

export function ClaimTable({
  claims,
  page = 1,
  totalPages = 1,
  onPageChange,
  onSort,
  sortField,
  sortDirection
}: ClaimTableProps) {
  const getStatusColor = (status: ClaimStatus) => {
    const colors = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
      Processing: "bg-blue-100 text-blue-800"
    }
    return colors[status]
  }

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Table implementation from previous examples */}
    </div>
  )
}