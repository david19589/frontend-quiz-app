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
            ? "bg-[#313E51] desktop:bg-[url('/src/assets/pattern-background-desktop-dark.svg')] tablet:bg-[url('/src/assets/pattern-background-tablet-dark.svg')] bg-[url('/src/assets/pattern-background-mobile-dark.svg')]"
            : "bg-[#F4F6FA] desktop:bg-[url('/src/assets/pattern-background-desktop-light.svg')] tablet:bg-[url('/src/assets/pattern-background-tablet-light.svg')] bg-[url('/src/assets/pattern-background-mobile-light.svg')]",
          "desktop:pt-[97px] desktop:px-[140px] h-full flex justify-center pt-[26px] px-[24px] bg-no-repeat transition-all duration-[0.2s]"
        )}
      >
        <div className="max-w-[1440px] w-full">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
