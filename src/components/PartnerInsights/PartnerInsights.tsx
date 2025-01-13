import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { ReactElement, useState } from "react";

import { Answers, Question } from "@/src/utils/types";
import { calculateScores, recommendGifts } from "@/src/utils/reccomendGift";

interface PartnerInsightsProps {
  questions: Question[];
}

export function PartnerInsights({
  questions,
}: PartnerInsightsProps): ReactElement {
  const [answers, setAnswers] = useState<Answers>();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  if (quizCompleted === true && answers != null) {
    const scores = calculateScores(answers);
    const recommendedGifts = recommendGifts(scores);
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Quiz Completed
            </Typography>
            <Typography variant="h6" component="div">
              Recommended Gifts:
            </Typography>
            <ul>
              {recommendedGifts.map((gift) => (
                <li key={gift.id}>{gift.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Card>
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / questions.length) * 100}
          style={{ width: "100%" }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {currentQuestionData.question}
          </Typography>
          {currentQuestionData.options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  checked={
                    answers != null &&
                    answers[currentQuestionData.id] === option.id
                  }
                  onChange={() =>
                    handleOptionClick(currentQuestionData.id, option.id)
                  }
                />
              }
              label={option.option}
              style={{ margin: "8px 0", width: "100%" }}
            />
          ))}
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePreviousClick}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!answers?.[currentQuestionData.id]}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
