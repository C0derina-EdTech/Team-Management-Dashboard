import { Target } from "lucide-react"

// Simple logo component for the navbar
export const Logo = ({ href = '/', className }: { href?: string, className?: string }) => {
  return (
    <a href={href} className={`flex items-center gap-2 ${className}`}>
      <img src="https://i.postimg.cc/yNYKqSvS/Coderina-Logo-FULL-Transparent-1-removebg-preview.png" alt="Logo" className="w-fit h-12 object-cover" />
      {/* <span className="font-semibold text-xl">Coderina</span> */}
    </a>
  )
}
