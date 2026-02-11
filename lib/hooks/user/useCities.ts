import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCities() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["json-cities"],
    queryFn: async () => {
      const res = await fetch("/api/json-cities");
      if (!res.ok) throw new Error("Error al obtener los cities del usuario");
      return res.json();
    },
    staleTime: Infinity, // 🔒 nunca se marca como "stale" automáticamente
    refetchOnMount: false, // 🚫 no refetchea al volver a montar
    refetchOnWindowFocus: false, // 🚫 no refetchea al volver a la pestaña
    refetchOnReconnect: false, // 🚫 no refetchea al reconectar
  });

  // 👇 función manual para actualizar cuando quieras
  const refreshCities = () => {
    queryClient.invalidateQueries({ queryKey: ["json-cities"] });
  };

  return { ...query, refreshCities };
}
