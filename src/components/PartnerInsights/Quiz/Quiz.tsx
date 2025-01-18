import { ReactElement } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import { Answers, Question } from "@/src/utils/types";

interface QuizProps {
  answers?: Answers;
  questions: Question[];
  currentQuestion: number;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
  handleOptionClick: (questionId: number, optionId: string) => void;
}

// TODO: Implement a ThemeProvider

export function Quiz({
  answers,
  questions,
  currentQuestion,
  handlePreviousClick,
  handleNextClick,
  handleOptionClick,
}: QuizProps): ReactElement {
  const currentQuestionData = questions[currentQuestion];

  return (
    <Stack
      gap={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Typography variant="h5" fontWeight="bold" color="#4A4A4A">
        {currentQuestionData.question}
      </Typography>
      <Box width="100%" display="flex" flexDirection="column" gap="8px">
        {currentQuestionData.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option.option}
            isSelected={answers?.[currentQuestionData.id] === option.id}
            onClick={() => handleOptionClick(currentQuestionData.id, option.id)}
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePreviousClick}
          disabled={currentQuestion === 0}
          sx={{
            textTransform: "none",
            fontSize: "14px",
            backgroundColor: "#36956B",
            color: "#FFFFFF",
            "&:disabled": {
              backgroundColor: "#FFD8B1",
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextClick}
          disabled={!answers?.[currentQuestionData.id]}
          sx={{
            textTransform: "none",
            fontSize: "14px",
            backgroundColor: "#36956B",
            color: "#FFFFFF",
            "&:disabled": {
              backgroundColor: "#FFD8B1",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
}

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  onClick: () => void;
}

function OptionButton({
  option,
  isSelected,
  onClick,
}: OptionButtonProps): ReactElement {
  return (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      onClick={onClick}
      endIcon={
        isSelected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />
      }
      sx={{
        textTransform: "none",
        justifyContent: "flex-start",
        fontSize: "16px",
        padding: "12px",
        borderRadius: "8px",
        color: isSelected ? "#FFFFFF" : "#4A4A4A",
        backgroundColor: isSelected ? "#FF8A00" : "#FFFFFF",
        borderColor: "#FFD8B1",
      }}
    >
      <Box flexGrow={1} textAlign="left">
        {option}
      </Box>
    </Button>
  );
}
