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
import {
  dashboardPage,
  dashboardContainer,
  dashboardWelcomeCard,
  dashboardWelcomeContent,
  dashboardWelcomeText,
  dashboardWelcomeSubtext,
  dashboardMetricsGrid,
  dashboardMetricCard,
  dashboardMetricContent,
  dashboardMetricNumber,
  dashboardMetricLabel,
  dashboardMetricIcon,
  dashboardLowScoreSection,
  dashboardLowScoreHeader,
  dashboardLowScoreTitle,
  dashboardLowScoreList,
  dashboardLowScoreCard,
  dashboardLowScoreCardContent,
  dashboardLowScoreQuestionText,
  dashboardLowScoreMeta,
  dashboardLowScoreDate,
  dashboardLowScoreEmpty,
  dashboardLowScoreEmptyIcon,
  dashboardLowScoreEmptyTitle,
  dashboardLowScoreEmptySubtext,
  dashboardQuickActions,
  dashboardQuickActionsTitle,
  dashboardQuickActionsGrid,
  dashboardQuickActionCard,
  dashboardQuickActionCardPurple,
  dashboardQuickActionCardGreen,
  dashboardQuickActionContent,
  dashboardQuickActionIcon,
  dashboardQuickActionIconPurple,
  dashboardQuickActionIconGreen,
  dashboardQuickActionTitle,
  dashboardQuickActionTitlePurple,
  dashboardQuickActionTitleGreen,
  dashboardQuickActionSubtext,
  dashboardQuickActionSubtextPurple,
  dashboardQuickActionSubtextGreen,
  performanceColorGreen,
  performanceColorYellow,
  performanceColorRed,
} from "../styles/tailwindStyles";

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
    if (score >= 8) return performanceColorGreen;
    if (score >= 6) return performanceColorYellow;
    return performanceColorRed;
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
    <Box className={dashboardPage}>
      <Box className={dashboardContainer}>
        {/* Welcome Section */}
        <Card className={dashboardWelcomeCard}>
          <CardContent>
            <Box className={dashboardWelcomeContent}>
              <Box>
                <Typography variant="h4" className={dashboardWelcomeText}>
                  Welcome back, {user?.email?.split("@")[0] || "Alex"}! 👋
                </Typography>
                <Typography variant="body1" className={dashboardWelcomeSubtext}>
                  Ready to continue your interview preparation journey?
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefreshStats}
                disabled={state.loading}
                sx={{
                  borderRadius: "12px",
                  borderColor: "#6366f1",
                  color: "#6366f1",
                  "&:hover": {
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(99, 102, 241, 0.04)",
                  },
                }}
              >
                Refresh
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className={dashboardMetricsGrid}>
          <Card className={dashboardMetricCard}>
            <CardContent>
              <Box className={dashboardMetricContent}>
                <Box>
                  <Typography variant="h3" className={dashboardMetricNumber}>
                    {state.dashboardStats?.questionsAnsweredCount || 0}
                  </Typography>
                  <Typography variant="h6" className={dashboardMetricLabel}>
                    Questions Answered
                  </Typography>
                </Box>
                <QuestionAnswerIcon className={dashboardMetricIcon} />
              </Box>
            </CardContent>
          </Card>

          <Card className={dashboardMetricCard}>
            <CardContent>
              <Box className={dashboardMetricContent}>
                <Box>
                  <Typography variant="h3" className={dashboardMetricNumber}>
                    {state.dashboardStats?.averageScore?.toFixed(1) || "0.0"}
                  </Typography>
                  <Typography variant="h6" className={dashboardMetricLabel}>
                    Average Score
                  </Typography>
                </Box>
                <AssessmentIcon className={dashboardMetricIcon} />
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Low Score Questions Section */}
        <Card className={dashboardLowScoreSection}>
          <CardContent>
            <Box className={dashboardLowScoreHeader}>
              <Typography variant="h5" className={dashboardLowScoreTitle}>
                Questions Needing Improvement
              </Typography>
              <Chip
                icon={<WarningIcon />}
                label={`${
                  state.dashboardStats?.lowScoreQuestions?.length || 0
                } questions`}
                color="warning"
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  borderColor: "#f59e0b",
                  color: "#f59e0b",
                  fontWeight: 600,
                }}
              />
            </Box>

            {state.dashboardStats?.lowScoreQuestions &&
            state.dashboardStats.lowScoreQuestions.length > 0 ? (
              <div className={dashboardLowScoreList}>
                {state.dashboardStats.lowScoreQuestions.map(
                  (question: LowScoreQuestion) => (
                    <Card
                      key={question.questionId}
                      variant="outlined"
                      className={dashboardLowScoreCard}
                    >
                      <CardContent>
                        <Box className={dashboardLowScoreCardContent}>
                          <Box className="flex-1">
                            <Typography
                              variant="h6"
                              className={dashboardLowScoreQuestionText}
                            >
                              {question.questionText}
                            </Typography>
                            <Box className={dashboardLowScoreMeta}>
                              <Typography
                                variant="body2"
                                className={dashboardLowScoreDate}
                              >
                                Submitted: {formatDate(question.submittedAt)}
                              </Typography>
                              <Chip
                                label={`Score: ${question.score}/10`}
                                color={getScoreColor(question.score) as any}
                                size="small"
                                sx={{
                                  borderRadius: "8px",
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={question.score * 10}
                              color={getScoreColor(question.score) as any}
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
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleRetryQuestion(question.questionId)
                            }
                            startIcon={<RefreshIcon />}
                            sx={{
                              ml: 2,
                              borderRadius: "12px",
                              background:
                                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                              },
                            }}
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
              <Box className={dashboardLowScoreEmpty}>
                <TrendingUpIcon className={dashboardLowScoreEmptyIcon} />
                <Typography
                  variant="h6"
                  className={dashboardLowScoreEmptyTitle}
                >
                  Great job! No low score questions
                </Typography>
                <Typography
                  variant="body2"
                  className={dashboardLowScoreEmptySubtext}
                >
                  Keep up the excellent work on your interview preparation
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20">
          <CardContent>
            <Typography variant="h5" className={dashboardQuickActionsTitle}>
              Quick Actions
            </Typography>
            <div className={dashboardQuickActionsGrid}>
              <Card
                className={dashboardQuickActionCard}
                onClick={() => navigate("/questions")}
              >
                <CardContent className={dashboardQuickActionContent}>
                  <QuestionAnswerIcon className={dashboardQuickActionIcon} />
                  <Typography
                    variant="h6"
                    className={dashboardQuickActionTitle}
                  >
                    Practice Questions
                  </Typography>
                  <Typography
                    variant="body2"
                    className={dashboardQuickActionSubtext}
                  >
                    Start practicing
                  </Typography>
                </CardContent>
              </Card>

              <Card
                className={dashboardQuickActionCardPurple}
                onClick={() => navigate("/question-sets")}
              >
                <CardContent className={dashboardQuickActionContent}>
                  <AssessmentIcon className={dashboardQuickActionIconPurple} />
                  <Typography
                    variant="h6"
                    className={dashboardQuickActionTitlePurple}
                  >
                    Question Sets
                  </Typography>
                  <Typography
                    variant="body2"
                    className={dashboardQuickActionSubtextPurple}
                  >
                    Browse sets
                  </Typography>
                </CardContent>
              </Card>

              <Card
                className={dashboardQuickActionCardGreen}
                onClick={() => navigate("/questions")}
              >
                <CardContent className={dashboardQuickActionContent}>
                  <TrendingUpIcon className={dashboardQuickActionIconGreen} />
                  <Typography
                    variant="h6"
                    className={dashboardQuickActionTitleGreen}
                  >
                    Improve Skills
                  </Typography>
                  <Typography
                    variant="body2"
                    className={dashboardQuickActionSubtextGreen}
                  >
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
