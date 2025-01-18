import { ReactElement, useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import { questions } from "@/src/utils/quiz";
import { Answers } from "@/src/utils/types";

import { Quiz } from "./Quiz";
import { Recommendations } from "./Recommnedations";

export function PartnerInsights(): ReactElement {
  const [answers, setAnswers] = useState<Answers>();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  function handleOptionClick(questionId: number, optionId: string): void {
    if (answers != null && answers[questionId] === optionId) {
      const newAnswers = { ...answers };
      delete newAnswers[questionId];
      setAnswers(newAnswers);
    } else {
      setAnswers({ ...answers, [questionId]: optionId });
    }
  }

  function handleNextClick(): void {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  }

  function handlePreviousClick(): void {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  }

  return (
    <Stack
      data-testid="partner-insights"
      gap={5}
      sx={{
        backgroundColor: "#FFF5EB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="#4A4A4A" gutterBottom>
          Gifty
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: "#FFD8B1",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#36956B",
            },
          }}
        />
      </Container>
      <Container maxWidth="md">
        {quizCompleted === true && answers != null ? (
          <Recommendations answers={answers} />
        ) : (
          <Quiz
            answers={answers}
            questions={questions}
            currentQuestion={currentQuestion}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
            handleOptionClick={handleOptionClick}
          />
        )}
      </Container>
    </Stack>
  );
}
