import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Screen1WelcomeProps {
  onNext: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const Screen1Welcome = ({ onNext }: Screen1WelcomeProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "#0D0C0B" }}
    >
      {/* Breathing ambient glow */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 1200,
          height: 1200,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(241,80,37,0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Wordmark — top left */}
      <div className="fixed top-6 left-6 flex items-center gap-2 z-10">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#F15025" }}
        />
        <span className="text-sm" style={{ color: "#E8E4DF" }}>
          Lite<span className="font-semibold">Haus</span>
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-10 max-w-[560px] w-full px-6 text-center">
        {/* Label */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-xs tracking-widest uppercase mb-8"
          style={{ color: "#6B6560" }}
        >
          Onboarding
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.5)}
          className="text-3xl font-light leading-[1.5]"
        >
          <span style={{ color: "#E8E4DF" }}>
            Most CRMs assume you'll adapt to them.
          </span>
          <br />
          <span style={{ color: "#F15025" }}>This one adapts to you.</span>
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          {...fadeUp(0.8)}
          className="text-base font-light mt-4"
          style={{ color: "#6B6560" }}
        >
          But first, we need to ask you some things.
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(1.1)} className="mt-12">
          <Button
            onClick={onNext}
            className="rounded-md text-base font-normal text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
            style={{
              backgroundColor: "#F15025",
              padding: "14px 40px",
              height: "auto",
            }}
          >
            I'm ready
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Screen1Welcome;
