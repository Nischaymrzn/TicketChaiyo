import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useUpdateUser } from "@/hooks/useUser"
import { useGetMe } from "@/hooks/useAuth"

export default function Setting() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
    const data = useGetMe()
    const userData = data?.data?.userData

    const updateUser = useUpdateUser()
  
    const handlePasswordChange = async (event : React.FormEvent) => {
        event.preventDefault() 
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters long")
      }else if (newPassword !== confirmPassword) {
        setError("Passwords do not match")
      }else{        
        await updateUser.mutateAsync({userId : userData.id, userData : {"password" : newPassword}})
        setError("")
        setNewPassword("")
        setConfirmPassword("")
      }
    }

  return (
    <div className="p-6 max-w-xl border border-gray-800 rounded-md mt-8 bg-[#1c1c24]">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">Password</h3>
        <p className="text-gray-400 text-sm">Please enter your new password to change your password.</p>
      </div>

      <form className="space-y-6">
       
        <div className="space-y-2">
          <label className="text-sm text-gray-200">New Password</label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              className="bg-[#1C1C24] border-gray-800 text-white pr-10"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-200">Confirm New Password</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              className="bg-[#1C1C24] border-gray-800 text-white pr-10"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-sm text-red-400">{error}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button className="bg-[#FFC987] hover:bg-[#FFD7A8] text-black font-medium transition-colors w-full"
            onClick={handlePasswordChange}
            disabled={!newPassword || !confirmPassword}>
                Update Password
          </Button>
        </div>
      </form>
    </div>
  )
}

