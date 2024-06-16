import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Toggle from "./components/toggle";
import QuizRoutes from "./components/quiz-routes";
import { clsx } from "clsx";
import useToggle from "../src/components/use-toggle";

function App() {
  const { isToggled } = useToggle();
  const [showQuestions, setShowQuestions] = useState(false);
  return (
    <BrowserRouter>
      <div
        className={clsx(
          isToggled
            ? "bg-[#313E51] bg-[url('/src/assets/pattern-background-mobile-dark.svg')]"
            : "bg-[#F4F6FA] bg-[url('/src/assets/pattern-background-mobile-light.svg')]",
          "h-full pt-[26px] px-[24px] bg-no-repeat transition-all duration-[0.2s]"
        )}
      >
        <div className="flex justify-end mb-[32px]">
          <Toggle />
        </div>
        <div className="flex flex-col items-center">
          <QuizRoutes
            showQuestions={showQuestions}
            setShowQuestions={setShowQuestions}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
