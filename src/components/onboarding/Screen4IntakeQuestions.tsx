import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingData } from "@/pages/Onboarding";

interface Screen4IntakeQuestionsProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

interface QuestionDef {
  stem: string;
  unitLabel?: string;
  chips: string[];
}

interface QuestionSignal {
  firstTyped: string;
  finalAnswer: string;
  chipSelected: string;
  timeOnQuestion: number;
  skipped: boolean;
}

const questions: QuestionDef[] = [
  {
    stem: "Last year I closed",
    unitLabel: "deals",
    chips: ["under 10", "10–20", "21–35", "36–50", "50+"],
  },
  {
    stem: "Most of my business comes from",
    chips: [
      "referrals and sphere",
      "paid portals like Zillow",
      "my own marketing",
      "my brokerage or team",
      "honestly a mix of everything",
    ],
  },
  {
    stem: "The part that costs me the most deals is",
    chips: [
      "not following up fast enough",
      "leads going cold before I convert",
      "losing past clients to other agents",
      "not knowing who to call today",
      "doing everything manually",
    ],
  },
  {
    stem: "Right now I run my business out of",
    chips: [
      "a CRM I barely use",
      "spreadsheets and my phone",
      "Follow Up Boss or Lofty",
      "notes and memory",
      "nothing consistent",
    ],
  },
  {
    stem: "This year I'd consider myself winning if I",
    chips: [
      "hit a specific production number",
      "stopped losing deals to poor follow-up",
      "built something that runs without me chasing it",
      "actually used my database",
      "had a morning that didn't feel like chaos",
    ],
  },
];

const Screen4IntakeQuestions = ({
  onNext,
  onBack,
  onDataChange,
}: Screen4IntakeQuestionsProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [selectedChips, setSelectedChips] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [signals, setSignals] = useState<QuestionSignal[]>(
    questions.map(() => ({
      firstTyped: "",
      finalAnswer: "",
      chipSelected: "",
      timeOnQuestion: 0,
      skipped: false,
    }))
  );
  const [direction, setDirection] = useState(1);
  const questionStartTime = useRef(Date.now());
  const hasTypedFirst = useRef<boolean[]>(Array(5).fill(false));

  useEffect(() => {
    questionStartTime.current = Date.now();
  }, [currentQ]);

  const captureTime = useCallback(() => {
    const elapsed = (Date.now() - questionStartTime.current) / 1000;
    setSignals((prev) => {
      const copy = [...prev];
      copy[currentQ] = { ...copy[currentQ], timeOnQuestion: elapsed };
      return copy;
    });
    return elapsed;
  }, [currentQ]);

  const handleChipSelect = (chip: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = chip;
    setAnswers(newAnswers);

    const newChips = [...selectedChips];
    newChips[currentQ] = chip;
    setSelectedChips(newChips);

    setSignals((prev) => {
      const copy = [...prev];
      copy[currentQ] = { ...copy[currentQ], chipSelected: chip, finalAnswer: chip };
      return copy;
    });
  };

  const handleInputChange = (val: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = val;
    setAnswers(newAnswers);

    const newChips = [...selectedChips];
    newChips[currentQ] = null;
    setSelectedChips(newChips);

    if (!hasTypedFirst.current[currentQ] && val.length > 0) {
      hasTypedFirst.current[currentQ] = true;
      setSignals((prev) => {
        const copy = [...prev];
        copy[currentQ] = { ...copy[currentQ], firstTyped: val };
        return copy;
      });
    }

    setSignals((prev) => {
      const copy = [...prev];
      copy[currentQ] = { ...copy[currentQ], finalAnswer: val };
      return copy;
    });
  };

  const handleNext = () => {
    captureTime();
    if (currentQ < questions.length - 1) {
      setDirection(1);
      setCurrentQ((p) => p + 1);
    } else {
      // Map answers to OnboardingData fields
      const finalSignals = signals.map((s, i) => ({
        ...s,
        finalAnswer: answers[i],
        skipped: !answers[i],
      }));
      onDataChange({
        growthTarget: answers[0],
        leadSources: answers[1] ? [answers[1]] : [],
        goals: answers[2] ? [answers[2]] : [],
        previousSystems: answers[3] ? [answers[3]] : [],
        systemFeedback: answers[4],
        // @ts-ignore — signals piggyback on data
        _signals: finalSignals,
      });
      onNext();
    }
  };

  const handleBack = () => {
    captureTime();
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((p) => p - 1);
    } else {
      onBack();
    }
  };

  const handleSkip = () => {
    captureTime();
    setSignals((prev) => {
      const copy = [...prev];
      copy[currentQ] = { ...copy[currentQ], skipped: true };
      return copy;
    });
    if (currentQ < questions.length - 1) {
      setDirection(1);
      setCurrentQ((p) => p + 1);
    } else {
      handleNext();
    }
  };

  const q = questions[currentQ];

  return (
    <div
      style={{ background: "#0D0C0B" }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Wordmark */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-2">
        <span
          style={{ color: "#F15025", fontSize: "8px" }}
          className="leading-none"
        >
          ●
        </span>
        <span style={{ color: "#6B6560" }} className="text-sm font-light">
          Lite<span style={{ color: "#E8E4DF" }} className="font-medium">Haus</span>
        </span>
      </div>

      {/* Dot progress — top right */}
      <div className="fixed top-7 right-6 z-50 flex items-center gap-1.5">
        {questions.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentQ ? 16 : 6,
              height: 6,
              borderRadius: 3,
              background: i === currentQ ? "#F15025" : "#1E1A17",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Breathing glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(241,80,37,0.07) 0%, transparent 65%)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div style={{ maxWidth: 520 }} className="relative z-10 w-full px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ}
            custom={direction}
            initial={{ opacity: 0, y: direction * 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Question stem + input */}
            <div
              className="flex flex-wrap items-baseline justify-center gap-x-2"
              style={{
                fontSize: 23,
                fontWeight: 300,
                letterSpacing: "-0.01em",
                color: "#E8E4DF",
                lineHeight: 1.6,
              }}
            >
              <span>{q.stem}</span>
              <span className="inline-flex items-baseline gap-2">
                <input
                  type="text"
                  value={answers[currentQ]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="___"
                  className="bg-transparent outline-none text-center"
                  style={{
                    fontSize: 23,
                    fontWeight: 300,
                    color: "#F15025",
                    borderBottom: "1px solid",
                    borderColor: answers[currentQ] ? "#F15025" : "#2A2520",
                    minWidth: 80,
                    maxWidth: 220,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#F15025";
                  }}
                  onBlur={(e) => {
                    if (!answers[currentQ]) e.target.style.borderColor = "#2A2520";
                  }}
                />
                {q.unitLabel && (
                  <span style={{ color: "#6B6560" }}>{q.unitLabel}</span>
                )}
              </span>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {q.chips.map((chip) => {
                const isSelected = selectedChips[currentQ] === chip;
                return (
                  <button
                    key={chip}
                    onClick={() => handleChipSelect(chip)}
                    className="rounded-full transition-all duration-200 cursor-pointer"
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      padding: "6px 14px",
                      color: isSelected ? "#F15025" : "#4A4540",
                      border: `1px solid ${
                        isSelected ? "rgba(241,80,37,0.3)" : "#1E1A17"
                      }`,
                      background: isSelected
                        ? "rgba(241,80,37,0.09)"
                        : "transparent",
                    }}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            {/* Skip + Next */}
            <div className="flex items-center justify-center gap-5 mt-10">
              <button
                onClick={handleSkip}
                className="cursor-pointer transition-opacity duration-200 hover:opacity-70"
                style={{
                  fontSize: 13,
                  color: "#2E2A27",
                  background: "none",
                  border: "none",
                }}
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  background: "#F15025",
                  color: "#FFFFFF",
                  borderRadius: 5,
                  padding: "11px 32px",
                  fontSize: 16,
                  fontWeight: 400,
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {currentQ < questions.length - 1 ? "Next" : "Continue"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Screen4IntakeQuestions;
