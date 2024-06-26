import IconHtml from "/src/assets/icon-html.svg";
import IconCss from "/src/assets/icon-css.svg";
import IconJs from "/src/assets/icon-js.svg";
import IconAccessibility from "/src/assets/icon-accessibility.svg";
import Data from "../data.json";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import useToggle from "../use-toggle";

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

function Home(props: {
  showQuestions: boolean;
  setShowQuestions: (status: boolean) => void;
}) {
  const { isToggled } = useToggle();

  return (
    <div className="desktop:flex desktop:items-center desktop:justify-between desktop:max-w-[1160px] w-full">
      <div className="mb-[40px]">
        <div className="desktop:mb-[48px] mb-[16px]">
          <h2
            className={clsx(
              isToggled ? "text-[#FFF]" : "text-[#313E51]",
              "desktop:mb-[8px] tablet:text-[64px] tablet:leading-[64px] text-[40px] font-[300] leading-[40px]"
            )}
          >
            Welcome to the
          </h2>
          <h1
            className={clsx(
              isToggled ? "text-[#FFF]" : "text-[#313E51]",
              "tablet:text-[64px] tablet:leading-[64px] text-[40px] font-[600] leading-[40px]"
            )}
          >
            Frontend Quiz!
          </h1>
        </div>
        <h3
          className={clsx(
            isToggled ? "text-[#ABC1E1]" : "text-[#313E51]",
            "tablet:text-[20px] tablet:leading-[30px] text-[14px] italic font-[400] leading-[21px]"
          )}
        >
          Pick a subject to get started.
        </h3>
      </div>
      <div className="desktop:w-[564px] flex flex-col gap-[12px]">
        {Data.quizzes.map((quiz, index) => (
          <Link key={index} to={`/quiz/${quiz.title.toLowerCase()} `}>
            <button
              onClick={() => {
                props.setShowQuestions(true);
              }}
              className={clsx(
                isToggled
                  ? "bg-[#3B4D66] hover:bg-[#415269]"
                  : "bg-[#FFF] hover:bg-[#fafafa]",
                "flex items-center gap-[16px] p-[12px] w-full rounded-lg "
              )}
            >
              <div
                className={clsx(
                  getBackgroundColor(quiz.title),
                  "tablet:w-[56px] w-[40px] p-[5.71px] rounded-md"
                )}
              >
                <img src={icons[quiz.icon]} alt={quiz.title} />
              </div>
              <h1
                className={clsx(
                  isToggled ? "text-[#FFF]" : "text-[#313E51]",
                  "tablet:text-[28px] tablet:leading-[28px] text-[18px] font-[600] leading-[18px]"
                )}
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

export default Home;
