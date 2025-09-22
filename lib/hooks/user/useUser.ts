import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/lib/services/user/user.services"

export function useUsers({ name, email }: { name: string; email: string }) {
  return useQuery({
    queryKey: ["users", { name, email }],
    queryFn: () => getUser({ name, email }),
  })
}
