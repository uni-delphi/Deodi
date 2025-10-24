import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserProfile() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch("/api/user-profile");
      if (!res.ok) throw new Error("Error al obtener el perfil del usuario");
      return res.json();
    },
    staleTime: Infinity, // 🔒 nunca se marca como "stale" automáticamente
    refetchOnMount: false, // 🚫 no refetchea al volver a montar
    refetchOnWindowFocus: false, // 🚫 no refetchea al volver a la pestaña
    refetchOnReconnect: false, // 🚫 no refetchea al reconectar
  });

  // 👇 función manual para actualizar cuando quieras
  const refreshProfile = () => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
  };

  return { ...query, refreshProfile };
}
