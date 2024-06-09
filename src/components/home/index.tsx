import IconHtml from "/src/assets/icon-html.svg";
import IconCss from "/src/assets/icon-css.svg";
import IconJs from "/src/assets/icon-js.svg";
import IconAccessibility from "/src/assets/icon-accessibility.svg";
import Data from "../data.json";
import { Link } from "react-router-dom";

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

function home(props: {
  isToggled: boolean;
  showQuestions: boolean;
  setShowQuestions: (status: boolean) => void;
}) {
  return (
    <div className="w-full">
      <div className="mb-[40px]">
        <div className="mb-[16px]">
          <h2
            className={`${
              props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
            } text-[40px] font-[300] leading-[40px]`}
          >
            Welcome to the
          </h2>
          <h1
            className={`${
              props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
            } text-[40px] font-[600] leading-[40px] text-[#313E51]`}
          >
            Frontend Quiz!
          </h1>
        </div>
        <h3
          className={`${
            props.isToggled ? "text-[#ABC1E1]" : "text-[#313E51]"
          } text-[14px] italic font-[400] leading-[21px] text-[#626C7F]`}
        >
          Pick a subject to get started.
        </h3>
      </div>
      <div className="flex flex-col gap-[12px]">
        {Data.quizzes.map((quiz, index) => (
          <Link to={`/quiz/${quiz.title.toLowerCase()} `}>
            <button
              key={index}
              onClick={() => {
                props.setShowQuestions(true);
              }}
              className={`${
                props.isToggled ? "bg-[#3B4D66]" : "bg-[#FFF]"
              } flex items-center gap-[16px] p-[12px] w-full rounded-lg`}
            >
              <div
                className={`${getBackgroundColor(
                  quiz.title
                )} w-[40px] p-[5.71px] rounded-md`}
              >
                <img src={icons[quiz.icon]} alt={quiz.title} />
              </div>
              <h1
                className={`${
                  props.isToggled ? "text-[#FFF]" : "text-[#313E51]"
                } text-[18px] font-[600] leading-[18px]`}
              >
                {quiz.title}
              </h1>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default home;
