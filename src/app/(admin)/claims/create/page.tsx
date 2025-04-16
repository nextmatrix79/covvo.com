"use client";
import { useState } from "react";
import { FormField, FormSection } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectOption from "@/components/ui/selectoption";
import { DeleteIcon } from "@/components/icons";
import { Plus , ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
export default function CreateClaimPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    // Add your form submission logic here
  };
  const [incidentData, setIncidentData] = useState({
    claimType: "Auto Accident",
    date: "2025-03-14",
    time: "15:45",
    location: "Ummul Ramool, Dubai, UAE, 23000",
    description:
      "Rear-end collision at a traffic light due to sudden braking of the vehicle ahead.",
  });
  const claimTypes = [
    { value: "Auto Accident", label: "Auto Accident" },
    { value: "Property Damage", label: "Property Damage" },
    { value: "Theft", label: "Theft" },
    { value: "Natural Disaster", label: "Natural Disaster" },
  ];
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setIncidentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setIncidentData((prev) => ({ ...prev, claimType: value }));
  };
  const [docs, setDocs] = useState([
    {
      id: 1,
      name: "Photos of Damage/Incident Scene",
      description: "This is the file where the incident happened",
      file: "photo.jpg",
    },
    {
      id: 2,
      name: "Repair Estimates",
      description: "Estimation report with quotation",
      file: "estimate.pdf",
    },
    {
      id: 3,
      name: "Medical Bills",
      description: "These are all medical bills",
      file: "medical.pdf",
    },
    {
      id: 4,
      name: "Legal Documents",
      description: "These are all legal documents",
      file: "legal.pdf",
    },
  ]);

  const handleDelete = (id: number) => {
    setDocs(docs.filter((doc) => doc.id !== id));
    setDamagedItems(damagedItems.filter(item => item.id !== id));
  };
  const router = useRouter();
  const [damagedItems, setDamagedItems] = useState([
    { id: 1, name: 'Rear bumper', damage: 'Full destroyed and new is required', cost: '$. 20,000/-' },
    { id: 2, name: 'Rear bumper', damage: 'Full destroyed and new is required', cost: '$. 20,000/-' }
  ]);
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className=" bg-white  flex items-center justify-between">
        <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold">Create New Claim</h1>
      </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-9 px-4 text-sm border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 px-4 text-sm bg-blue-600 hover:bg-blue-700"
            >
              Submit Claim
            </Button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Policyholder Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Policyholder Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="fullName"
              placeholder="Enter Full Name"
              required
            />
            <FormField
              label="Insurance Company Name"
              name="insuranceCompany"
              placeholder="Enter Insurance Company Name"
              required
            />
            <FormField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="Enter Phone Number"
              required
            />
            <FormField
              label="Policy Number"
              name="policyNumber"
              placeholder="Enter Policy Number"
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email Address"
              required
            />
            <FormField
              label="Mailing Address"
              name="mailingAddress"
              type="address"
              placeholder="Enter Mailing Address"
            />
          </div>
        </div>

        {/* Claimed Information  */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Claimed Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="fullName"
              placeholder="Enter Full Name"
              required
            />
            <FormField
              label="Relationship to Policyholder"
              name="Claimed Policy Number"
              type="Claimed Policy Number"
              placeholder="Enter Policy Number"
              required
            />
            <FormField
              label="Phone Number"
              name="Claimed Phone Number"
              type="Claimed Phone Number"
              placeholder="Enter Claimed Phone Number"
              required
            />
            <FormField
              label="Email"
              name="Claimed Email Address"
              type="Claimed Email Address"
              placeholder="Enter Email Address"
              required
            />
          </div>
        </div>
        {/* Loss/Incident Details  */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Loss/Incident Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Claim Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Claim
              </label>
              <SelectOption
                options={claimTypes}
                value={incidentData.claimType}
                onChange={handleSelectChange}
                placeholder="Select claim type"
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Loss/Incident
              </label>
              <Input
                type="date"
                name="date"
                value={incidentData.date}
                onChange={handleChange}
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time of Incident
              </label>
              <Input
                type="time"
                name="time"
                value={incidentData.time}
                onChange={handleChange}
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location of Incident
              </label>
              <Input
                type="text"
                name="location"
                value={incidentData.location}
                onChange={handleChange}
                placeholder="Enter location"
              />
            </div>

            {/* Description Textarea */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description of the Incident
              </label>
              <Textarea
                name="description"
                value={incidentData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the incident details"
              />
            </div>
          </div>
        </div>
        {/* Damages or Injuries Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Damages or Injuries</h2>

          {/* Medical Treatment Received */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              Medical Treatment Received
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormField
                  label=" Treatment Details"
                  name="Licence Plate"
                  placeholder="Vehicle driven by Haseeb(Licence Plate: XYZ 1234)"
                  required
                />
              </div>
              <div>
                <FormField
                  label="Injured Parties"
                  name="Jhon Deo"
                  placeholder="Jhon Deo (Driver)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Third-Party Involvement */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              Third-Party Involvement
            </h3>
            <div>
              <FormField
                label="Party Details"
                name="Licence Plate"
                placeholder="Vehicle driven by Haseeb(Licence Plate: XYZ 1234)"
                required
              />
            </div>
          </div>

          {/* List of Damaged Items - Keeping the table as is */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">List of Damaged Items</h3>
              <Button
                className="h-10 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 gap-2"
                onClick={() => {
                  /* Add your click handler here */
                }}
              >
                <Plus className="w-4 h-4" />
                Add Damaged Item
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Damage Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rear bumper
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Full destroyed and new is required
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $. 20,000/-
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <DeleteIcon onClick={() => handleDelete(0)} />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rear bumper
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Full destroyed and new is required
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $. 20,000/-
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <DeleteIcon onClick={() => handleDelete(0)} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*Witness Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Witness Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Witness Name"
              name="Witness Name"
              placeholder="Mild whiplash, Physical therapy required"
              required
            />
            <FormField
              label="Witness Contract Details"
              name="Jhon Deo"
              placeholder="Jhon Deo(Driver)"
              required
            />

            {/* Description Textarea */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statement
              </label>
              <Textarea
                name="statement description"
                value={incidentData.description}
                onChange={handleChange}
                rows={4}
                placeholder="I saw the car in front stop suddenly, and the claimant's vehicle had no time to react"
              />
            </div>
          </div>
        </div>
        {/*Police or Emergency Service Report */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Police or Emergency Services Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Police Report Number"
              name="Report Number"
              type="tel"
              placeholder="SPR-342463"
              required
            />
            <FormField
              label="Law Enforcement Agency"
              name=""
              placeholder="Islamabad Traffic Police Department"
              required
            />

            <FormField
              label="Officer Name"
              name="Jhon Deo"
              placeholder="jhon Deo"
              required
            />
            <FormField
              label="Budget Number"
              name="Budget Number"
              type="tel"
              placeholder="SPR-342463"
              required
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Supporting Document</h1>
            <Button
              className="h-10 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 gap-2"
              onClick={() => {
                /* Add document logic */
              }}
            >
              <Plus className="w-4 h-4" />
              Add Document
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {docs.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {doc.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 underline"
                        onClick={() => {
                          /* Preview logic */
                        }}
                      >
                        Preview
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <DeleteIcon onClick={() => handleDelete(doc.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="outline" className="h-10 px-4 py-2">
            Clear
          </Button>
          <Button
            type="submit"
            className="h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
