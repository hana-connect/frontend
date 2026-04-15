import { Suspense } from "react";
import QuizPlayPageClient from "./QuizPlayPageClient";

export default function QuizPlayPage() {
  return (
    <Suspense>
      <QuizPlayPageClient />
    </Suspense>
  );
}
