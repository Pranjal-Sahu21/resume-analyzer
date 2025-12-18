import React from "react";
import { motion, useAnimation } from "framer-motion";

export default function HomePage({ onUploadClick }) {
  const heading = "Land Your Dream Job With Smart Resume Feedback";
  const contentControls = useAnimation();

  const headingContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        when: "afterChildren",
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <section className="relative w-full h-screen flex flex-col gap-4 justify-center items-center text-center overflow-hidden px-4">
      {/* Heading */}
      <motion.h1
        className="text-[#3D7AE5] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl"
        variants={headingContainer}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => contentControls.start("visible")}
      >
        {heading.split(" ").map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className="inline-block mr-2"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={letter}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-blue-950 font-light text-md sm:text-lg max-w-3xl mb-8 mx-auto"
        initial="hidden"
        animate={contentControls}
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: "easeOut",
            },
          },
        }}
      >
        Upload your resume and receive instant analysis, ATS compatibility
        scores, and actionable improvement suggestions.
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={onUploadClick}
        className="px-7 py-4 cursor-pointer rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#415ead] text-white transition-all text-sm font-bold shadow-md active:scale-95"
        initial="hidden"
        animate={contentControls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 90,
              damping: 18,
            },
          },
        }}
      >
        Upload Resume
      </motion.button>
      <motion.div
        className="absolute bottom-8 flex flex-col items-center cursor-pointer"
        onClick={onUploadClick}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </section>
  );
}
