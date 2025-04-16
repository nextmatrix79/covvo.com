"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  Filter,
  Plus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Claim {
  policyNumber: string;
  companyName: string;
  companyContacts: string;
  policyType: string;
  claimantName: string;
  claimantContacts: string;
  status: "Unassigned" | "Active" | "Expired";
}

// Sample data for the table
const claimsData: Claim[] = [
  {
    policyNumber: "INS-456789",
    companyName: "ABC Insurance Ltd",
    companyContacts: "(123) 456-7890\nabc@email.com",
    policyType: "Auto Accident",
    claimantName: "John Doe",
    claimantContacts: "(123) 456-7890\nabc@email.com",
    status: "Unassigned",
  },
  // ... (rest of your sample data)
];

export default function ClaimsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Claim;
    direction: "asc" | "desc";
  }>({ key: "policyNumber", direction: "asc" });

  // Filter data based on search term
  const filteredData = claimsData.filter((claim) =>
    Object.values(claim).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle sorting
  const handleSort = (key: keyof Claim) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Status color mapping
  const getStatusColor = (status: Claim["status"]) => {
    switch (status) {
      case "Unassigned":
        return "text-yellow-500";
      case "Active":
        return "text-blue-500";
      case "Expired":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Table header with sorting component
  const TableHeader = ({
    label,
    sortKey,
    hasCheckbox = false,
  }: {
    label: string;
    sortKey: keyof Claim;
    hasCheckbox?: boolean;
  }) => (
    <th className="p-3 text-left">
      <div className="flex items-center space-x-2">
        {hasCheckbox && <Checkbox />}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSort(sortKey)}
        >
          <span>{label}</span>
          <div className="ml-1 flex flex-col">
            <ChevronUp
              className={`w-3 h-3 ${
                sortConfig.key === sortKey && sortConfig.direction === "asc"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            />
            <ChevronDown
              className={`w-3 h-3 ${
                sortConfig.key === sortKey && sortConfig.direction === "desc"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            />
          </div>
        </div>
      </div>
    </th>
  );
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/claims/create");
  };
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 gap-4">
          {/* Left Section - Date with Navigation Arrows */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="h-10 px-4 py-2 text-sm">
              March, 2025
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Section - Search and Actions */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-64"
            />
            <Button variant="outline" className="h-10 px-4 py-2 text-sm gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort By
            </Button>
            <Button variant="outline" className="h-10 px-4 py-2 text-sm gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button
              className="h-10 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 gap-2"
              onClick={handleClick}
            >
              <Plus className="w-4 h-4" />
              Add Claim
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-6 flex flex-row justify-between">
            {/* Heading */}
            <h1 className="text-2xl font-bold">All Claims</h1>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-64"
              />
              <Button
                variant="outline"
                className="h-10 px-4 py-2 text-sm gap-2"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort By
              </Button>
              <Button
                variant="outline"
                className="h-10 px-4 py-2 text-sm gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Table section */}
          <div className="overflow-x-auto bg-white">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <TableHeader
                    label="Policy #"
                    sortKey="policyNumber"
                    hasCheckbox
                  />
                  <TableHeader label="Company Name" sortKey="companyName" />
                  <TableHeader
                    label="Company Contacts"
                    sortKey="companyContacts"
                  />
                  <TableHeader label="Policy Type" sortKey="policyType" />
                  <TableHeader label="Claimant Name" sortKey="claimantName" />
                  <TableHeader
                    label="Claimant Contacts"
                    sortKey="claimantContacts"
                  />
                  <TableHeader label="Status" sortKey="status" />
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((claim, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox />
                        <span>{claim.policyNumber}</span>
                      </div>
                    </td>
                    <td className="p-3">{claim.companyName}</td>
                    <td className="p-3 whitespace-pre-line">
                      {claim.companyContacts}
                    </td>
                    <td className="p-3">{claim.policyType}</td>
                    <td className="p-3">{claim.claimantName}</td>
                    <td className="p-3 whitespace-pre-line">
                      {claim.claimantContacts}
                    </td>
                    <td className={`p-3 ${getStatusColor(claim.status)}`}>
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                        {claim.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button variant="outline" size="sm">
                        ...
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4">
          {/* Rows per page selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded p-1 h-9 w-16 text-sm"
              aria-label="Rows per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-sm">Rows</span>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              className="h-9 w-9"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                className="h-9 w-9"
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              className="h-9 w-9"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
