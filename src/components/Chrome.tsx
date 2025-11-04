import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutGrid, List, Gauge, Sun, Moon, BookOpenText, Globe2, Building2, Users } from 'lucide-react'
import { useUiStore, Layout as LayoutType } from '@/store/useUiStore'
import { initTheme, toggleTheme } from '@/utils/theme'
import clsx from 'clsx'

// inicializa tema al cargar el módulo
initTheme()

export function Shell({ children }: { children: React.ReactNode }) {
  const layout = useUiStore((s) => s.layout)
  const setLayout = useUiStore((s) => s.setLayout)

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr]">
        <Sidebar />
        <main className="container py-6">
          <div className="flex items-center justify-between mb-5">
            <h1 className="h1">API Hub</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLayout('grid')}
                className={clsx('btn-ghost', layout === 'grid' && 'bg-gray-100 dark:bg-gray-800')}
              >
                <LayoutGrid size={16} /> Tarjetas
              </button>
              <button
                onClick={() => setLayout('list')}
                className={clsx('btn-ghost', layout === 'list' && 'bg-gray-100 dark:bg-gray-800')}
              >
                <List size={16} /> Lista
              </button>
              <button
                onClick={() => setLayout('kpis')}
                className={clsx('btn-ghost', layout === 'kpis' && 'bg-gray-100 dark:bg-gray-800')}
              >
                <Gauge size={16} /> KPIs
              </button>
              <button onClick={toggleTheme} className="btn-ghost" aria-label="Alternar tema">
                <Sun size={16} className="hidden dark:block" />
                <Moon size={16} className="block dark:hidden" />
              </button>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="font-bold">
          ⚡ API Hub <span className="text-brand-600">React + TS</span>
        </Link>
        <nav className="hidden sm:flex gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'text-brand-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/explorar"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'text-brand-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
            }
          >
            Explorar
          </NavLink>
          <NavLink
            to="/pais"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'text-brand-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
            }
          >
            País
          </NavLink>
          <NavLink
            to="/universidades"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'text-brand-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
            }
          >
            Universidades
          </NavLink>
          <NavLink
            to="/galeria"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'text-brand-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
            }
          >
            Galería
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="hidden lg:block border-r border-gray-200 dark:border-gray-700 p-4 sticky top-[57px] h-[calc(100dvh-57px)] overflow-y-auto">
      <ul className="space-y-1 text-sm">
        <li>
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )
            }
          >
            <Gauge size={16} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/explorar"
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )
            }
          >
            <BookOpenText size={16} /> Explorar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pais"
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )
            }
          >
            <Globe2 size={16} /> País
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/universidades"
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )
            }
          >
            <Building2 size={16} /> Universidades
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/galeria"
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )
            }
          >
            <Users size={16} /> Galería
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
