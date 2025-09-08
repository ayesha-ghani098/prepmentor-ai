import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Divider,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useQuestions } from "../questions/QuestionContext";
import { answerApi, AnswerResponse } from "../questions/answerApi";
import {
  questionsPage,
  questionsContainer,
  questionsHeader,
  questionsTitle,
  loadingContainer,
  answerPage,
  answerContainer,
  answerHeader,
  answerTitle,
  answerGrid,
  answerQuestionCard,
  answerQuestionTitle,
  answerQuestionText,
  answerInputField,
  answerSubmitButton,
  answerErrorText,
  answerFeedbackCard,
  answerFeedbackTitle,
  answerScoreSection,
  answerScoreHeader,
  answerScoreLabel,
  answerScoreProgress,
  answerDivider,
  answerBreakdownTitle,
  answerBreakdownItem,
  answerBreakdownHeader,
  answerBreakdownLabel,
  answerBreakdownValue,
  answerBreakdownProgress,
  answerAiSection,
  answerAiFeedback,
  answerAiText,
  answerReattemptButton,
  scoreColorSuccess,
  scoreColorWarning,
  scoreColorError,
} from "../styles/tailwindStyles";

const Answer: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { state, fetchQuestionById } = useQuestions();

  const [answerText, setAnswerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answerResponse, setAnswerResponse] = useState<AnswerResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [showReattempt, setShowReattempt] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      if (!questionId) return;

      setIsLoading(true);
      setError(null);

      try {
        // First, try to get existing answer
        const existingAnswer = await answerApi.getByQuestion(
          Number(questionId)
        );

        if (existingAnswer) {
          // If answer exists, use it and its question text
          setAnswerResponse(existingAnswer);
          setAnswerText(existingAnswer.text);
        } else {
          // If no answer exists, fetch the question details
          try {
            await fetchQuestionById(Number(questionId));
          } catch (questionError) {
            setError(
              `Failed to load question: ${
                questionError instanceof Error
                  ? questionError.message
                  : "Unknown error"
              }`
            );
          }
        }
      } catch (err) {
        setError("Failed to load question or answer");
        // Try to fetch question as fallback
        try {
          await fetchQuestionById(Number(questionId));
        } catch (fallbackErr) {
          setError(
            `Failed to load question: ${
              fallbackErr instanceof Error
                ? fallbackErr.message
                : "Unknown error"
            }`
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [questionId, fetchQuestionById]);

  const handleSubmit = async () => {
    if (!answerText.trim() || !questionId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await answerApi.submit({
        questionId: Number(questionId),
        answerType: "TEXT",
        answerText: answerText.trim(),
      });
      setAnswerResponse(response);
      setShowReattempt(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReattempt = async () => {
    if (!questionId) return;
    setAnswerResponse(null);
    setAnswerText("");
    setShowReattempt(true);
    setError(null);
    setIsLoading(true);
    try {
      await fetchQuestionById(Number(questionId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load question");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return scoreColorSuccess;
    if (score >= 6) return scoreColorWarning;
    return scoreColorError;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Fair";
    return "Poor";
  };

  // Get question text - prefer from answer response, fallback to current question
  const getQuestionText = () => {
    if (answerResponse?.questionText) {
      return answerResponse.questionText;
    }
    return state.currentQuestion?.title || "Question not available";
  };

  // Check if we have enough data to render
  const hasQuestionData =
    answerResponse?.questionText || state.currentQuestion?.title;

  if (isLoading || state.loading) {
    return (
      <Box className={loadingContainer}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!hasQuestionData) {
    return (
      <Box className={loadingContainer}>
        <Typography>Question not found</Typography>
      </Box>
    );
  }

  return (
    <Box className={answerPage}>
      <Box className={answerContainer}>
        {/* Header */}
        <Box className={answerHeader}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              borderRadius: "12px",
              borderColor: "#6366f1",
              color: "#6366f1",
              "&:hover": {
                borderColor: "#4f46e5",
                backgroundColor: "rgba(99, 102, 241, 0.04)",
              },
            }}
          >
            Back to Questions
          </Button>
          <Typography variant="h4" className={answerTitle}>
            {answerResponse && !showReattempt
              ? "Answer Feedback"
              : "Answer Question"}
          </Typography>
        </Box>

        <div className={answerGrid}>
          {/* Question and Answer Section */}
          <Card className={answerQuestionCard}>
            <CardContent>
              <Typography variant="h6" className={answerQuestionTitle}>
                Question
              </Typography>
              <Typography variant="body1" className={answerQuestionText}>
                {getQuestionText()}
              </Typography>

              <Typography variant="h6" className={answerQuestionTitle}>
                Your Answer
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder="Type your answer here..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                disabled={isSubmitting || (!!answerResponse && !showReattempt)}
                className={answerInputField}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                    },
                  },
                }}
              />

              {(!answerResponse || showReattempt) && (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!answerText.trim() || isSubmitting}
                  className={answerSubmitButton}
                  sx={{
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    },
                    "&:disabled": {
                      background: "rgba(156, 163, 175, 0.3)",
                    },
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Answer"}
                </Button>
              )}

              {error && (
                <Typography color="error" className={answerErrorText}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Feedback Section */}
          {answerResponse && !showReattempt && (
            <Card className={answerFeedbackCard}>
              <CardContent>
                <Typography variant="h6" className={answerFeedbackTitle}>
                  Feedback & Analysis
                </Typography>

                {/* Overall Score */}
                <Box className={answerScoreSection}>
                  <Box className={answerScoreHeader}>
                    <Typography
                      variant="subtitle1"
                      className={answerScoreLabel}
                    >
                      Overall Score
                    </Typography>
                    <Chip
                      label={`${answerResponse.score}/10 - ${getScoreLabel(
                        answerResponse.score
                      )}`}
                      color={getScoreColor(answerResponse.score) as any}
                      sx={{
                        borderRadius: "12px",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.score * 10}
                    color={getScoreColor(answerResponse.score) as any}
                    sx={{
                      height: 10,
                      borderRadius: 6,
                      backgroundColor: "rgba(156, 163, 175, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 6,
                      },
                    }}
                  />
                </Box>

                <Divider className={answerDivider} />

                {/* Detailed Scores */}
                <Typography
                  variant="subtitle2"
                  className={answerBreakdownTitle}
                >
                  Detailed Breakdown
                </Typography>

                <Box className={answerBreakdownItem}>
                  <Box className={answerBreakdownHeader}>
                    <Typography
                      variant="body2"
                      className={answerBreakdownLabel}
                    >
                      Correctness
                    </Typography>
                    <Typography
                      variant="body2"
                      className={answerBreakdownValue}
                    >
                      {answerResponse.correctness}/10
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.correctness * 10}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(156, 163, 175, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box className={answerBreakdownItem}>
                  <Box className={answerBreakdownHeader}>
                    <Typography
                      variant="body2"
                      className={answerBreakdownLabel}
                    >
                      Completeness
                    </Typography>
                    <Typography
                      variant="body2"
                      className={answerBreakdownValue}
                    >
                      {answerResponse.completeness}/10
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.completeness * 10}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(156, 163, 175, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box className={answerBreakdownItem}>
                  <Box className={answerBreakdownHeader}>
                    <Typography
                      variant="body2"
                      className={answerBreakdownLabel}
                    >
                      Clarity
                    </Typography>
                    <Typography
                      variant="body2"
                      className={answerBreakdownValue}
                    >
                      {answerResponse.clarity}/10
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.clarity * 10}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(156, 163, 175, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Divider className={answerDivider} />

                {/* AI Feedback */}
                <Typography variant="subtitle2" className={answerAiSection}>
                  AI Recommendations
                </Typography>
                <Paper variant="outlined" className={answerAiFeedback}>
                  <Typography variant="body2" className={answerAiText}>
                    {answerResponse.feedback}
                  </Typography>
                </Paper>

                {/* Reattempt Button */}
                <Button
                  variant="outlined"
                  onClick={handleReattempt}
                  className={answerReattemptButton}
                  sx={{
                    borderRadius: "12px",
                    borderColor: "#10b981",
                    color: "#10b981",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#059669",
                      backgroundColor: "rgba(16, 185, 129, 0.04)",
                    },
                  }}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default Answer;
