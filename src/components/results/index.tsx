import { clsx } from "clsx";
import useToggle from "../use-toggle";
import Data from "../data.json";
import { Link, useParams } from "react-router-dom";
import IconHtml from "/src/assets/icon-html.svg";
import IconCss from "/src/assets/icon-css.svg";
import IconJs from "/src/assets/icon-js.svg";
import IconAccessibility from "/src/assets/icon-accessibility.svg";

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

function Results(props: { correctAnswers: number }) {
  const { isToggled } = useToggle();

  const { question } = useParams();
  const questionObj = Data.quizzes.find(
    (quiz) => quiz.title.toLowerCase() === question?.toLowerCase()
  );

  if (!questionObj) {
    return "Results not found";
  }

  return (
    <div className="w-full">
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
      <div className="desktop:flex desktop:justify-between">
        <div className="mb-[16px]">
          <h2
            className={clsx(
              isToggled ? "text-[#FFF]" : "text-[#313E51]",
              "tablet:text-[64px] tablet:leading-[64px] text-[40px] font-[300] leading-[40px]"
            )}
          >
            Quiz completed
          </h2>
          <h1
            className={clsx(
              isToggled ? "text-[#FFF]" : "text-[#313E51]",
              "tablet:text-[64px] tablet:leading-[64px] text-[40px] font-[600] leading-[40px]"
            )}
          >
            You scored...
          </h1>
        </div>
        <div className="desktop:w-[564px]">
          <div
            className={clsx(
              isToggled ? "bg-[#3B4D66]" : "bg-[#FFF]",
              "flex flex-col items-center px-[80px] py-[32px] rounded-lg mb-[12px]"
            )}
          >
            <div className="flex items-center gap-[16px] w-max mb-[16px]">
              <div
                className={`${getBackgroundColor(
                  questionObj.title
                )} w-[40px] p-[5.71px] rounded-md`}
              >
                <img src={icons[questionObj.icon]} alt={questionObj.title} />
              </div>
              <h1
                className={clsx(
                  isToggled ? "text-[#FFF]" : "text-[#313E51]",
                  "text-[20px] font-[600] leading-[24px]"
                )}
              >
                {questionObj.title}
              </h1>
            </div>
            <h1
              className={clsx(
                isToggled ? "text-[#FFF]" : "text-[#313E51]",
                "tablet:text-[144px] tablet:leading-[144px] text-[88px] font-[600] leading-[88px] mb-[16px]"
              )}
            >
              {props.correctAnswers}
            </h1>
            <div>
              <h2
                className={clsx(
                  isToggled ? "text-[#ABC1E1]" : "text-[#313E51]",
                  "tablet:text-[24px] tablet:leading-[36px] text-[18px] font-[400] leading-[18px]"
                )}
              >
                out of 10
              </h2>
            </div>
          </div>
          <Link to={"/"}>
            <button
              onClick={() => {}}
              className="tablet:text-[28px] tablet:leading-[28px] p-[19px] w-full rounded-lg text-[18px] font-[600] leading-[18px] text-[#FFF] bg-[#A729F5] hover:bg-[#b16cdb]"
            >
              Play Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
