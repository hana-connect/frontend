import { Suspense } from "react";
import QuizStartPageClient from "./QuizStartPageClient";

export default function QuizPage() {
  return (
    <Suspense>
      <QuizStartPageClient />
    </Suspense>
  );
}
