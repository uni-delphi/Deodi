import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileHeaderProps {
  name: string
  lastName: string
  description: string
  avatarUrl?: string
}

export function ProfileHeader({ name, lastName, description, avatarUrl }: ProfileHeaderProps) {
  const initials = `${name.charAt(0)}${lastName.charAt(0)}`

  return (
    <div className="text-center mb-8">
      <div className="mb-6">
        <Avatar className="w-32 h-32 mx-auto mb-4 overflow-hidden">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={`${name} ${lastName}`} />
          <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">{initials}</AvatarFallback>
        </Avatar>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
        {name} {lastName}
      </h1>

      <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">{description}</p>
    </div>
  )
}
