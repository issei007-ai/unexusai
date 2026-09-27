import LxSplit from "@/components/lx/LxSplit";
import { getSection } from "@/lib/cms";
import { HOME_TESTIMONIALS_DEFAULTS } from "@/lib/cms-schema";

/** Testimonials block for redesign-2 interior pages (same CMS section as home). */
export default async function LxQuotes() {
  const c = await getSection("home.testimonials", HOME_TESTIMONIALS_DEFAULTS);
  return (
    <section className="lx-sec">
      <div className="lx-wrap">
        <div className="lx-head" data-lx-reveal>
          <span className="lx-badge">{c.badge}</span>
          <h2 className="lx-h2" data-lx-fill><LxSplit text={c.title} /></h2>
          <p className="lx-lede">{c.intro}</p>
        </div>
        <div className="lx-quotes" style={{ marginTop: 0 }}>
          {c.items.map((t) => (
            <figure key={t.quote} className="lx-quote" style={{ background: "#fff" }}>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <span aria-hidden="true">{t.name.charAt(0)}</span>
                <div>
                  <b>{t.name}</b>
                  <small>{t.role}{t.company ? `, ${t.company}` : ""}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
