import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EditOrganizerModalProps {
  organizer: any
  onClose: () => void
  onSave: (userId:string, updatedOrganizer: any) => void
}

export const EditOrganizerModal: React.FC<EditOrganizerModalProps> = ({ organizer, onClose, onSave }) => {
  const [editedOrganizer, setEditedOrganizer] = useState([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedOrganizer((prev : any) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1c1c24] border-[#2e2e3a] text-white">
        <DialogHeader>
          <DialogTitle>Edit Organizer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              name="name"
              defaultValue={organizer.name}
              onChange={handleInputChange}
              className="col-span-3 bg-[#13131a] border-[#2e2e3a] text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <Input
              id="email"
              name="email"
              defaultValue={organizer.email}
              onChange={handleInputChange}
              className="col-span-3 bg-[#13131a] border-[#2e2e3a] text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <Input
              id="username"
              name="username"
              defaultValue={organizer.username}
              onChange={handleInputChange}
              className="col-span-3 bg-[#13131a] border-[#2e2e3a] text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-[#1c1c24] text-white border-[#2e2e3a] hover:bg-[#24242c]"
          >
            Cancel
          </Button>
          <Button onClick={() => onSave(organizer.id , editedOrganizer)} className="bg-[#3fb1a7] text-white hover:bg-[#3fb1a7]/90">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

