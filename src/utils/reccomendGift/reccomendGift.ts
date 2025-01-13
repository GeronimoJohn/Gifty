import { Answers } from "../types";

type GiftCategory = "tech" | "fashion" | "books" | "sports" | "home";

const answerToCategoryMap: { [key: string]: GiftCategory } = {
  option1: "tech",
  option2: "fashion",
  option3: "books",
  option4: "sports",
  option5: "home",
};

export function calculateScores(answers: Answers): {
  [key in GiftCategory]: number;
} {
  const scores: { [key in GiftCategory]: number } = {
    tech: 0,
    fashion: 0,
    books: 0,
    sports: 0,
    home: 0,
  };

  for (const questionId in answers) {
    const answer = answers[questionId];
    const category = answerToCategoryMap[answer];
    if (category) {
      scores[category]++;
    }
  }

  return scores;
}

interface Gift {
  id: number;
  name: string;
  category: GiftCategory;
}

const gifts: Gift[] = [
  { id: 1, name: "Smartphone", category: "tech" },
  { id: 2, name: "Designer Handbag", category: "fashion" },
  { id: 3, name: "Bestselling Novel", category: "books" },
  { id: 4, name: "Fitness Tracker", category: "sports" },
  { id: 5, name: "Home Decor", category: "home" },
];

export function recommendGifts(scores: {
  [key in GiftCategory]: number;
}): Gift[] {
  const sortedCategories = Object.keys(scores).sort(
    (a, b) => scores[b as GiftCategory] - scores[a as GiftCategory]
  );
  const topCategory = sortedCategories[0] as GiftCategory;
  return gifts.filter((gift) => gift.category === topCategory);
}
