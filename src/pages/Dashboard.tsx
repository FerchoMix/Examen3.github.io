// src/pages/Dashboard.tsx
import React from 'react'
import { Card, Skeleton, ErrorText } from '@/components/Card'
import { Api } from '@/services/apis'
import type {
  Advice, Bored, CatFact, Country, DogImage, FxLatest,
  OpenMeteoCurrent, Pokemon, Quote, SpaceXLaunch
} from '@/models/apiModels'
import { useUiStore } from '@/store/useUiStore'

function useApi<T>(fn: (signal?: AbortSignal) => Promise<T>) {
  const [state, set] = React.useState<{ loading: boolean; error?: string; data?: T }>({ loading: true })
  React.useEffect(() => {
    const ctl = new AbortController()
    fn(ctl.signal)
      .then((data) => set({ loading: false, data }))
      .catch((e) => set({ loading: false, error: String(e) }))
    return () => ctl.abort()
  }, [fn])
  return state
}

export default function Dashboard() {
  const layout = useUiStore((s) => s.layout)
    
  const cat = useApi<CatFact>(Api.catFact)
  const dog = useApi<DogImage>(Api.dogImage)
  const advice = useApi<Advice>(Api.advice)
  const bored = useApi<Bored>(Api.bored)
  const quote = useApi<Quote>(Api.quote)
  const meteo = useApi<OpenMeteoCurrent>(Api.weatherPotosi)
  const pokemon = useApi<Pokemon>(Api.pokemonDitto)
  const spacex = useApi<SpaceXLaunch>(Api.spacexLatest)
  const country = useApi<Country[]>(Api.countryBO)
  const fx = useApi<FxLatest>(Api.fxUsd)

  const grid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <Card title="Gato — dato curioso" subtitle="catfact.ninja">
        {cat.loading ? <Skeleton /> : cat.error ? <ErrorText msg={cat.error} /> : <p>{cat.data!.fact}</p>}
      </Card>

      <Card title="Perro — imagen aleatoria" subtitle="dog.ceo">
        {dog.loading ? (
          <Skeleton />
        ) : dog.error ? (
          <ErrorText msg={dog.error} />
        ) : (
          <img src={dog.data!.message} alt="Dog" className="w-full h-52 object-cover rounded-xl border" />
        )}
      </Card>

      <Card title="Consejo del día" subtitle="adviceslip.com">
        {advice.loading ? <Skeleton /> : advice.error ? <ErrorText msg={advice.error} /> : <p className="italic">“{advice.data!.slip.advice}”</p>}
      </Card>

      <Card title="¿Aburrido? actividad" subtitle="boredapi.com">
        {bored.loading ? (
          <Skeleton />
        ) : bored.error ? (
          <ErrorText msg={bored.error} />
        ) : (
          <div>
            <p className="font-medium">{bored.data!.activity}</p>
            <p className="kpi mt-1">
              Tipo: {bored.data!.type} · Participantes: {bored.data!.participants} · Precio: {bored.data!.price}
            </p>
          </div>
        )}
      </Card>

      <Card title="Frase aleatoria" subtitle="api.quotable.io">
        {quote.loading ? (
          <Skeleton />
        ) : quote.error ? (
          <ErrorText msg={quote.error} />
        ) : (
          <blockquote>
            <p>“{quote.data!.content}”</p>
            <footer className="kpi mt-2">— {quote.data!.author}</footer>
          </blockquote>
        )}
      </Card>

      <Card title="Clima actual — Potosí" subtitle="open-meteo.com">
        {meteo.loading ? <Skeleton /> : meteo.error ? <ErrorText msg={meteo.error} /> : <p className="text-2xl font-semibold">{meteo.data!.current.temperature_2m}°C</p>}
      </Card>

      <Card title="Pokémon — Ditto" subtitle="pokeapi.co">
        {pokemon.loading ? (
          <Skeleton />
        ) : pokemon.error ? (
          <ErrorText msg={pokemon.error} />
        ) : (
          <div className="flex items-center gap-4">
            {pokemon.data!.sprites.front_default && (
              <img src={pokemon.data!.sprites.front_default} alt="ditto" className="w-16 h-16" />
            )}
            <div className="kpi">#{pokemon.data!.id} · {pokemon.data!.name.toUpperCase()}</div>
          </div>
        )}
      </Card>

      <Card title="SpaceX — último lanzamiento" subtitle="spacexdata.com">
        {spacex.loading ? (
          <Skeleton />
        ) : spacex.error ? (
          <ErrorText msg={spacex.error} />
        ) : (
          <div>
            <div className="font-medium">{spacex.data!.name}</div>
            <div className="kpi">{new Date(spacex.data!.date_utc).toLocaleString()}</div>
            {spacex.data!.details && <p className="mt-2 text-sm">{spacex.data!.details}</p>}
          </div>
        )}
      </Card>

      <Card title="Bolivia — país" subtitle="restcountries.com">
        {country.loading ? (
          <Skeleton />
        ) : country.error ? (
          <ErrorText msg={country.error} />
        ) : (
          <div className="flex items-center gap-3">
            <img src={country.data![0].flags.png} alt="BO flag" className="w-10 h-7 rounded border" />
            <div className="text-sm">
              <div className="font-medium">{country.data![0].name.common} ({country.data![0].cca2})</div>
              <div className="kpi">Región: {country.data![0].region} · Población: {country.data![0].population.toLocaleString()}</div>
            </div>
          </div>
        )}
      </Card>

      <Card title="Tipo de cambio USD → BOB/EUR" subtitle="exchangerate.host">
        {fx.loading ? (
          <Skeleton />
        ) : fx.error ? (
          <ErrorText msg={fx.error} />
        ) : (
          <div className="flex gap-4">
            <span className="badge">BOB: {fx.data!.rates['BOB']?.toFixed(4)}</span>
            <span className="badge">EUR: {fx.data!.rates['EUR']?.toFixed(4)}</span>
          </div>
        )}
      </Card>
       
    </div>
    
  )

  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <KPI label="Temp Potosí (°C)" value={meteo.data?.current.temperature_2m} loading={meteo.loading} />
      <KPI label="Población Bolivia" value={country.data?.[0].population} loading={country.loading} />
      <KPI label="USD→BOB" value={fx.data?.rates['BOB']} loading={fx.loading} />
      <KPI label="Pokémon ID" value={pokemon.data?.id} loading={pokemon.loading} />
      <KPI label="Precio actividad" value={bored.data?.price} loading={bored.loading} />
      <KPI label="Advice ID" value={advice.data?.slip.id} loading={advice.loading} />
    </div>
  )
return <div>Este es el Dashboard</div>
  return layout === 'kpis' ? kpis : grid
  
}

// helper local
function KPI({ label, value, loading }: { label: string; value: number | undefined; loading: boolean }) {
  return (
    <div className="card">
      <div className="kpi">{label}</div>
      <div className="mt-2 text-2xl font-semibold">
        {loading ? '—' : typeof value === 'number' ? value.toLocaleString() : '—'}
      </div>
    </div>
  )
}
