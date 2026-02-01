import { Link } from "@tanstack/react-router"
import { Target } from "lucide-react"

// Simple logo component for the navbar
export const Logo = ({ href = '/', className }: { href?: string, className?: string }) => {
  return (
    <Link to={href} className={`flex items-center gap-2 ${className}`}>
      <Target className="w-8 h-8 text-blue-600" />
      <span className="font-semibold text-xl">Coderina</span>
    </Link>
  )
}
