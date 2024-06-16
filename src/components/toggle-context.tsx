import { createContext, useState, ReactNode } from "react";

interface ToggleContextType {
  isToggled: boolean;
  setIsToggled: (status: boolean) => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <ToggleContext.Provider value={{ isToggled, setIsToggled }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
