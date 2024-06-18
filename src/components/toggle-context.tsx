import { createContext, useState, ReactNode } from "react";

interface ToggleContextType {
  isToggled: boolean;
  setIsToggled: (status: boolean) => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

interface ToggleProviderProps {
  children: ReactNode;
}

export const ToggleProvider = ({ children }: ToggleProviderProps) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <ToggleContext.Provider value={{ isToggled, setIsToggled }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
