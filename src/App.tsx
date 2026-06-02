import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { WorkspaceProvider, useWorkspace } from './contexts/WorkspaceContext'
import type { ModuleKey } from './data/moduleStats'
import { smoothScrollElement } from './utils/smoothScroll'
import { Header } from './components/layout/Header'
import { HomeSection } from './components/sections/HomeSection'
import { OverviewSection } from './components/sections/OverviewSection'
import { ScreeningSection } from './components/sections/ScreeningSection'
import { VisualizationSection } from './components/sections/VisualizationSection'
import { ExportSection } from './components/sections/ExportSection'
import { AISection } from './components/sections/AISection'
import { TeamCollabSection, type TeamCollabTab } from './components/sections/TeamCollabSection'

const SECTION_COUNT = 7
const OVERVIEW_INDEX = 1
const SCREENING_INDEX = 2
const TEAM_COLLAB_INDEX = 6
const ABOUT_TEAM_ANCHOR = 'about-team'
const ABOUT_COLLAB_ANCHOR = 'about-collab'
const ABOUT_TAB_SCROLL_OFFSET = 88

function scrollOffsetInContainer(container: HTMLElement, target: HTMLElement, offset = 0) {
  const containerTop = container.getBoundingClientRect().top
  const targetTop = target.getBoundingClientRect().top
  return container.scrollTop + (targetTop - containerTop) - offset
}

function AppContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cancelScrollRef = useRef<(() => void) | null>(null)
  const suppressTeamCollabTabSyncRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [teamCollabTab, setTeamCollabTab] = useState<TeamCollabTab>('team')
  const { setActiveModule } = useWorkspace()

  const scrollToSection = useCallback((index: number, onComplete?: () => void) => {
    const el = containerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(index, SECTION_COUNT - 1))
    const sections = el.querySelectorAll<HTMLElement>('.snap-section')
    const section = sections[clamped]
    if (!section) return

    cancelScrollRef.current?.()
    setActiveIndex(clamped)

    cancelScrollRef.current = smoothScrollElement(el, section.offsetTop, 720, () => {
      cancelScrollRef.current = null
      onComplete?.()
    })
  }, [])

  const goToModuleScreening = useCallback(
    (module: ModuleKey) => {
      setActiveModule(module)
      scrollToSection(SCREENING_INDEX)
    },
    [scrollToSection, setActiveModule],
  )

  const backToModuleOverview = useCallback(() => {
    setActiveModule(null)
    scrollToSection(OVERVIEW_INDEX)
  }, [scrollToSection, setActiveModule])

  const scrollToAboutTab = useCallback(
    (tab: TeamCollabTab) => {
      const el = containerRef.current
      if (!el) return
      const anchorId = tab === 'team' ? ABOUT_TEAM_ANCHOR : ABOUT_COLLAB_ANCHOR
      const anchor = el.querySelector<HTMLElement>(`#${anchorId}`)
      if (!anchor) return

      const top = scrollOffsetInContainer(el, anchor, ABOUT_TAB_SCROLL_OFFSET)
      cancelScrollRef.current?.()
      suppressTeamCollabTabSyncRef.current = true
      cancelScrollRef.current = smoothScrollElement(el, top, 480, () => {
        cancelScrollRef.current = null
        suppressTeamCollabTabSyncRef.current = false
      })
    },
    [],
  )

  const handleTeamCollabTabSelect = useCallback(
    (tab: TeamCollabTab) => {
      setTeamCollabTab(tab)
      if (activeIndex !== TEAM_COLLAB_INDEX) {
        scrollToSection(TEAM_COLLAB_INDEX, () => scrollToAboutTab(tab))
        return
      }
      scrollToAboutTab(tab)
    },
    [activeIndex, scrollToAboutTab, scrollToSection],
  )

  const syncTeamCollabTab = useCallback((tab: TeamCollabTab) => {
    setTeamCollabTab((prev) => (prev === tab ? prev : tab))
  }, [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const sections = root.querySelectorAll<HTMLElement>('.snap-section')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (cancelScrollRef.current) return
        let best: { idx: number; ratio: number } | null = null
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = Array.from(sections).indexOf(entry.target as HTMLElement)
          if (idx < 0) continue
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { idx, ratio: entry.intersectionRatio }
          }
        }
        if (best && best.ratio >= 0.2) {
          setActiveIndex(best.idx)
        }
      },
      { root, threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: '-12% 0px -12% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => cancelScrollRef.current?.(), [])

  return (
    <div className="h-[100dvh] overflow-hidden bg-white dark:bg-slate-950 text-navy-900 dark:text-slate-100">
      <Header activeIndex={activeIndex} onNavigate={scrollToSection} transparent={activeIndex === 0} />
      <div ref={containerRef} className="snap-container">
        <HomeSection onScrollDown={() => scrollToSection(1)} />
        <OverviewSection onGoScreening={goToModuleScreening} />
        <ScreeningSection onBackToModules={backToModuleOverview} />
        <ExportSection />
        <VisualizationSection />
        <AISection />
        <TeamCollabSection
          tab={teamCollabTab}
          onTabSelect={handleTeamCollabTabSelect}
          onTabSync={syncTeamCollabTab}
          scrollRootRef={containerRef as RefObject<HTMLElement | null>}
          suppressTabSyncRef={suppressTeamCollabTabSyncRef}
        />
      </div>
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1.5">
        {Array.from({ length: SECTION_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Section ${i + 1}`}
            onClick={() => scrollToSection(i)}
            className={`w-1.5 rounded-full transition-all ${
              activeIndex === i ? 'h-6 bg-brand-500' : 'h-1.5 bg-slate-300/80 dark:bg-slate-600 hover:bg-brand-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <AppContent />
      </WorkspaceProvider>
    </ThemeProvider>
  )
}
