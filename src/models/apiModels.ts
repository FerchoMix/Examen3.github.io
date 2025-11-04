// src/models/apiModels.ts
import { z } from 'zod'

// 1) Cat Fact
export const CatFactSchema = z.object({ fact: z.string(), length: z.number() })
export type CatFact = z.infer<typeof CatFactSchema>

// 2) Dog Image
export const DogImageSchema = z.object({ message: z.string().url(), status: z.string() })
export type DogImage = z.infer<typeof DogImageSchema>

// 3) Advice
export const AdviceSchema = z.object({ slip: z.object({ id: z.number(), advice: z.string() }) })
export type Advice = z.infer<typeof AdviceSchema>

// 4) Bored Activity
export const BoredSchema = z.object({
  activity: z.string(),
  type: z.string(),
  participants: z.number(),
  price: z.number()
})
export type Bored = z.infer<typeof BoredSchema>

// 5) Quote (Quotable)
export const QuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string())
})
export type Quote = z.infer<typeof QuoteSchema>

// 6) Open Meteo (simplificado)
export const OpenMeteoSchema = z.object({
  current: z.object({ time: z.string(), temperature_2m: z.number() })
})
export type OpenMeteoCurrent = z.infer<typeof OpenMeteoSchema>

// 7) PokeAPI (simplificado)
export const PokemonSchema = z.object({
  name: z.string(),
  id: z.number(),
  sprites: z.object({ front_default: z.string().url().nullable() })
})
export type Pokemon = z.infer<typeof PokemonSchema>

// 8) SpaceX Latest Launch (simplificado)
export const SpaceXLaunchSchema = z.object({
  name: z.string(),
  date_utc: z.string(),
  details: z.string().nullable()
})
export type SpaceXLaunch = z.infer<typeof SpaceXLaunchSchema>

// 9) RestCountries (Bolivia simplificado)
export const CountrySchema = z.object({
  name: z.object({ common: z.string() }),
  cca2: z.string(),
  capital: z.array(z.string()).optional(),
  region: z.string(),
  flags: z.object({ png: z.string().url(), svg: z.string().url() }),
  population: z.number()
})
export type Country = z.infer<typeof CountrySchema>

// 10) Exchange rates (exchangerate.host)
export const FxLatestSchema = z.object({
  base: z.string(),
  date: z.string(),
  rates: z.record(z.number())
})
export type FxLatest = z.infer<typeof FxLatestSchema>

// 11) OpenLibrary (para Explorar.tsx)
export const OpenLibrarySchema = z.object({
  numFound: z.number(),
  docs: z.array(z.object({
    key: z.string(),
    title: z.string(),
    author_name: z.array(z.string()).optional()
  }))
})
export type OpenLibrary = z.infer<typeof OpenLibrarySchema>

// 12) Universities Hipolabs (para Universidades.tsx)
export const UniSchema = z.array(z.object({
  name: z.string(),
  country: z.string(),
  web_pages: z.array(z.string())
}))
export type Universities = z.infer<typeof UniSchema>

// 13) RandomUser (para Galeria.tsx, si la usas)
export const RandomUserSchema = z.object({
  results: z.array(z.object({
    login: z.object({ uuid: z.string() }),
    name: z.object({ first: z.string(), last: z.string() }),
    picture: z.object({ large: z.string().url() })
  }))
})
export type RandomUsers = z.infer<typeof RandomUserSchema>
