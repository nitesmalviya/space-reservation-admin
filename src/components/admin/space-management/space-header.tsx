import { Plus } from "lucide-react"

const SpaceHeader = ({ setIsModalOpen }: { setIsModalOpen: (value: boolean) => void }) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div>
                <h1 className="text-gray-900 mb-1">Space Management</h1>
                <p className="text-gray-600 text-sm">
                    Manage your organization's workspaces and facilities
                </p>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
                <Plus className="w-5 h-5" />
                Add New Space
            </button>
        </div>
    )
}

export default SpaceHeader