import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { useAddOrganizer } from "@/hooks/useOrganizer"

export function AddOrganizerModal() {
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const addOrganizerMutation = useAddOrganizer()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addOrganizerMutation.mutate({ fullName, userName, email, password })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFC987] text-black hover:bg-[#f5d0a2] mt-4 w-36">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Organizer
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1c1c24] text-white border-[#2e2e3a]">
        <DialogHeader>
          <DialogTitle>Add New Organizer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-[#24242c] border-[#2e2e3a] text-white"
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-[#24242c] border-[#2e2e3a] text-white"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#24242c] border-[#2e2e3a] text-white"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#24242c] border-[#2e2e3a] text-white"
            />
          </div>
          <Button type="submit" className="bg-[#FFC987] text-black hover:bg-[#f5d0a2]">
            Add Organizer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
