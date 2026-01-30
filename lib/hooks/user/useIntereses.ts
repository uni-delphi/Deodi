import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useIntereses() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["json-intereses"],
    queryFn: async () => {
      const res = await fetch("/api/json-intereses");
      if (!res.ok) throw new Error("Error al obtener los intereses del usuario");
      return res.json();
    },
    staleTime: Infinity, // 🔒 nunca se marca como "stale" automáticamente
    refetchOnMount: false, // 🚫 no refetchea al volver a montar
    refetchOnWindowFocus: false, // 🚫 no refetchea al volver a la pestaña
    refetchOnReconnect: false, // 🚫 no refetchea al reconectar
  });

  // 👇 función manual para actualizar cuando quieras
  const refreshIntereses = () => {
    queryClient.invalidateQueries({ queryKey: ["json-intereses"] });
  };

  return { ...query, refreshIntereses };
}
