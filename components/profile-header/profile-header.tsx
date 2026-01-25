"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { useRef, useState } from "react";

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
  const [formData, setFormData] = useState<ProfileHeaderProps>({
    name,
    lastName,
    description,
    avatarUrl,
  });
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    //onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ name, lastName, description, avatarUrl });
    setPreviewUrl(avatarUrl);
    setIsEditing(false);
  };

  const getInitials = () => {
    const first = formData.name?.[0] || "";
    const last = formData.lastName?.[0] || "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="lg:mb-8 grid grid-cols-12">
      <div className="col-span-12 sm:col-span-3 lg:col-span-12 mb-6 ">
        {/*<Avatar className="w-32 h-32 mb-4">
          <AvatarImage
            src={avatarUrl || "/placeholder.svg"}
            alt={`${name} ${lastName}`}
          />
          <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>*/}
        <div className="relative aspect-square w-32">
          <Avatar className="size-32 border-4 border-0">
            <AvatarImage
              src={previewUrl || "/placeholder.svg"}
              alt="Avatar del usuario"
            />
            <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
              {getInitials() || <User className="size-12" />}
            </AvatarFallback>
          </Avatar>
          {(
            <div className="absolute -bottom-4 -right-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                aria-label="Seleccionar imagen de perfil"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-lg bg-white text-primary-foreground shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Cambiar imagen de perfil"
              >
                <Camera className="size-4 fill-white text-purpleDeodi" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 sm:col-span-9 lg:col-span-12">
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
