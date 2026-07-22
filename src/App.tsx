import { MotionConfig } from "motion/react";
import { Footer } from "./components/layout/Footer/Footer";
import { Header } from "./components/layout/Header/Header";
import { About } from "./components/sections/About/About";
import { Awards } from "./components/sections/Awards/Awards";
import { Contact } from "./components/sections/Contact/Contact";
import { Faq } from "./components/sections/Faq/Faq";
import { Founder } from "./components/sections/Founder/Founder";
import { Hero } from "./components/sections/Hero/Hero";
import { Pricing } from "./components/sections/Pricing/Pricing";
import { Services } from "./components/sections/Services/Services";
import { Testimonials } from "./components/sections/Testimonials/Testimonials";
import { TickerBands } from "./components/sections/TickerBands/TickerBands";
import { Works } from "./components/sections/Works/Works";
import styles from "./App.module.css";

/** Single-page composition. Section order mirrors the Framer canvas. */
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.page} id="top">
        <Header />
        <main className={styles.main}>
          <Hero />
          <TickerBands />
          <About />
          <Testimonials />
          <Works />
          <Services />
          <Founder />
          <Awards />
          <Pricing />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <div className={styles.tail} aria-hidden="true" />
      </div>
    </MotionConfig>
  );
}
