"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Loader2, MapPin, Check } from "lucide-react"
import { useDebounce } from "@/lib/hooks/user/useDebounce"


const ALL_CITIES = [
  { value: "madrid", label: "Madrid", country: "España" },
  { value: "barcelona", label: "Barcelona", country: "España" },
  { value: "valencia", label: "Valencia", country: "España" },
  { value: "sevilla", label: "Sevilla", country: "España" },
  { value: "bilbao", label: "Bilbao", country: "España" },
  { value: "mexico-city", label: "Ciudad de México", country: "México" },
  { value: "guadalajara", label: "Guadalajara", country: "México" },
  { value: "monterrey", label: "Monterrey", country: "México" },
  { value: "buenos-aires", label: "Buenos Aires", country: "Argentina" },
  { value: "cordoba-ar", label: "Córdoba", country: "Argentina" },
  { value: "bogota", label: "Bogotá", country: "Colombia" },
  { value: "medellin", label: "Medellín", country: "Colombia" },
  { value: "lima", label: "Lima", country: "Perú" },
  { value: "santiago", label: "Santiago", country: "Chile" },
  { value: "cordoba-es", label: "Córdoba", country: "España" },
  { value: "santiago-mx", label: "Santiago de Querétaro", country: "México" },
  { value: "rosario", label: "Rosario", country: "Argentina" },
  { value: "cali", label: "Cali", country: "Colombia" },
  { value: "arequipa", label: "Arequipa", country: "Perú" },
  { value: "valparaiso", label: "Valparaíso", country: "Chile" },
]

interface CitySelectorProps {
  value?: string
  onValueChange?: (value: string) => void
  cities?: { value: string; label: string; country?: string }[]
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  error?: string
  minSearchLength?: number
  debounceMs?: number
}

export function CitySelector({
  value,
  onValueChange,
  cities = ALL_CITIES,
  label = "Ciudad",
  placeholder = "Selecciona una ciudad",
  searchPlaceholder = "Escribe para buscar una ciudad...",
  error,
  minSearchLength = 2,
  debounceMs = 300,
}: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs)
  const isSearching = searchQuery !== debouncedSearchQuery

  const filteredCities = useMemo(() => {
    if (!debouncedSearchQuery.trim() || debouncedSearchQuery.length < minSearchLength) return []
    const query = debouncedSearchQuery.toLowerCase()
    return cities.filter(
      (city) =>
        city.label.toLowerCase().includes(query) ||
        city.country?.toLowerCase().includes(query)
    )
  }, [cities, debouncedSearchQuery, minSearchLength])

  const hasSearched = debouncedSearchQuery.length >= minSearchLength
  const hasResults = filteredCities.length > 0

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="city-search" className="text-foreground">
          {label}
        </Label>
      )}
      <div className="space-y-3">
        <div className="relative">
          {isSearching ? (
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
        
        {hasSearched && (
          <div className="space-y-2">
            {hasResults ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {filteredCities.length} ciudad{filteredCities.length !== 1 ? "es" : ""} encontrada{filteredCities.length !== 1 ? "s" : ""}
                </p>
                <div className="border rounded-md bg-popover shadow-md max-h-60 overflow-y-auto">
                  {filteredCities.map((city) => {
                    const isSelected = value === city.value
                    return (
                      <button
                        key={city.value}
                        type="button"
                        onClick={() => onValueChange?.(city.value)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isSelected ? "bg-accent" : ""
                        }`}
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium">{city.label}</span>
                          {city.country && (
                            <span className="text-muted-foreground ml-1.5">
                              {city.country}
                            </span>
                          )}
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
                No se encontraron ciudades con "{searchQuery}"
              </p>
            )}
          </div>
        )}
        
        {!hasSearched && searchQuery.length > 0 && !isSearching && (
          <p className="text-sm text-muted-foreground">
            Escribe al menos {minSearchLength} caracteres para buscar
          </p>
        )}
        
        {isSearching && searchQuery.length >= minSearchLength && (
          <p className="text-sm text-muted-foreground">
            Buscando...
          </p>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
