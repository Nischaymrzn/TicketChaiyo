"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EditUserModalProps {
  user: any
  onClose: () => void
  onSave: (userId : string, updatedUser: any) => void
}

export const EditUserModal = ({ user, onClose, onSave } : EditUserModalProps) => {
  const [editedUser, setEditedUser] = useState([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedUser((prev : any) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1c1c24] border-[#2e2e3a] text-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name}
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
              defaultValue={user.email}
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
              defaultValue={user.username}
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
          <Button onClick={() => onSave(user.id,editedUser)} className="bg-[#3fb1a7] text-white hover:bg-[#3fb1a7]/90">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

