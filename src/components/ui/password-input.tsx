import * as React from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pl-9 pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle password visibility</span>
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
