"use client";

import { useState, useEffect } from "react";

const tabs = ["about", "projects"] as const;
type Tab = (typeof tabs)[number];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "true" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Mobile header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-[var(--border)] transition-colors duration-300">
        <div>
          <h1 className="text-sm font-medium lowercase">fidoeth</h1>
        </div>
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:opacity-70 transition-all duration-200 active:scale-90"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 -mr-2 hover:opacity-70 transition-all duration-200 active:scale-90"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200"
              style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="lg:hidden border-b border-[var(--border)] bg-[var(--background)] animate-slide-down transition-colors duration-300">
          <div className="flex flex-col py-4 px-6 gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-left py-2 text-sm lowercase transition-all duration-200 hover:translate-x-1 stagger-${i + 1} animate-fade-in opacity-0 ${
                  activeTab === tab
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {activeTab === tab && "→ "}{tab}
              </button>
            ))}
            <div className="h-px bg-[var(--border)] my-3 transition-colors duration-300" />
            <span className="text-xs tracking-widest text-[var(--muted)] py-2 transition-colors duration-300">contact</span>
            <a href="https://x.com/fidoeth" target="_blank" rel="noopener" className="py-2 text-sm hover:translate-x-1 transition-transform duration-200">
              x/twitter
            </a>
            <a href="https://farcaster.xyz/fido" target="_blank" rel="noopener" className="py-2 text-sm hover:translate-x-1 transition-transform duration-200">
              farcaster
            </a>
          </div>
        </nav>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen border-r border-[var(--border)] p-8 transition-colors duration-300">
          <div className="sticky top-8">
            <h1 className="text-sm font-medium mb-1 lowercase">fidoeth</h1>
            <p className="text-sm text-[var(--muted)] mb-8 transition-colors duration-300">growth & product</p>

            <nav className="flex flex-col gap-1 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left py-1 text-sm lowercase transition-all duration-200 hover:translate-x-1 ${
                    activeTab === tab
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className={`inline-block transition-all duration-200 ${activeTab === tab ? "opacity-100 mr-1" : "opacity-0 w-0"}`}>→</span>
                  {tab}
                </button>
              ))}
            </nav>

            <div className="h-px bg-[var(--border)] mb-6 transition-colors duration-300" />

            <h3 className="text-xs tracking-widest text-[var(--muted)] mb-3 transition-colors duration-300">contact</h3>
            <div className="flex flex-col gap-1 text-sm mb-8">
              <a href="https://x.com/fidoeth" target="_blank" rel="noopener" className="py-1 lowercase hover:translate-x-1 transition-transform duration-200">
                x/twitter
              </a>
              <a href="https://farcaster.xyz/fido" target="_blank" rel="noopener" className="py-1 lowercase hover:translate-x-1 transition-transform duration-200">
                farcaster
              </a>
            </div>

            <div className="h-px bg-[var(--border)] mb-6 transition-colors duration-300" />

            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-all duration-200 hover:translate-x-1 active:scale-95"
              >
                {darkMode ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                    light mode
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    dark mode
                  </>
                )}
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-12 lg:px-16 lg:py-16 max-w-3xl">
          <div key={activeTab} className="animate-fade-in">
            {activeTab === "about" && <AboutSection />}
            {activeTab === "projects" && <ProjectsSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section>
      <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-12 lowercase">
        gtm, growth, crypto.
      </h2>

      <div className="space-y-4 text-[var(--muted)] mb-16 transition-colors duration-300 lowercase">
        <p>i try things people haven't and tell stories people remember.</p>
        <p>every product has a narrative. i find the one that lands.</p>
        <p>i've built from zero. raised capital. shipped fast. scaled audiences.</p>
        <p>if it's complex, i make it make sense.</p>
      </div>

      <div className="h-px bg-[var(--border)] mb-12 transition-colors duration-300" />

      <h3 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-6 transition-colors duration-300">skills</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="text-[var(--muted)] mb-3 transition-colors duration-300 lowercase">product & pm</p>
          <ul className="space-y-1">
            {["Jira", "Linear", "Notion", "Figma", "Spec Writing", "UX Flow Design"].map((skill, i) => (
              <li key={skill} className="hover:translate-x-1 transition-transform duration-200 cursor-default">{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[var(--muted)] mb-3 transition-colors duration-300 lowercase">crypto / web3</p>
          <ul className="space-y-1">
            {["Etherscan", "Solscan", "Dune", "AMM/LP Mgmt", "Alchemy", "Helius"].map((skill) => (
              <li key={skill} className="hover:translate-x-1 transition-transform duration-200 cursor-default">{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[var(--muted)] mb-3 transition-colors duration-300 lowercase">ai / creative</p>
          <ul className="space-y-1">
            {["OpenAI Suite", "Claude Code", "Midjourney", "Photoshop", "Illustrator", "Blender"].map((skill) => (
              <li key={skill} className="hover:translate-x-1 transition-transform duration-200 cursor-default">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const projects = [
    {
      id: "sukuri",
      title: "sukuri protocol",
      period: "feb 2023 – mar 2024",
      role: "founder / product lead",
      summary: "onchain subscriptions. 17k+ users. $500k raised.",
      details: [
        "shipped a revenue-generating mvp with early recurring revenue.",
        "selected for near horizon accelerator. raised $500k pre-seed.",
        "owned product positioning for an onchain subscription platform.",
        "translated smart accounts and account abstraction into messaging non-crypto users actually understood.",
        "designed end-to-end flows for subscription creation, settlement, and merchant onboarding.",
      ],
      tech: ["smart accounts", "account abstraction", "subscriptions"],
    },
    {
      id: "frame",
      title: "frame",
      period: "feb 2024 – jul 2024",
      role: "founder / product owner",
      summary: "first token on farcaster frames. $20m mc. 36 hours to ship.",
      details: [
        "led product and marketing for the first token distributed via farcaster frames.",
        "drove rapid adoption—$20m market cap, $3m+ aum.",
        "concept to mvp in 36 hours. optimized messaging and proprietary ux.",
        "designed creator-facing distribution using uni-v3 lp positions.",
        "activated growth channels at eth denver and nft nyc.",
      ],
      tech: ["farcaster frames", "uni-v3 lp", "creator monetization"],
    },
    {
      id: "floppa",
      title: "floppa",
      period: "mar 2024 – present",
      role: "founder / product & growth lead",
      summary: "50k+ followers. hundreds of millions of impressions. $100k web2→onchain.",
      details: [
        "scaled project-owned socials to 50k+ followers.",
        "hundreds of millions of monthly impressions across owned and partner channels.",
        "enabled creator-driven capital formation—nearly $100k from web2 into the token.",
        "worked directly with creators (20m+ combined followers) on content and monetization.",
        "balanced onchain mechanics, incentives, and cultural relevance to sustain engagement.",
      ],
      tech: ["social growth", "creator economy", "token design"],
    },
  ];

  return (
    <section>
      <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-12 lowercase">
        projects
      </h2>

      <div className="space-y-6">
        {projects.map((project, i) => {
          const isExpanded = expanded === project.id;
          return (
            <div key={project.id}>
              <div
                onClick={() => setExpanded(isExpanded ? null : project.id)}
                className="cursor-pointer group"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs text-[var(--muted)] transition-colors duration-300">0{i + 1}</span>
                  <h3 className="text-xl font-medium group-hover:translate-x-1 transition-transform duration-200 lowercase">{project.title}</h3>
                  <span
                    className="ml-auto text-[var(--muted)] text-sm transition-transform duration-300"
                    style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-[var(--muted)] ml-8 transition-colors duration-300 lowercase">{project.summary}</p>
              </div>

              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: isExpanded ? "600px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div className="ml-8 mt-6 pb-2">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)] mb-4 lowercase">
                    <span>{project.role}</span>
                    <span>·</span>
                    <span>{project.period}</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {project.details.map((detail, j) => (
                      <li
                        key={j}
                        className="text-[var(--foreground)] lowercase transition-all duration-300"
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
                          transitionDelay: isExpanded ? `${j * 50}ms` : "0ms",
                        }}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs bg-[var(--border)] text-[var(--muted)] rounded lowercase transition-colors duration-300 hover:text-[var(--foreground)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {i < projects.length - 1 && <div className="h-px bg-[var(--border)] mt-6 transition-colors duration-300" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

