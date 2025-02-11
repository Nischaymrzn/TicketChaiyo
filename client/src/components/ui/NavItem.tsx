import type React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href: string
}

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <button
      onClick={() => navigate(href)}
      className={cn(
        "flex w-full items-center gap-3 rounded-md p-3 text-sm md:text-base font-medium transition-colors",
        isActive ? "bg-gray-800 text-gray-100 hover:bg-gray-700" : "text-gray-400 hover:bg-gray-800 hover:text-white",
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  )
}

