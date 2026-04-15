import { Suspense } from "react";
import QuizResultPageClient from "./QuizResultPageClient";

export default function QuizResultPage() {
  return (
    <Suspense>
      <QuizResultPageClient />
    </Suspense>
  );
}
