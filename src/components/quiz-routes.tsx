import Home from "./home";
import Questions from "./questions";
import { Routes, Route } from "react-router-dom";

function QuizRoutes(props: {
  showQuestions: boolean;
  setShowQuestions: (status: boolean) => void;
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            showQuestions={props.showQuestions}
            setShowQuestions={props.setShowQuestions}
          />
        }
      />
      <Route path="quiz/:question" element={<Questions />} />
    </Routes>
  );
}

export default QuizRoutes;
