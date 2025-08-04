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

  const handleReattempt = () => {
    setAnswerResponse(null);
    setAnswerText("");
    setShowReattempt(true);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "success";
    if (score >= 6) return "warning";
    return "error";
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
    <Box className={questionsPage}>
      <Box className={questionsContainer}>
        {/* Header */}
        <Box className={questionsHeader}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Back to Questions
          </Button>
          <Typography variant="h4" className={questionsTitle}>
            {answerResponse && !showReattempt
              ? "Answer Feedback"
              : "Answer Question"}
          </Typography>
        </Box>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question and Answer Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Question
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {getQuestionText()}
              </Typography>

              <Typography variant="h6" gutterBottom>
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
                sx={{ mb: 2 }}
              />

              {(!answerResponse || showReattempt) && (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!answerText.trim() || isSubmitting}
                  sx={{ mb: 2 }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Answer"}
                </Button>
              )}

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Feedback Section */}
          {answerResponse && !showReattempt && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Feedback & Analysis
                </Typography>

                {/* Overall Score */}
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1">Overall Score</Typography>
                    <Chip
                      label={`${answerResponse.score}/10 - ${getScoreLabel(
                        answerResponse.score
                      )}`}
                      color={getScoreColor(answerResponse.score) as any}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.score * 10}
                    color={getScoreColor(answerResponse.score) as any}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Detailed Scores */}
                <Typography variant="subtitle2" gutterBottom>
                  Detailed Breakdown
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Correctness</Typography>
                    <Typography variant="body2">
                      {answerResponse.correctness}/10
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.correctness * 10}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Completeness</Typography>
                    <Typography variant="body2">
                      {answerResponse.completeness}/10
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.completeness * 10}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Clarity</Typography>
                    <Typography variant="body2">
                      {answerResponse.clarity}/10
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={answerResponse.clarity * 10}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* AI Feedback */}
                <Typography variant="subtitle2" gutterBottom>
                  AI Recommendations
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, backgroundColor: "#f8f9fa", mb: 2 }}
                >
                  <Typography variant="body2">
                    {answerResponse.feedback}
                  </Typography>
                </Paper>

                {/* Reattempt Button */}
                <Button variant="outlined" onClick={handleReattempt} fullWidth>
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
