import IconHtml from "/src/assets/icon-html.svg";
import IconCss from "/src/assets/icon-css.svg";
import IconJs from "/src/assets/icon-js.svg";
import IconCorrect from "/src/assets/icon-correct.svg";
import IconInCorrect from "/src/assets/icon-incorrect.svg";
import IconAccessibility from "/src/assets/icon-accessibility.svg";
import Data from "../data.json";
import { useParams } from "react-router-dom";
import { useState } from "react";

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

function Questions(props: { isToggled: boolean }) {
  const { question } = useParams();
  const questionObj = Data.quizzes.find(
    (quiz) => quiz.title.toLowerCase() === question?.toLowerCase()
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submit, setSubmit] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  if (!questionObj) {
    return <div>Quiz not found</div>;
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionObj.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setSubmit(false);
      setAttemptedSubmit(false);
    }
  };
  const currentQuestion = questionObj.questions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    if (submit) {
      const isCorrectAnswer =
        currentQuestion.answer === currentQuestion.options[optionIndex];
      if (isCorrectAnswer) {
        return props.isToggled
          ? "border-[#26D782] bg-[#3B4D66]"
          : "border-[#26D782] bg-[#FFF]";
      } else if (selectedAnswer === optionIndex) {
        return props.isToggled
          ? "border-[#EE5454] bg-[#3B4D66]"
          : "border-[#EE5454] bg-[#FFF]";
      } else {
        return props.isToggled
          ? "border-[#3B4D66] bg-[#3B4D66]"
          : "border-[#FFF] bg-[#FFF]";
      }
    } else if (selectedAnswer === optionIndex) {
      return "border-[#A729F5]";
    } else {
      return props.isToggled
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
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-[16px] w-max">
        <div
          className={`${getBackgroundColor(
            questionObj.title
          )} w-[40px] p-[5.71px] rounded-md`}
        >
          <img src={icons[questionObj.icon]} alt={questionObj.title} />
        </div>
        <h1
          className={`${
            props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
          } text-[20px] font-[600] leading-[24px]`}
        >
          {questionObj.title}
        </h1>
      </div>
      <h3
        className={`${
          props.isToggled ? "text-[#ABC1E1]" : "text-[#313E51]"
        } text-[14px] italic font-[400] leading-[21px] text-[#626C7F] mb-[12px]`}
      >
        Question {currentQuestionIndex + 1} of 10
      </h3>
      <div className="mb-[24px]">
        <h1
          className={`${
            props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
          } text-[20px] font-[600] leading-[24px] mb-[12px]`}
        >
          {currentQuestion.question}
        </h1>
        <div className="flex flex-col gap-[12px]">
          {currentQuestion.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => {
                if (!submit) {
                  setSelectedAnswer(optionIndex);
                }
              }}
              className={`${
                selectedAnswer === optionIndex && submit
                  ? handleAnswer(optionIndex)
                  : props.isToggled
                  ? "bg-[#3B4D66]"
                  : "bg-[#FFF]"
              } ${submit ? "cursor-default" : "cursor-pointer"} ${
                selectedAnswer === optionIndex && !submit
                  ? handleAnswer(optionIndex)
                  : handleAnswer(optionIndex)
              } flex items-center gap-[16px] p-[12px] w-full rounded-2xl border-[3px]`}
            >
              <div
                className={`${
                  selectedAnswer === optionIndex && submit
                    ? currentQuestion.answer ===
                      currentQuestion.options[optionIndex]
                      ? "text-[#FFF] bg-[#26D782]"
                      : "text-[#FFF] bg-[#EE5454]"
                    : selectedAnswer === optionIndex
                    ? "text-[#FFF] bg-[#A729F5]"
                    : "text-[#626C7F] bg-[#F4F6FA]"
                } w-[40px] p-[5.71px] rounded-md`}
              >
                <h1 className="text-[20px] font-[500] leading-[28px]">
                  {String.fromCharCode(65 + optionIndex)}
                </h1>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1
                  className={`${
                    props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
                  } text-[18px] font-[600] leading-[18px] text-start`}
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
              className="p-[19px] w-full rounded-lg text-[18px] font-[600] leading-[18px] text-[#FFF] bg-[#A729F5]"
            >
              Submit Answer
            </button>
          ) : (
            <button
              className="p-[19px] w-full rounded-lg text-[18px] font-[600] leading-[18px] text-[#FFF] bg-[#A729F5]"
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
    </div>
  );
}

export default Questions;
