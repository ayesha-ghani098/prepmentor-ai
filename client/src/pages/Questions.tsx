import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useQuestions } from "../questions/QuestionContext";
import { Question } from "../questions/questionApi";
import {
  questionsPage,
  questionsContainer,
  questionsHeader,
  questionsTitle,
  questionsSubtitle,
  questionsFiltersContainer,
  questionsFiltersGrid,
  questionsFiltersCount,
  questionsFiltersCountText,
  questionsList,
  questionCard,
  questionCardHeader,
  questionCardTitle,
  questionCardBody,
  questionCardTags,
  questionsEmptyState,
  questionsEmptyTitle,
  questionsPagination,
  difficultyEasy,
  difficultyMedium,
  difficultyHard,
  difficultyDefault,
  tagCategory,
  tagDefault,
  tagMore,
  gradientButtonHover,
  loadingContainer,
} from "../styles/tailwindStyles";

const Questions: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, fetchQuestions, fetchQuestionsBySet } = useQuestions();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const questionSetId = searchParams.get("set");

  useEffect(() => {
    if (questionSetId) {
      fetchQuestionsBySet(Number(questionSetId));
    } else {
      fetchQuestions(
        currentPage,
        10,
        difficultyFilter !== "all" ? difficultyFilter : undefined
      );
    }
  }, [
    questionSetId,
    currentPage,
    difficultyFilter,
    fetchQuestions,
    fetchQuestionsBySet,
  ]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyFilter(event.target.value);
    // Reset to first page when filter changes
    setCurrentPage(1);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const handleAnswerClick = async (question: Question) => {
    navigate(`/answer/${question.id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return difficultyEasy;
      case "Medium":
        return difficultyMedium;
      case "Hard":
        return difficultyHard;
      default:
        return difficultyDefault;
    }
  };

  const filteredQuestions = state.questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || question.difficulty === difficultyFilter;
    const matchesCategory =
      categoryFilter === "all" || question.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const totalPages = Math.ceil(state.pagination.total / state.pagination.limit);

  if (state.loading) {
    return (
      <Box className={loadingContainer}>
        <Typography>Loading questions...</Typography>
      </Box>
    );
  }

  return (
    <Box className={questionsPage}>
      <Box className={questionsContainer}>
        {/* Header */}
        <Box className={questionsHeader}>
          <Typography variant="h4" className={questionsTitle}>
            Practice Questions
          </Typography>
          <Typography variant="body1" className={questionsSubtitle}>
            {questionSetId
              ? "Questions from selected set"
              : "All available questions for practice"}
          </Typography>
        </Box>

        {/* Filters */}
        <Box className={questionsFiltersContainer}>
          <div className={questionsFiltersGrid}>
            <TextField
              fullWidth
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficultyFilter}
                label="Difficulty"
                onChange={handleDifficultyChange}
              >
                <MenuItem value="all">All Difficulties</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Data Structures">Data Structures</MenuItem>
                <MenuItem value="System Design">System Design</MenuItem>
                <MenuItem value="Behavioral">Behavioral</MenuItem>
                <MenuItem value="Design Patterns">Design Patterns</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
              </Select>
            </FormControl>

            <Box className={questionsFiltersCount}>
              <Typography variant="body2" className={questionsFiltersCountText}>
                {filteredQuestions.length} questions
              </Typography>
            </Box>
          </div>
        </Box>

        {/* Questions List */}
        <div className={questionsList}>
          {filteredQuestions.map((question) => (
            <Card key={question.id} className={questionCard}>
              <CardContent>
                <Box className={questionCardHeader}>
                  <Typography variant="h6" className={questionCardTitle}>
                    {question.title}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleAnswerClick(question)}
                    className={gradientButtonHover}
                  >
                    Answer Question
                  </Button>
                </Box>

                <Typography variant="body2" className={questionCardBody}>
                  {question.content}
                </Typography>

                <Box className={questionCardTags}>
                  <Chip
                    label={question.category}
                    size="small"
                    className={tagCategory}
                  />
                  <Chip
                    label={question.difficulty}
                    size="small"
                    className={getDifficultyColor(question.difficulty)}
                  />
                  {question.tags.slice(0, 2).map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      className={tagDefault}
                    />
                  ))}
                  {question.tags.length > 2 && (
                    <Chip
                      label={`+${question.tags.length - 2} more`}
                      size="small"
                      className={tagMore}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && !state.loading && (
          <Box className={questionsEmptyState}>
            <Typography variant="h6" className={questionsEmptyTitle}>
              No questions found matching your criteria
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm("");
                setDifficultyFilter("all");
                setCategoryFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}

        {/* Pagination */}
        {!questionSetId && totalPages > 1 && (
          <Box className={questionsPagination}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Questions;
