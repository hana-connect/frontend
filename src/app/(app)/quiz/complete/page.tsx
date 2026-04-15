import { Suspense } from "react";
import QuizCompletePageClient from "./QuizCompletePageClient";

export default function QuizCompletePage() {
  return (
    <Suspense>
      <QuizCompletePageClient />
    </Suspense>
  );
}
