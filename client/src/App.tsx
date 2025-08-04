import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import QuestionSets from "./pages/QuestionSets";
import Questions from "./pages/Questions";
import Answer from "./pages/Answer";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./pages/Layout";
import NotFound from "./components/common/NotFound";
import { QuestionProvider } from "./questions/QuestionContext";

function App() {
  return (
    <BrowserRouter>
      <QuestionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/question-sets"
              element={
                <PrivateRoute>
                  <QuestionSets />
                </PrivateRoute>
              }
            />
            <Route
              path="/questions"
              element={
                <PrivateRoute>
                  <Questions />
                </PrivateRoute>
              }
            />
            <Route
              path="/answer/:questionId"
              element={
                <PrivateRoute>
                  <Answer />
                </PrivateRoute>
              }
            />
            <Route
              path="/answer/:questionId/:answerId"
              element={
                <PrivateRoute>
                  <Answer />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </QuestionProvider>
    </BrowserRouter>
  );
}

export default App;
