import IconHtml from "/src/assets/icon-html.svg";
import IconCss from "/src/assets/icon-css.svg";
import IconJs from "/src/assets/icon-js.svg";
import IconAccessibility from "/src/assets/icon-accessibility.svg";
import Data from "../data.json";
import { useParams } from "react-router-dom";

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

function Questions(props: { isToggled: boolean; showQuestions: boolean }) {
  const { question } = useParams();
  const questionObj = Data.quizzes.find(
    (quiz) => quiz.title.toLowerCase() === question?.toLowerCase()
  );

  if (!questionObj) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
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
        Question 6 of 10
      </h3>
      {questionObj.questions.map((question, index) => (
        <div key={index} className="mb-[24px]">
          <h1
            className={`${
              props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
            } text-[20px] font-[600] leading-[24px] mb-[12px]`}
          >
            {question.question}
          </h1>
          <div className="flex flex-col gap-[12px]">
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`${
                  props.isToggled ? "bg-[#3B4D66]" : "bg-[#FFF]"
                } flex items-center gap-[16px] p-[12px] w-full rounded-lg`}
              >
                <div className="w-[40px] p-[5.71px] bg-[#F4F6FA] rounded-md">
                  <h1>{String.fromCharCode(65 + optionIndex)}</h1>
                </div>
                <h1
                  className={`${
                    props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
                  } text-[18px] font-[600] leading-[18px] text-start`}
                >
                  {option}
                </h1>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="p-[19px] w-full rounded-lg text-[18px] font-[600] leading-[18px] text-[#FFF] bg-[#A729F5]">
        Submit Answer
      </button>
    </div>
  );
}

export default Questions;
