import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxSplit from "@/components/lx/LxSplit";
import LxContact from "@/components/lx/LxContact";
import { getSection } from "@/lib/cms";
import {
  ABOUT_HERO_DEFAULTS,
  ABOUT_STATS_DEFAULTS,
  ABOUT_STORY_DEFAULTS,
  ABOUT_TIMELINE_DEFAULTS,
  ABOUT_VALUES_DEFAULTS,
  ABOUT_FOUNDER_DEFAULTS,
  ABOUT_TEAM_DEFAULTS,
  ABOUT_PARTNERS_DEFAULTS,
} from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "about.hero",
    defaults: ABOUT_HERO_DEFAULTS,
    path: "/about",
    fallbackTitle: "About",
    fallbackDescription: "Ten years of digital marketing, relaunched for the AI era. The story of Unexus AI, an SE Digicon company, founded by Richa Gupta.",
  });
}

export default async function AboutPage() {
  const [hero, stats, story, timeline, values, founder, team, partners] = await Promise.all([
    getSection("about.hero", ABOUT_HERO_DEFAULTS),
    getSection("about.stats", ABOUT_STATS_DEFAULTS),
    getSection("about.story", ABOUT_STORY_DEFAULTS),
    getSection("about.timeline", ABOUT_TIMELINE_DEFAULTS),
    getSection("about.values", ABOUT_VALUES_DEFAULTS),
    getSection("about.founder", ABOUT_FOUNDER_DEFAULTS),
    getSection("about.team", ABOUT_TEAM_DEFAULTS),
    getSection("about.partners", ABOUT_PARTNERS_DEFAULTS),
  ]);

  return (
    <LxShell>
      <LxPageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} orbit={partners.list}>
        <span className="lx-note lx-note--pill">{hero.note}</span>
      </LxPageHero>

      {/* Stats */}
      <section className="lx-stats">
        <div className="lx-wrap lx-stats__in">
          {stats.items.map((s, i) => (
            <div key={i} data-lx-pop>
              <b data-lx-count>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="lx-sec">
        <div className="lx-wrap lx-split">
          <div className="lx-split__head" data-lx-reveal>
            <span className="lx-badge">{story.badge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={story.title} /></h2>
          </div>
          <div className="lx-story">
            {story.paragraphs.map((p, i) => (
              <p key={i} data-lx-reveal>{p}</p>
            ))}
            {story.highlight && <p className="lx-story__hi" data-lx-reveal>{story.highlight}</p>}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap lx-split">
          <div className="lx-split__head lx-sticky" data-lx-reveal>
            <span className="lx-badge">{timeline.badge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={timeline.title} /></h2>
          </div>
          <ol className="lx-tl">
            {timeline.items.map((t, i) => (
              <li key={i} data-lx-reveal>
                <small>{t.year}</small>
                <h3 className="lx-h3">{t.title}</h3>
                <p>{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="lx-sec">
        <div className="lx-wrap">
          <div className="lx-head" data-lx-reveal>
            <span className="lx-badge">{values.badge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={values.title} /></h2>
          </div>
          <div className="lx-grid lx-grid--2">
            {values.items.map((v, i) => (
              <div key={i} className={`lx-card lx-spot${i === 0 ? " lx-card--ink" : ""}`} data-lx-card>
                <span className="lx-card__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="lx-h3">{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder + team */}
      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          <div className="lx-head" data-lx-reveal>
            <span className="lx-badge">{founder.badge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={founder.title} /></h2>
          </div>
          <div className="lx-founder" data-lx-card>
            <div className="lx-founder__ava" aria-hidden="true">{founder.initials}</div>
            <div>
              <div className="lx-founder__name">{founder.name}</div>
              <div className="lx-founder__role">{founder.role}</div>
              <p>{founder.bio}</p>
            </div>
          </div>

          <div className="lx-head" style={{ marginTop: "clamp(4rem, 8vw, 6rem)" }} data-lx-reveal>
            <span className="lx-badge">{team.badge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={team.title} /></h2>
          </div>
          <div className={`lx-grid ${team.members.length === 2 || team.members.length === 4 ? "lx-grid--2" : "lx-grid--3"}`}>
            {team.members.map((m, n) => (
              <div key={n} className="lx-card lx-card--soft lx-spot lx-member" data-lx-card>
                <div className="lx-member__ava" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="lx-h3">{m.name}</h3>
                <small>{m.role}</small>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials & partners */}
      <section className="lx-sec lx-sec--accent">
        <div className="lx-wrap">
          <div className="lx-head" data-lx-reveal>
            <span className="lx-badge lx-badge--light">{partners.badge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={partners.title} /></h2>
          </div>
          <ul className="lx-pills">
            {partners.list.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <p className="lx-lede" style={{ marginTop: "2rem" }} data-lx-reveal>{partners.note}</p>
        </div>
      </section>

      <LxContact
        heading="No account manager between you and the people doing the work."
        body="Direct access to the team. A real reply within 24 hours. No lock-in contracts — ever."
      />
    </LxShell>
  );
}
