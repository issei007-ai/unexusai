import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";

export const metadata = {
  title: "Case Studies — Unexus AI",
  description: "Real problems, real work, real results — across retail, hospitality, real estate, healthcare, and startups in the UAE and India.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title="Real problems. Real work. Real results."
          subtitle="Every case study here starts with a business that was stuck — and ends with one that isn't. Numbers are placeholders until replaced with real client data. The problems and approaches are real."
        >
          <a href="#contact" className="btn btn-primary btn-lg">Start your story</a>
        </PageHero>

        <CaseStudiesGrid />

        <ContactCTA
          heading="Want to be the next case study?"
          body="Tell us where things feel stuck and we'll talk through specifically what we'd do about it — no pitch, no pressure."
          imageSeed="unexus-results"
        />
      </main>
      <Footer />
    </>
  );
}
