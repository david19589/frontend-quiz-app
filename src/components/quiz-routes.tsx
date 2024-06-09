import Home from "./home";
import Questions from "./questions";
import { Routes, Route } from "react-router-dom";

function quizRoutes(props: {
  isToggled: boolean;
  showQuestions: boolean;
  setShowQuestions: (status: boolean) => void;
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            isToggled={props.isToggled}
            showQuestions={props.showQuestions}
            setShowQuestions={props.setShowQuestions}
          />
        }
      />
      <Route
        path="quiz/:question"
        element={
          <Questions
            isToggled={props.isToggled}
          />
        }
      />
    </Routes>
  );
}

export default quizRoutes;
