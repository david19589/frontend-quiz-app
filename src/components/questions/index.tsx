import IconHtml from "/src/assets/icon-html.svg";
import IconCss from "/src/assets/icon-css.svg";
import IconJs from "/src/assets/icon-js.svg";
import IconCorrect from "/src/assets/icon-correct.svg";
import IconInCorrect from "/src/assets/icon-incorrect.svg";
import IconAccessibility from "/src/assets/icon-accessibility.svg";
import Data from "../data.json";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { clsx } from "clsx";
import useToggle from "../use-toggle";
import Results from "../results";

const icons: { [key: string]: string } = {
  "icon-html.svg": IconHtml,
  "icon-css.svg": IconCss,
  "icon-js.svg": IconJs,
  "icon-accessibility.svg": IconAccessibility,
};

interface BackgroundColors {
  [key: string]: string;
}

const backgroundColors: BackgroundColors = {
  html: "bg-[#FFF1E9]",
  css: "bg-[#E0FDEF]",
  javascript: "bg-[#EBF0FF]",
  accessibility: "bg-[#F6E7FF]",
};

function getBackgroundColor(title: string) {
  const lowerCaseTitle = title.toLowerCase();
  return backgroundColors[lowerCaseTitle] || "";
}

function Questions() {
  const { question } = useParams();
  const questionObj = Data.quizzes.find(
    (quiz) => quiz.title.toLowerCase() === question?.toLowerCase()
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submit, setSubmit] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { isToggled } = useToggle();

  if (!questionObj) {
    return <div>Quiz not found</div>;
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionObj.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setSubmit(false);
      setAttemptedSubmit(false);
    } else if (currentQuestionIndex === 9) {
      setShowResults(true);
    }
  };

  const currentQuestion = questionObj.questions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    if (submit) {
      const isCorrectAnswer =
        currentQuestion.answer === currentQuestion.options[optionIndex];
      if (isCorrectAnswer) {
        return isToggled
          ? "border-[#26D782] bg-[#3B4D66]"
          : "border-[#26D782] bg-[#FFF]";
      } else if (selectedAnswer === optionIndex) {
        return isToggled
          ? "border-[#EE5454] bg-[#3B4D66]"
          : "border-[#EE5454] bg-[#FFF]";
      } else {
        return isToggled
          ? "border-[#3B4D66] bg-[#3B4D66]"
          : "border-[#FFF] bg-[#FFF]";
      }
    } else if (selectedAnswer === optionIndex) {
      return "border-[#A729F5]";
    } else {
      return isToggled
        ? "border-[#3B4D66] bg-[#3B4D66]"
        : "border-[#FFF] bg-[#FFF]";
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setAttemptedSubmit(true);
    } else {
      setSubmit(true);
      setAttemptedSubmit(false);
      if (currentQuestion.options[selectedAnswer] === currentQuestion.answer) {
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      }
    }
  };

  return (
    <div className="desktop:flex desktop:items-center desktop:justify-between desktop:max-w-[1440px] w-full">
      {!showResults && (
        <>
          <div>
            <div className="desktop:translate-y-[-167px] tablet:translate-y-[-78px] tablet:absolute flex items-center gap-[16px] w-max mb-[16px]">
              <div
                className={clsx(
                  getBackgroundColor(questionObj.title),
                  "tablet:w-[56px] w-[40px] p-[5.71px] rounded-md"
                )}
              >
                <img src={icons[questionObj.icon]} alt={questionObj.title} />
              </div>
              <h1
                className={clsx(
                  isToggled ? "text-[#FFF]" : "text-[#313E51]",
                  "tablet:text-[28px] tablet:leading-[28px] text-[20px] font-[600] leading-[24px]"
                )}
              >
                {questionObj.title}
              </h1>
            </div>
            <h3
              className={clsx(
                isToggled ? "text-[#ABC1E1]" : "text-[#313E51]",
                "tablet:text-[20px] tablet:leading-[30px] tablet:mb-[27px] text-[14px] italic font-[400] leading-[21px] text-[#626C7F] mb-[12px]"
              )}
            >
              Question {currentQuestionIndex + 1} of 10
            </h3>
            <h1
              className={`${
                isToggled ? "text-[#FFF]" : "text-[#313E51]"
              } desktop:h-[452px] desktop:w-[465px] desktop:mb-0 tablet:text-[36px] tablet:leading-[43.2px] tablet:mb-[40px] text-[20px] font-[600] leading-[24px] mb-[12px]`}
            >
              {currentQuestion.question}
            </h1>
          </div>

          <div className="desktop:h-[486px] mb-[24px]">
            <div className="flex flex-col gap-[12px]">
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => {
                    if (!submit) {
                      setSelectedAnswer(optionIndex);
                    }
                  }}
                  className={clsx(
                    selectedAnswer === optionIndex && submit
                      ? handleAnswer(optionIndex)
                      : isToggled
                      ? "bg-[#3B4D66]"
                      : "bg-[#FFF]",
                    submit ? "cursor-default" : "cursor-pointer",
                    handleAnswer(optionIndex),
                    "desktop:w-[564px] flex items-center gap-[16px] p-[12px] w-full rounded-2xl border-[3px] group"
                  )}
                >
                  <div
                    className={clsx(
                      selectedAnswer === optionIndex && submit
                        ? currentQuestion.answer ===
                          currentQuestion.options[optionIndex]
                          ? "text-[#FFF] bg-[#26D782]"
                          : "text-[#FFF] bg-[#EE5454]"
                        : selectedAnswer === optionIndex
                        ? "text-[#FFF] bg-[#A729F5]"
                        : "text-[#626C7F] bg-[#F4F6FA]",
                      !submit &&
                        selectedAnswer !== optionIndex &&
                        "group-hover:bg-[#F6E7FF] group-hover:text-[#A729F5]",
                      "tablet:w-[54px] tablet:h-[50px] tablet:flex tablet:justify-center tablet:items-center w-[40px] p-[5.71px] rounded-md"
                    )}
                  >
                    <h1 className="tablet:text-[28px] tablet:leading-[28px] text-[20px] font-[500] leading-[28px]">
                      {String.fromCharCode(65 + optionIndex)}
                    </h1>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <h1
                      className={clsx(
                        isToggled ? "text-[#FFF]" : "text-[#313E51]",
                        "tablet:text-[28px] tablet:leading-[28px] text-[18px] font-[600] leading-[18px] text-start"
                      )}
                    >
                      {option}
                    </h1>
                    {submit &&
                      (currentQuestion.answer ===
                      currentQuestion.options[optionIndex] ? (
                        <img
                          className="h-[39px]"
                          src={IconCorrect}
                          alt="IconCorrect"
                        />
                      ) : selectedAnswer === optionIndex ? (
                        <img
                          className="h-[39px]"
                          src={IconInCorrect}
                          alt="IconInCorrect"
                        />
                      ) : null)}
                  </div>
                </button>
              ))}
              {!submit ? (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="tablet:text-[28px] tablet:leading-[28px] p-[19px] w-full rounded-lg text-[18px] font-[600] leading-[18px] text-[#FFF] bg-[#A729F5] hover:bg-[#b16cdb]"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  className="tablet:text-[28px] tablet:leading-[28px] p-[19px] w-full rounded-lg text-[18px] font-[600] leading-[18px] text-[#FFF] bg-[#A729F5] hover:bg-[#b16cdb]"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
              {attemptedSubmit && selectedAnswer === null && (
                <div className="flex items-center justify-center gap-[8px]">
                  <img src={IconInCorrect} alt="IconInCorrect" />
                  <h1 className=" text-[18px] text-[#EE5454] font-[400] leading-[18px]">
                    Please select an answer
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showResults && <Results correctAnswers={correctAnswers} />}
    </div>
  );
}

export default Questions;
