import sunDark from "/src/assets/icon-sun-dark.svg";
import moonDark from "/src/assets/icon-moon-dark.svg";
import sunLight from "/src/assets/icon-sun-light.svg";
import moonLight from "/src/assets/icon-moon-light.svg";
import useToggle from "../use-toggle";

function Toggle() {
  const { isToggled, setIsToggled } = useToggle();

  return (
    <div className="desktop:mb-[100px] flex mb-[16px]">
      <img
        className="w-[25px]"
        src={isToggled ? sunLight : sunDark}
        alt="sunDark"
      />
      <div className="h-[24px]">
        <label className="inline-flex items-center mx-[16px] cursor-pointer">
          <input
            onClick={() => {
              setIsToggled(!isToggled);
            }}
            type="checkbox"
            id="checkbox"
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-[#A729F5] rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[3px] after:start-[4px] after:bg-[#FFF] after:rounded-full after:h-[18px] after:w-[18px] after:transition-all"></div>
        </label>
      </div>
      <img
        className="w-[25px]"
        src={isToggled ? moonLight : moonDark}
        alt="moonDark"
      />
    </div>
  );
}
export default Toggle;
