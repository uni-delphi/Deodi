import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  name: string;
  lastName: string;
  description: string;
  avatarUrl?: string;
}

export function ProfileHeader({
  name,
  lastName,
  description,
  avatarUrl,
}: ProfileHeaderProps) {
  const initials = `${name.charAt(0)}${lastName.charAt(0)}`;

  return (
    <div className="lg:mb-8 grid grid-cols-12">
      <div className="col-span-3 lg:col-span-12 mb-6 ">
        <Avatar className="w-32 h-32 mb-4">
          <AvatarImage
            src={avatarUrl || "/placeholder.svg"}
            alt={`${name} ${lastName}`}
          />
          <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="col-span-9 lg:col-span-12">
        <h2 className="text-3xl font-semibold text-purpleDeodi mb-2 text-pretty">
          {name} {lastName}
        </h2>

        <p className="text-muted-foreground max-w-md text-pretty leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
