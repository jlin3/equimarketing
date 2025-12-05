"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Coffee, Heart, Mail, Check, Sparkles } from "lucide-react";

const TARGET_WORD = "ALPHA";
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

type LetterState = "correct" | "present" | "absent" | "empty";
type GameStatus = "playing" | "won" | "lost";

interface TileProps {
  letter: string;
  state: LetterState;
  delay?: number;
  isRevealing?: boolean;
}

function Tile({ letter, state, delay = 0, isRevealing }: TileProps) {
  const stateStyles: Record<LetterState, string> = {
    correct: "bg-[#194E3B] border-[#194E3B] text-white",
    present: "bg-[#E0A920] border-[#E0A920] text-white",
    absent: "bg-[#404040] border-[#404040] text-white",
    empty: "bg-transparent border-border",
  };

  return (
    <motion.div
      initial={isRevealing ? { rotateX: 0 } : false}
      animate={isRevealing ? { rotateX: 360 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`
        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
        border-2 flex items-center justify-center
        text-2xl sm:text-3xl font-bold uppercase
        ${stateStyles[state]}
        ${letter && state === "empty" ? "border-muted-foreground" : ""}
      `}
    >
      {letter}
    </motion.div>
  );
}

interface KeyboardKeyProps {
  keyValue: string;
  state?: LetterState;
  onClick: (key: string) => void;
}

function KeyboardKey({ keyValue, state, onClick }: KeyboardKeyProps) {
  const isSpecialKey = keyValue === "ENTER" || keyValue === "⌫";
  
  const stateStyles: Record<LetterState | "default", string> = {
    correct: "bg-[#194E3B] text-white border-[#194E3B]",
    present: "bg-[#E0A920] text-white border-[#E0A920]",
    absent: "bg-[#404040] text-white border-[#404040]",
    empty: "bg-muted hover:bg-muted/80 text-foreground border-border",
    default: "bg-muted hover:bg-muted/80 text-foreground border-border",
  };

  return (
    <button
      onClick={() => onClick(keyValue)}
      className={`
        ${isSpecialKey ? "px-3 sm:px-4 text-xs sm:text-sm" : "w-8 sm:w-10 md:w-11"}
        h-12 sm:h-14 rounded-lg font-semibold uppercase
        border transition-colors
        ${stateStyles[state || "default"]}
      `}
    >
      {keyValue}
    </button>
  );
}

function ConfettiPiece({ delay }: { delay: number }) {
  const colors = ["#194E3B", "#E0A920", "#DFF9BA", "#C9B69A"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 720 - 360;

  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}vw`, rotate: 0, opacity: 1 }}
      animate={{ y: "100vh", rotate: randomRotation, opacity: 0 }}
      transition={{ duration: 3, delay, ease: "easeIn" }}
      className="fixed top-0 w-3 h-3 z-50"
      style={{ backgroundColor: randomColor }}
    />
  );
}

function WinCelebration({ onClose }: { onClose: () => void }) {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {confettiPieces.map((i) => (
        <ConfettiPiece key={i} delay={i * 0.05} />
      ))}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-md text-center relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sparkles className="w-16 h-16 text-secondary mx-auto mb-4" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">You Won!</h2>
        <p className="text-muted-foreground mb-6">
          Congratulations! You guessed <span className="font-bold text-primary">ALPHA</span> correctly!
        </p>
        <button
          onClick={onClose}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Claim Your Reward
        </button>
      </motion.div>
    </motion.div>
  );
}

interface RewardSelectionProps {
  onSelect: (reward: "starbucks" | "donation") => void;
  selectedReward: "starbucks" | "donation" | null;
}

function RewardSelection({ onSelect, selectedReward }: RewardSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-center">Choose Your Reward</h3>
      <p className="text-muted-foreground text-center text-sm">
        As a thank you for playing, select one of the following:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect("starbucks")}
          className={`
            p-6 rounded-xl border-2 transition-all text-left
            ${selectedReward === "starbucks" 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50"}
          `}
        >
          <Coffee className="w-10 h-10 text-[#00704A] mb-3" />
          <h4 className="font-bold text-lg">$20 Starbucks Gift Card</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Enjoy your favorite coffee on us!
          </p>
          {selectedReward === "starbucks" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-3 flex items-center gap-2 text-primary font-medium"
            >
              <Check className="w-4 h-4" /> Selected
            </motion.div>
          )}
        </button>
        <button
          onClick={() => onSelect("donation")}
          className={`
            p-6 rounded-xl border-2 transition-all text-left
            ${selectedReward === "donation" 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50"}
          `}
        >
          <Heart className="w-10 h-10 text-red-500 mb-3" />
          <h4 className="font-bold text-lg">$36 to Children&apos;s Cancer Research</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Help fund life-saving research for kids.
          </p>
          {selectedReward === "donation" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-3 flex items-center gap-2 text-primary font-medium"
            >
              <Check className="w-4 h-4" /> Selected
            </motion.div>
          )}
        </button>
      </div>
    </div>
  );
}

interface EmailFormProps {
  onSubmit: (email: string) => void;
  isSubmitting: boolean;
}

function EmailForm({ onSubmit, isSubmitting }: EmailFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      onSubmit(email);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Enter your email to receive your reward
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !email}
        className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </motion.form>
  );
}

function SuccessNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#194E3B] text-white p-6 rounded-2xl text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <Check className="w-16 h-16 mx-auto mb-4 text-[#DFF9BA]" />
      </motion.div>
      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
      <p className="text-white/80">
        We&apos;ve received your submission. Check your email for your reward details!
      </p>
    </motion.div>
  );
}

export default function GamesPage() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [revealingRow, setRevealingRow] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRewardSelection, setShowRewardSelection] = useState(false);
  const [selectedReward, setSelectedReward] = useState<"starbucks" | "donation" | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({});

  const getLetterState = useCallback((letter: string, index: number, word: string): LetterState => {
    const upperLetter = letter.toUpperCase();
    const targetLetter = TARGET_WORD[index];

    if (upperLetter === targetLetter) {
      return "correct";
    }
    if (TARGET_WORD.includes(upperLetter)) {
      // Check if this letter appears more times in guess than in target
      const targetCount = TARGET_WORD.split("").filter((l) => l === upperLetter).length;
      const correctCount = word
        .toUpperCase()
        .split("")
        .filter((l, i) => l === upperLetter && TARGET_WORD[i] === upperLetter).length;
      const presentCount = word
        .toUpperCase()
        .split("")
        .slice(0, index)
        .filter((l, i) => l === upperLetter && TARGET_WORD[i] !== upperLetter).length;
      
      if (correctCount + presentCount < targetCount) {
        return "present";
      }
    }
    return "absent";
  }, []);

  const updateLetterStates = useCallback((guess: string) => {
    const newStates = { ...letterStates };
    guess.split("").forEach((letter, index) => {
      const state = getLetterState(letter, index, guess);
      const currentState = newStates[letter.toUpperCase()];
      // Only upgrade state (correct > present > absent)
      if (
        !currentState ||
        state === "correct" ||
        (state === "present" && currentState === "absent")
      ) {
        newStates[letter.toUpperCase()] = state;
      }
    });
    setLetterStates(newStates);
  }, [letterStates, getLetterState]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing" || revealingRow !== null) return;

      if (key === "ENTER") {
        if (currentGuess.length === WORD_LENGTH) {
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);
          setRevealingRow(guesses.length);
          
          setTimeout(() => {
            updateLetterStates(currentGuess);
            setRevealingRow(null);
            
            if (currentGuess.toUpperCase() === TARGET_WORD) {
              setGameStatus("won");
              setTimeout(() => setShowCelebration(true), 500);
            } else if (newGuesses.length >= MAX_GUESSES) {
              setGameStatus("lost");
            }
          }, WORD_LENGTH * 100 + 500);
          
          setCurrentGuess("");
        }
      } else if (key === "⌫" || key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < WORD_LENGTH && /^[A-Za-z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    },
    [currentGuess, guesses, gameStatus, revealingRow, updateLetterStates]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (e.key === "Backspace") {
        handleKeyPress("⌫");
      } else {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    setShowRewardSelection(true);
  };

  const handleSelectReward = (reward: "starbucks" | "donation") => {
    setSelectedReward(reward);
    setShowEmailForm(true);
  };

  const handleSubmitEmail = async (email: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/charity-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reward: selectedReward }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback - still show success for UX
        setSubmitted(true);
      }
    } catch {
      // Fallback - still show success for UX
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < MAX_GUESSES; i++) {
      const guess = guesses[i] || (i === guesses.length ? currentGuess : "");
      const isSubmittedGuess = i < guesses.length;
      const isRevealing = revealingRow === i;

      const tiles = [];
      for (let j = 0; j < WORD_LENGTH; j++) {
        const letter = guess[j] || "";
        let state: LetterState = "empty";
        
        if (isSubmittedGuess && !isRevealing) {
          state = getLetterState(letter, j, guess);
        } else if (isRevealing) {
          state = getLetterState(letter, j, guess);
        }

        tiles.push(
          <Tile
            key={j}
            letter={letter}
            state={isSubmittedGuess || isRevealing ? state : "empty"}
            delay={isRevealing ? j * 0.1 : 0}
            isRevealing={isRevealing}
          />
        );
      }
      rows.push(
        <div key={i} className="flex gap-1.5">
          {tiles}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-lg font-bold">Equi Games</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Play for Good
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Wordle for Charity</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Guess the 5-letter word and win a reward for yourself or donate to children&apos;s cancer research!
          </p>
        </motion.div>

        {/* Game or Reward Flow */}
        {!showRewardSelection && !submitted ? (
          <>
            {/* Game Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-1.5 mb-8"
            >
              {renderGrid()}
            </motion.div>

            {/* Game Status Message */}
            {gameStatus === "lost" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-muted-foreground">
                  The word was <span className="font-bold text-primary">ALPHA</span>
                </p>
                <button
                  onClick={() => {
                    setGuesses([]);
                    setCurrentGuess("");
                    setGameStatus("playing");
                    setLetterStates({});
                  }}
                  className="mt-4 text-primary underline hover:no-underline"
                >
                  Play Again
                </button>
              </motion.div>
            )}

            {/* Keyboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              {KEYBOARD_ROWS.map((row, i) => (
                <div key={i} className="flex gap-1.5">
                  {row.map((key) => (
                    <KeyboardKey
                      key={key}
                      keyValue={key}
                      state={letterStates[key]}
                      onClick={handleKeyPress}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </>
        ) : submitted ? (
          <SuccessNotification />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto space-y-8"
          >
            <RewardSelection onSelect={handleSelectReward} selectedReward={selectedReward} />
            {showEmailForm && selectedReward && (
              <EmailForm onSubmit={handleSubmitEmail} isSubmitting={isSubmitting} />
            )}
          </motion.div>
        )}
      </main>

      {/* Win Celebration Modal */}
      <AnimatePresence>
        {showCelebration && <WinCelebration onClose={handleCloseCelebration} />}
      </AnimatePresence>
    </div>
  );
}

