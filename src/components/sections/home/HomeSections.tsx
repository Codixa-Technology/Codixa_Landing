import type { CSSProperties } from "react";
import type { CommonContent, HomeContent, ServiceContent, ServiceSlug } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";
import { ButtonLink } from "../../ui/Button";
import { Icon, type IconName } from "../../ui/Icon";
import { SectionHeading } from "../../ui/SectionHeading";
import { CodePanel } from "../../visuals/CodePanel";
import { FaqList } from "../FaqList";
import { ProcessSteps } from "../ProcessSteps";
import { ServiceIndex } from "../ServiceIndex";
import styles from "./HomeSections.module.css";

const reveal = (i: number) => ({ "--reveal-i": i }) as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

/* ───────────────────────────── Hero ───────────────────────────── */

const pillarIcons: IconName[] = ["website", "code", "crm", "integrations"];

export function Hero({ locale, home, common }: { locale: Locale; home: HomeContent; common: CommonContent }) {
  const { hero, pillars } = home;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`hairgrid ${styles.heroGrid}`} aria-hidden="true" />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <p className={`${styles.heroLabel} ${styles.enter}`} style={{ "--e": 0 } as CSSProperties}>
            <span className="tick" aria-hidden="true" />
            {hero.label}
          </p>
          <h1 id="hero-title" className={`t-display ${styles.heroTitle} ${styles.enter}`} style={{ "--e": 1 } as CSSProperties}>
            {hero.titleStart}
            <span className="t-accent">{hero.titleAccent}</span>
            {hero.titleEnd}
          </h1>
          <p className={`t-lead ${styles.heroLead} ${styles.enter}`} style={{ "--e": 2 } as CSSProperties}>
            {hero.text}
          </p>
          <div className={`${styles.heroActions} ${styles.enter}`} style={{ "--e": 3 } as CSSProperties}>
            <ButtonLink href={localePath(locale, "/contact")} size="lg">
              {common.actions.startProject}
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/services")} size="lg" variant="secondary" icon={null}>
              {common.actions.exploreServices}
            </ButtonLink>
          </div>
        </div>
        <div className={`${styles.heroVisual} ${styles.enter}`} style={{ "--e": 2 } as CSSProperties}>
          <CodePanel noteTitle={hero.noteTitle} noteText={hero.noteText} />
        </div>
      </div>

      <div className="container">
        <ul role="list" className={styles.pillars}>
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className={`${styles.pillar} ${styles.enter}`} style={{ "--e": 4 + i * 0.5 } as CSSProperties}>
              <Icon name={pillarIcons[i] ?? "modules"} className={styles.pillarIcon} />
              <p className={styles.pillarTitle}>{pillar.title}</p>
              <p className={styles.pillarText}>{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────────── Intro ───────────────────────────── */

export function Intro({ home }: { home: HomeContent }) {
  const { intro } = home;
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className={`container ${styles.intro}`}>
        <div className={styles.introHead} data-reveal>
          <p className={styles.kicker}>
            <span className={styles.rule} aria-hidden="true" />
            {intro.label}
          </p>
          <h2 id="intro-title" className="t-h2">
            {intro.title}
          </h2>
        </div>
        <div className={styles.introBody}>
          <p className={`t-statement brackets ${styles.statement}`} data-reveal>
            {intro.statement}
          </p>
          <p className="t-body" data-reveal style={reveal(1)}>
            {intro.text}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Services ──────────────────────────── */

export function ServicesOverview({
  locale,
  home,
  services,
  common,
}: {
  locale: Locale;
  home: HomeContent;
  services: Record<ServiceSlug, ServiceContent>;
  common: CommonContent;
}) {
  return (
    <section className="section" data-tone="paper" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          index="01"
          label={home.services.label}
          title={home.services.title}
          text={home.services.text}
          layout="split"
        />
        <ServiceIndex locale={locale} slugs={serviceSlugs} services={services} />
        <div className={styles.sectionFoot} data-reveal>
          <ButtonLink href={localePath(locale, "/services")} variant="ghost">
            {common.actions.allServices}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Problems ──────────────────────────── */

export function Problems({ home }: { home: HomeContent }) {
  const { problems } = home;
  return (
    <section className={`section ${styles.problems}`} data-tone="ink" aria-labelledby="problems-title">
      <div className={`hairgrid ${styles.problemsGrid}`} aria-hidden="true" />
      <div className={styles.problemsLine} aria-hidden="true" />
      <div className="container">
        <SectionHeading id="problems-title" index="02" label={problems.label} title={problems.title} text={problems.text} layout="split" />
        <ol role="list" className={styles.problemList}>
          {problems.items.map((item, i) => (
            <li key={item.problem} className={styles.problem} data-reveal style={reveal(i % 2)}>
              <span className={styles.problemNo} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className={styles.problemTitle}>{item.problem}</h3>
              <p className={styles.solution}>
                <Icon name="arrowRight" size={18} className={styles.solutionIcon} />
                <span>{item.solution}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ──────────────────────────── Process ──────────────────────────── */

export function Process({ home }: { home: HomeContent }) {
  const { process } = home;
  return (
    <section className="section" data-tone="paper" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading id="process-title" index="03" label={process.label} title={process.title} text={process.text} />
        <ProcessSteps steps={process.steps} />
      </div>
    </section>
  );
}

/* ─────────────────────────── Principles ─────────────────────────── */

export function Principles({ home }: { home: HomeContent }) {
  const { principles } = home;
  return (
    <section className="section" aria-labelledby="principles-title">
      <div className={`container ${styles.principles}`}>
        <div className={styles.principlesHead}>
          <SectionHeading id="principles-title" index="04" label={principles.label} title={principles.title} />
        </div>
        <ol role="list" className={styles.principleList}>
          {principles.items.map((item, i) => (
            <li key={item.title} className={styles.principle} data-reveal>
              <span className={styles.principleNo} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="t-h3">{item.title}</h3>
              <p className="t-body">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ────────────────────────── Capabilities ────────────────────────── */

export function Capabilities({ home }: { home: HomeContent }) {
  const { capabilities } = home;
  return (
    <section className="section" data-tone="stone" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading
          id="capabilities-title"
          index="05"
          label={capabilities.label}
          title={capabilities.title}
          text={capabilities.text}
          layout="split"
        />
        <div className={styles.capGrid}>
          {capabilities.groups.map((group, i) => (
            <div key={group.title} className={styles.capGroup} data-reveal style={reveal(i)}>
              <h3 className={styles.capTitle}>
                <span>{pad(i + 1)}</span>
                {group.title}
              </h3>
              <ul role="list" className={styles.capList}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Audiences ──────────────────────────── */

const audienceIcons: IconName[] = ["rocket", "building", "growth", "users", "cart", "globe"];

export function Audiences({ home }: { home: HomeContent }) {
  const { audiences } = home;
  return (
    <section className="section" aria-labelledby="audiences-title">
      <div className="container">
        <SectionHeading id="audiences-title" index="06" label={audiences.label} title={audiences.title} />
        <ul role="list" className={styles.audienceGrid}>
          {audiences.items.map((item, i) => (
            <li key={item.title} className={styles.audience} data-reveal style={reveal(i % 3)}>
              <span className={styles.audienceIcon} aria-hidden="true">
                <Icon name={audienceIcons[i] ?? "users"} />
              </span>
              <h3 className="t-h3">{item.title}</h3>
              <p className="t-body">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────── FAQ ─────────────────────────────── */

export function HomeFaq({ locale, home, common }: { locale: Locale; home: HomeContent; common: CommonContent }) {
  const { faq } = home;
  return (
    <section className="section" data-tone="paper" aria-labelledby="faq-title">
      <div className={`container ${styles.faq}`}>
        <div className={styles.faqHead}>
          <SectionHeading id="faq-title" index="07" label={faq.label} title={faq.title} text={faq.text} />
          <div className={styles.faqContact} data-reveal>
            <ButtonLink href={localePath(locale, "/contact")} variant="dark">
              {common.actions.contactUs}
            </ButtonLink>
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
        <div data-reveal>
          <FaqList items={faq.items} />
        </div>
      </div>
    </section>
  );
}
