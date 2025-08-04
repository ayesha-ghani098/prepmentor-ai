const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AnswerResponse {
  id: number;
  text: string;
  fileUrl: string | null;
  answerType: string;
  submittedAt: string;
  questionId: number;
  questionText: string;
  userId: number;
  feedback: string;
  score: number;
  correctness: number;
  completeness: number;
  clarity: number;
}

export const answerApi = {
  // Submit an answer
  submit: async (payload: {
    questionId: number;
    answerType: "TEXT";
    answerText: string;
  }): Promise<AnswerResponse> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data.data;
  },


  // Check if answer exists for a question
  getByQuestion: async (questionId: number): Promise<AnswerResponse | null> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/answers/${questionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    // Handle case where API returns 200 but data is null
    if (data.data === null || !data.data) {
      return null; // No answer found for this question
    }
    
    // Return the answer object directly (not an array)
    return data.data;
  },

}; 