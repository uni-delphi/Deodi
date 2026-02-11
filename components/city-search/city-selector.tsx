"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Loader2, MapPin, Check } from "lucide-react"
import { useDebounce } from "@/lib/hooks/user/useDebounce"

interface City {
  value: string // Ahora será "Nombre (nid)"
  label: string
  nid: string
  provincia_id?: string
}

interface CitySelectorProps {
  value?: string
  onValueChange?: (value: string) => void
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  error?: string
  minSearchLength?: number
  debounceMs?: number
  provinciaId?: string
}

export function CitySelector({
  value,
  onValueChange,
  label = "Ciudad",
  placeholder = "Selecciona una ciudad",
  searchPlaceholder = "Escribe para buscar una ciudad...",
  error,
  minSearchLength = 2,
  debounceMs = 300,
  provinciaId,
}: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs)

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      if (debouncedSearchQuery.length < minSearchLength) {
        setCities([])
        return
      }

      setIsLoading(true)
      setFetchError(null)

      try {
        const params = new URLSearchParams()
        params.append('title', debouncedSearchQuery)
        if (provinciaId) {
          params.append('provincia_id', provinciaId)
        }

        const response = await fetch(`/api/localities?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Error al buscar localidades')
        }

        const xmlText = await response.text()
        
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        
        const parserError = xmlDoc.querySelector('parsererror')
        if (parserError) {
          throw new Error('Error al parsear la respuesta XML')
        }

        const localidadNodes = xmlDoc.querySelectorAll('localidad')
        const fetchedCities: City[] = Array.from(localidadNodes).map((node) => {
          const nid = node.querySelector('nid')?.textContent?.trim() || ''
          const nombre = node.querySelector('nombre')?.textContent?.trim() || ''
          const provincia = node.querySelector('provincia-id')?.textContent?.trim() || ''
          
          // ✅ Formato: "Nombre (nid)"
          const formattedValue = `${nombre} (${nid})`
          
          return {
            value: formattedValue,
            label: nombre,
            nid: nid,
            provincia_id: provincia,
          }
        })

        setCities(fetchedCities)
      } catch (err) {
        console.error('Error fetching cities:', err)
        setFetchError(err instanceof Error ? err.message : 'Error desconocido')
        setCities([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [debouncedSearchQuery, minSearchLength, provinciaId])

  const handleCitySelect = (cityValue: string) => {
    onValueChange?.(cityValue)
  }

  const hasSearched = debouncedSearchQuery.length >= minSearchLength
  const hasResults = cities.length > 0

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="city-search" className="text-foreground">
          {label}
        </Label>
      )}
      
      <div className="space-y-3">
        <div className="relative">
          {isLoading ? (
            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          <Input
            id="city-search"
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {hasSearched && !isLoading && (
          <div className="space-y-2">
            {fetchError ? (
              <p className="text-sm text-destructive py-2">
                {fetchError}
              </p>
            ) : hasResults ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {cities.length} localidad{cities.length !== 1 ? "es" : ""} encontrada{cities.length !== 1 ? "s" : ""}
                </p>
                <div className="border rounded-md bg-popover shadow-md max-h-60 overflow-y-auto">
                  {cities.map((city) => {
                    const isSelected = !!(value && value.trim() !== "" && value === city.value)
                    
                    return (
                      <button
                        key={city.value}
                        type="button"
                        onClick={() => handleCitySelect(city.value)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isSelected ? "bg-accent" : ""
                        }`}
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium">{city.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({city.nid})
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                No se encontraron localidades con "{searchQuery}"
              </p>
            )}
          </div>
        )}
        
        {!hasSearched && searchQuery.length > 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">
            Escribe al menos {minSearchLength} caracteres para buscar
          </p>
        )}
        
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Buscando localidades...
          </p>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}