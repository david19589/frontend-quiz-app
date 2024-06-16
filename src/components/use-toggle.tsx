import { useContext } from "react";
import ToggleContext from "../components/toggle-context";

const useToggle = () => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};

export default useToggle;
