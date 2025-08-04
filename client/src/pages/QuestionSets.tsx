import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  IconButton,
  Fab,
} from "@mui/material";
import { Add as AddIcon, PlayArrow as PlayIcon } from "@mui/icons-material";
import { useQuestions } from "../questions/QuestionContext";
import { QuestionSet, questionSetApi } from "../questions/questionApi";
import {
  questionSetsPage,
  questionSetsContainer,
  questionSetsHeader,
  questionSetsTitle,
  questionSetsSubtitle,
  questionSetsGrid,
  questionSetCard,
  questionSetCardContent,
  questionSetCardHeader,
  questionSetCardTitle,
  questionSetCardBody,
  questionSetCardButton,
  questionSetsEmptyState,
  questionSetsEmptyTitle,
  questionSetsDialogContent,
  questionSetsFab,
  statusChipDraft,
  statusChipPublished,
  gradientButton,
  loadingContainer,
} from "../styles/tailwindStyles";

const QuestionSets: React.FC = () => {
  const navigate = useNavigate();
  const { state, fetchQuestionSets, createQuestionSet } = useQuestions();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    difficulty: "",
    tags: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchQuestionSets();
  }, [fetchQuestionSets]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", type: "", difficulty: "", tags: "", quantity: 1 });
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "quantity"
            ? Number(event.target.value)
            : event.target.value,
      }));
    };

  const handleSubmit = async () => {
    if (
      formData.name &&
      formData.type &&
      formData.difficulty &&
      formData.tags &&
      formData.quantity > 0
    ) {
      await questionSetApi.generate(formData);
      handleCloseDialog();
      fetchQuestionSets();
    }
  };

  const handleQuestionSetClick = (questionSet: QuestionSet) => {
    // Navigate to questions list filtered by this question set
    navigate(`/questions?set=${questionSet.id}`);
  };

  const handlePublish = async (id: number) => {
    await questionSetApi.publish(id);
    fetchQuestionSets();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (state.loading) {
    return (
      <Box className={loadingContainer}>
        <Typography>Loading question sets...</Typography>
      </Box>
    );
  }

  return (
    <Box className={questionSetsPage}>
      <Box className={questionSetsContainer}>
        {/* Header */}
        <Box className={questionSetsHeader}>
          <Typography variant="h4" className={questionSetsTitle}>
            Question Sets
          </Typography>
          <Typography variant="body1" className={questionSetsSubtitle}>
            Practice with curated question sets or create your own
          </Typography>
        </Box>

        {/* Question Sets Grid */}
        <div className={questionSetsGrid}>
          {state.questionSets.map((questionSet) => (
            <Card
              key={questionSet.id}
              className={questionSetCard}
              onClick={() => handleQuestionSetClick(questionSet)}
            >
              <CardContent className={questionSetCardContent}>
                <Box className={questionSetCardHeader}>
                  <Typography variant="h6" className={questionSetCardTitle}>
                    {questionSet.name}
                  </Typography>
                  <Chip
                    label={questionSet.status}
                    size="small"
                    className={
                      questionSet.status === "DRAFT"
                        ? statusChipDraft
                        : statusChipPublished
                    }
                  />
                </Box>
                <Typography variant="body2" className={questionSetCardBody}>
                  <b>Type:</b> {questionSet.type} <br />
                  <b>Difficulty:</b> {questionSet.difficulty} <br />
                  <b>Tags:</b> {questionSet.tags}
                </Typography>
                {questionSet.status === "DRAFT" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePublish(questionSet.id);
                    }}
                    className={questionSetCardButton}
                  >
                    Publish
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {state.questionSets.length === 0 && !state.loading && (
          <Box className={questionSetsEmptyState}>
            <Typography variant="h6" className={questionSetsEmptyTitle}>
              No question sets available
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              className={gradientButton}
            >
              Create Your First Question Set
            </Button>
          </Box>
        )}

        {/* Create Question Set Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Question Set</DialogTitle>
          <DialogContent>
            <Box className={questionSetsDialogContent}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                placeholder="e.g., Java Basics"
              />
              <TextField
                fullWidth
                label="Type"
                value={formData.type}
                onChange={handleInputChange("type")}
                placeholder="e.g., Java Basic"
              />
              <TextField
                fullWidth
                label="Difficulty"
                value={formData.difficulty}
                onChange={handleInputChange("difficulty")}
                placeholder="e.g., Easy, Medium, Hard"
              />
              <TextField
                fullWidth
                label="Tags"
                value={formData.tags}
                onChange={handleInputChange("tags")}
                placeholder="e.g., data types enums"
              />
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange("quantity")}
                inputProps={{ min: 1 }}
                placeholder="Number of questions"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={
                !formData.name ||
                !formData.type ||
                !formData.difficulty ||
                !formData.tags ||
                formData.quantity < 1
              }
              className={gradientButton}
            >
              Generate
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenDialog}
          className={questionSetsFab}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default QuestionSets;
