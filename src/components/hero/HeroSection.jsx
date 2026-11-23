import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-grid" />
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
        }}
      >
        <motion.p
          className="eyebrow hero-eyebrow"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
        >
          PRIVATE PROPERTY · UNITED KINGDOM
        </motion.p>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 35 },
            show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
          }}
        >
          Find a home
          <br />
          that feels <em>extraordinary.</em>
        </motion.h1>
        <motion.p
          className="hero-sub"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          Exceptional homes, thoughtfully found. Clear, personal guidance at
          every step.
        </motion.p>
        <motion.div
          className="hero-actions"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <Link className="button button-gold" to="/properties">
            Explore Properties <ArrowUpRight />
          </Link>
          <Link className="button button-ghost" to="/about">
            Discover Our Approach <ArrowDownRight />
          </Link>
        </motion.div>
      </motion.div>
      <div className="hero-note" aria-label="PJ approach">
        <span>THE PJ DIFFERENCE</span>
        <p>
          Expertly found.
          <br />
          Personally considered.
        </p>
        <i aria-hidden="true" />
      </div>
      <div className="hero-slide">
        <span>01</span>
        <i />
        <span>02</span>
        <i />
        <span>03</span>
      </div>
      <a
        className="hero-scroll"
        href="#search"
        aria-label="Scroll to property search"
      >
        <span>Scroll to explore</span>
        <i />
      </a>
    </section>
  );
}
