import { ReactElement } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { calculateScores, recommendGifts } from "@/src/utils/reccomendGift";
import { Answers } from "@/src/utils/types";

interface ReccomendationsProps {
  answers: Answers;
}

export function Recommendations({
  answers,
}: ReccomendationsProps): ReactElement {
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
