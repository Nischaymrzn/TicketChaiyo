import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useGetMe, useLogout } from "@/hooks/useAuth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useUpdateUser } from "@/hooks/useUser"


export const SettingsPage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const data = useGetMe()
  const userData = data?.data?.userData

    const updateUser = useUpdateUser()

  const handlePasswordChange = async () => {
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    await updateUser.mutateAsync({userId : userData.id, userData : {"password" : newPassword}})
    setError("")
    setNewPassword("")
    setConfirmPassword("")
    setIsDialogOpen(false)
  }

  const { logout } = useLogout();
  const handleLogout = () =>{
    logout()
  }

  return (
    <div className="text-gray-300 w-full flex flex-col gap-14">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold">Settings</p>
          <p className="text-sm md:text-base px-1">Monitor all your profile details here</p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>              
            <Avatar>
              <AvatarFallback className="text-black">{userData.name.split("")[0]}</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 text-[15px]" onClick={handleLogout}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" x2="9" y1="12" y2="12"/>
                  </svg>
                </span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="w-full max-w-2xl bg-[#1c1c24] border border-[#2a2a35] rounded-lg overflow-hidden py-1 pb-3">

        <CardContent className="p-6 space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-400 mb-1 block">
                  Name
                </Label>
                <Input
                  id="name"
                  value={userData.name}
                  readOnly
                  className="bg-[#13131a] border-[#2a2a35] text-white hover:border-[#3a3a45] transition-colors"
                />
              </div>
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-400 mb-1 block">
                  Username
                </Label>
                <Input
                  id="username"
                  value={userData.username}
                  readOnly
                  className="bg-[#13131a] border-[#2a2a35] text-white hover:border-[#3a3a45] transition-colors"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-400 mb-1 block">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userData.email}
                  readOnly
                  className="bg-[#13131a] border-[#2a2a35] text-white hover:border-[#3a3a45] transition-colors"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-[#2a2a35]" />

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200">Security</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-[#FFC987] hover:bg-[#FFD7A8] text-black font-medium transition-colors">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1c1c24] text-white border-[#2a2a35]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Change Password</DialogTitle>
                  <DialogDescription className="text-gray-400">Enter your new password below.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-400">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-[#13131a] border-[#2a2a35] text-white hover:border-[#3a3a45] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-400">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-[#13131a] border-[#2a2a35] text-white hover:border-[#3a3a45] transition-colors"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <DialogFooter>
                  <Button
                    onClick={handlePasswordChange}
                    className="bg-[#FFC987] hover:bg-[#FFD7A8] text-black font-medium transition-colors"
                  >
                    Update Password
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

