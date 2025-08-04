import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import {
  Question,
  QuestionSet,
  DashboardStats,
  questionSetApi,
  questionApi,
  dashboardApi,
} from "./questionApi";

// State interface
interface QuestionState {
  questionSets: QuestionSet[];
  questions: Question[];
  currentQuestion: Question | null;
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Action types
type QuestionAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_QUESTION_SETS"; payload: QuestionSet[] }
  | { type: "SET_QUESTIONS"; payload: { questions: Question[]; total: number } }
  | { type: "SET_CURRENT_QUESTION"; payload: Question | null }
  | { type: "SET_DASHBOARD_STATS"; payload: DashboardStats }
  | {
      type: "SET_PAGINATION";
      payload: { page: number; limit: number; total: number };
    }
  | { type: "ADD_QUESTION_SET"; payload: QuestionSet };

// Initial state
const initialState: QuestionState = {
  questionSets: [],
  questions: [],
  currentQuestion: null,
  dashboardStats: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Reducer
const questionReducer = (
  state: QuestionState,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_QUESTION_SETS":
      return { ...state, questionSets: action.payload };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: Array.isArray(action.payload.questions)
          ? action.payload.questions
          : [],
      };
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: action.payload };
    case "SET_DASHBOARD_STATS":
      return { ...state, dashboardStats: action.payload };
    case "SET_PAGINATION":
      return { ...state, pagination: action.payload };
    case "ADD_QUESTION_SET":
      return {
        ...state,
        questionSets: [...state.questionSets, action.payload],
      };
    default:
      return state;
  }
};

// Context interface
interface QuestionContextType {
  state: QuestionState;
  // Question Sets
  fetchQuestionSets: () => Promise<void>;
  createQuestionSet: (
    questionSet: Omit<QuestionSet, "id" | "createdAt">
  ) => Promise<void>;
  // Questions
  fetchQuestions: (
    page?: number,
    limit?: number,
    difficulty?: string
  ) => Promise<void>;
  fetchQuestionsBySet: (questionSetId: number) => Promise<void>;
  fetchQuestionById: (id: number) => Promise<void>;
  // Dashboard
  fetchDashboardStats: () => Promise<void>;
  // Utility
  clearError: () => void;
  clearCurrentQuestion: () => void;
}

// Create context
const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

// Provider component
interface QuestionProviderProps {
  children: ReactNode;
}

export const QuestionProvider: React.FC<QuestionProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);

  // Question Sets
  const fetchQuestionSets = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      const questionSets = await questionSetApi.getAll();
      dispatch({ type: "SET_QUESTION_SETS", payload: questionSets });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to fetch question sets",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const createQuestionSet = useCallback(
    async (questionSet: Omit<QuestionSet, "id" | "createdAt">) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const newQuestionSet = await questionSetApi.create(questionSet);
        dispatch({ type: "ADD_QUESTION_SET", payload: newQuestionSet });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Failed to create question set",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    []
  );

  // Questions
  const fetchQuestions = useCallback(
    async (page: number = 1, limit: number = 10, difficulty?: string) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const result = await questionApi.getAll(page, limit, difficulty);
        dispatch({ type: "SET_QUESTIONS", payload: result });
        dispatch({
          type: "SET_PAGINATION",
          payload: { page, limit, total: result.total },
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Failed to fetch questions",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    []
  );

  const fetchQuestionsBySet = useCallback(async (questionSetId: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      const questions = await questionApi.getByQuestionSet(questionSetId);
      dispatch({
        type: "SET_QUESTIONS",
        payload: { questions, total: questions.length },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to fetch questions",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const fetchQuestionById = useCallback(async (id: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      const question = await questionApi.getById(id);
      dispatch({ type: "SET_CURRENT_QUESTION", payload: question });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to fetch question",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Dashboard
  const fetchDashboardStats = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      const stats = await dashboardApi.getStats();
      dispatch({ type: "SET_DASHBOARD_STATS", payload: stats });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to fetch dashboard stats",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Utility functions
  const clearError = useCallback(
    () => dispatch({ type: "SET_ERROR", payload: null }),
    []
  );
  const clearCurrentQuestion = useCallback(
    () => dispatch({ type: "SET_CURRENT_QUESTION", payload: null }),
    []
  );

  const value: QuestionContextType = {
    state,
    fetchQuestionSets,
    createQuestionSet,
    fetchQuestions,
    fetchQuestionsBySet,
    fetchQuestionById,
    fetchDashboardStats,
    clearError,
    clearCurrentQuestion,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

// Custom hook
export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionProvider");
  }
  return context;
};
