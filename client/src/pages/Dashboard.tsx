import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Assessment as AssessmentIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { useQuestions } from "../questions/QuestionContext";
import { useAuth } from "../auth/useAuth";
import { LowScoreQuestion } from "../questions/questionApi";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state, fetchDashboardStats } = useQuestions();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "success";
    if (score >= 6) return "warning";
    return "error";
  };

  const handleRetryQuestion = (questionId: number) => {
    navigate(`/answer/${questionId}`);
  };

  const handleRefreshStats = () => {
    fetchDashboardStats();
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <Box className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <Card className="mb-8">
          <CardContent>
            <Box className="flex justify-between items-center">
              <Box>
                <Typography
                  variant="h4"
                  className="font-bold text-gray-800 mb-2"
                >
                  Welcome back, {user?.email?.split("@")[0] || "Alex"}! 👋
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Ready to continue your interview preparation journey?
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefreshStats}
                disabled={state.loading}
              >
                Refresh
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="h3" className="font-bold mb-2">
                    {state.dashboardStats?.questionsAnsweredCount || 0}
                  </Typography>
                  <Typography variant="h6" className="opacity-90">
                    Questions Answered
                  </Typography>
                </Box>
                <QuestionAnswerIcon className="text-4xl opacity-80" />
              </Box>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="h3" className="font-bold mb-2">
                    {state.dashboardStats?.averageScore?.toFixed(1) || "0.0"}
                  </Typography>
                  <Typography variant="h6" className="opacity-90">
                    Average Score
                  </Typography>
                </Box>
                <AssessmentIcon className="text-4xl opacity-80" />
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Low Score Questions Section */}
        <Card className="mb-8">
          <CardContent>
            <Box className="flex items-center justify-between mb-6">
              <Typography variant="h5" className="font-bold text-gray-800">
                Questions Needing Improvement
              </Typography>
              <Chip
                icon={<WarningIcon />}
                label={`${
                  state.dashboardStats?.lowScoreQuestions?.length || 0
                } questions`}
                color="warning"
                variant="outlined"
              />
            </Box>

            {state.dashboardStats?.lowScoreQuestions &&
            state.dashboardStats.lowScoreQuestions.length > 0 ? (
              <div className="space-y-4">
                {state.dashboardStats.lowScoreQuestions.map(
                  (question: LowScoreQuestion) => (
                    <Card
                      key={question.questionId}
                      variant="outlined"
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent>
                        <Box className="flex justify-between items-start">
                          <Box className="flex-1">
                            <Typography
                              variant="h6"
                              className="font-semibold text-gray-800 mb-2"
                            >
                              {question.questionText}
                            </Typography>
                            <Box className="flex items-center gap-4 mb-3">
                              <Typography
                                variant="body2"
                                className="text-gray-600"
                              >
                                Submitted: {formatDate(question.submittedAt)}
                              </Typography>
                              <Chip
                                label={`Score: ${question.score}/10`}
                                color={getScoreColor(question.score) as any}
                                size="small"
                              />
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={question.score * 10}
                              color={getScoreColor(question.score) as any}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleRetryQuestion(question.questionId)
                            }
                            startIcon={<RefreshIcon />}
                            sx={{ ml: 2 }}
                          >
                            Retry
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            ) : (
              <Box className="text-center py-8">
                <TrendingUpIcon className="text-4xl text-green-400 mb-4" />
                <Typography variant="h6" className="text-gray-500 mb-2">
                  Great job! No low score questions
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  Keep up the excellent work on your interview preparation
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent>
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Quick Actions
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
                onClick={() => navigate("/questions")}
              >
                <CardContent className="text-center">
                  <QuestionAnswerIcon className="text-3xl text-blue-600 mb-2" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-blue-800"
                  >
                    Practice Questions
                  </Typography>
                  <Typography variant="body2" className="text-blue-600">
                    Start practicing
                  </Typography>
                </CardContent>
              </Card>

              <Card
                className="bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors"
                onClick={() => navigate("/question-sets")}
              >
                <CardContent className="text-center">
                  <AssessmentIcon className="text-3xl text-purple-600 mb-2" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-purple-800"
                  >
                    Question Sets
                  </Typography>
                  <Typography variant="body2" className="text-purple-600">
                    Browse sets
                  </Typography>
                </CardContent>
              </Card>

              <Card
                className="bg-green-50 hover:bg-green-100 cursor-pointer transition-colors"
                onClick={() => navigate("/questions")}
              >
                <CardContent className="text-center">
                  <TrendingUpIcon className="text-3xl text-green-600 mb-2" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-green-800"
                  >
                    Improve Skills
                  </Typography>
                  <Typography variant="body2" className="text-green-600">
                    Focus on weak areas
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
