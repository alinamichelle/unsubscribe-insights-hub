import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface IntakeHeroProps {
  onNext: () => void;
}

const IntakeHero = ({ onNext }: IntakeHeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-[hsl(40_20%_95%)]">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(40 30% 90% / 0.8), transparent)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[980px] w-full text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-10 md:mb-[42px]"
        >
          Realty Haus
        </motion.p>

        {/* Headline */}
        <h1 className="font-bold tracking-[-0.035em] leading-[1.02] text-[clamp(38px,9vw,56px)] md:text-[clamp(48px,5.2vw,84px)]">
          {/* Block 1 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.6,
              delay: 0.2,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="block text-foreground mb-4 md:mb-[18px]"
          >
            We're not looking
            <br />
            for more agents.
          </motion.span>

          {/* Intentional pause spacer */}
          <span className="block h-4 md:h-[22px]" aria-hidden="true" />

          {/* Block 2 — delayed for dramatic effect */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.8,
              delay: 1.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="block"
            style={{ color: "hsl(40 25% 57%)", fontWeight: 730 }}
          >
            We're looking for
            <br />
            the right ones.
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-base md:text-lg leading-[1.75] text-muted-foreground max-w-[720px] mx-auto mt-9 md:mt-[46px] mb-10 md:mb-[54px]"
        >
          Before we talk about partnering, we want to understand who you are,
          how you work, and where you want to grow.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.0, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <button
            onClick={onNext}
            className="inline-flex items-center justify-center min-w-[270px] max-w-[360px] w-full md:w-auto px-[30px] py-[18px] rounded-[14px] bg-foreground text-background font-semibold text-base transition-all duration-250 ease-out hover:-translate-y-0.5"
            style={{
              boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.boxShadow =
                "0 24px 52px rgba(0,0,0,0.18)");
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.boxShadow =
                "0 18px 40px rgba(0,0,0,0.15)");
            }}
          >
            Start the conversation
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[13px] text-muted-foreground/70 mt-5"
        >
          Takes about 8–10 minutes. Be honest—we value clarity.
        </motion.p>
      </div>
    </div>
  );
};

export default IntakeHero;
