import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/lib/services/user/user.services"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })
}
