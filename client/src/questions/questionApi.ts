// Question API endpoints with dummy URLs
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  questionSetId?: string;
}

export interface QuestionSet {
  id: number;
  name: string;
  type: string;
  difficulty: string;
  tags: string;
  status: 'DRAFT' | 'PUBLISHED';
  questions: string[];
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  format: 'text' | 'audio' | 'video';
  submittedAt: string;
}

export interface Feedback {
  id: string;
  answerId: string;
  technicalDepth: number;
  clarity: number;
  examples: number;
  overallScore: number;
  comments: string;
  aiFeedback: string;
}

export interface LowScoreQuestion {
  questionId: number;
  questionText: string;
  score: number;
  submittedAt: string;
}

export interface DashboardStats {
  averageScore: number;
  questionsAnsweredCount: number;
  lowScoreQuestions: LowScoreQuestion[];
}

// Question Sets API
export const questionSetApi = {
  // Get all question sets
  getAll: async (): Promise<QuestionSet[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/question-sets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.data;
  },

  // Publish a question set
  publish: async (id: number): Promise<any> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/question-sets/${id}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  // Generate a question set
  generate: async (payload: {
    name: string;
    type: string;
    difficulty: string;
    tags: string;
    quantity: number;
  }): Promise<any> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/question-sets/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  // Get question set by ID
  getById: async (id: string | number): Promise<QuestionSet> => {
    const sets = await questionSetApi.getAll();
    const set = sets.find(s => s.id === Number(id));
    if (!set) throw new Error('Question set not found');
    return set;
  },

  // Create new question set
  create: async (questionSet: Omit<QuestionSet, 'id' | 'createdAt'>): Promise<QuestionSet> => {
    // Mock creation
    return {
      ...questionSet,
      id: Date.now()
    };
  }
};

// Questions API
export const questionApi = {
  // Get all questions with pagination
  getAll: async (page: number = 1, limit: number = 10, difficulty?: string): Promise<{ questions: Question[], total: number }> => {
    const token = localStorage.getItem("token");
    const pageParam = page - 1; // Backend uses 0-based pagination
    const params = new URLSearchParams({
      page: pageParam.toString(),
      size: limit.toString()
    });
    
    if (difficulty && difficulty !== 'all') {
      params.append('difficulty', difficulty.toUpperCase());
    }
    
    const response = await fetch(`${BASE_URL}/questions?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    // Map backend response to frontend Question type
    const questions = (data.data.content || []).map((q: any) => ({
      id: q.id?.toString() || '', // Use real ID from API
      title: q.text || '',
      content: q.text || '',
      category: q.type || '',
      difficulty: q.difficulty || '',
      tags: q.tags ? q.tags.split(' ') : [],
      questionSetId: undefined // Not provided in this API
    }));
    
    return {
      questions,
      total: data.data.totalElements || 0
    };
  },

  // Get questions by question set ID
  getByQuestionSet: async (questionSetId: number): Promise<Question[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/questions/${questionSetId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    // Map backend fields to frontend Question type
    return (data.data || []).map((q: any) => ({
      id: q.id?.toString() || '', // Use real ID from API
      title: q.text || '',
      content: q.text || '',
      category: q.type || '',
      difficulty: q.difficulty || '',
      tags: q.tags ? q.tags.split(' ') : [],
      questionSetId: questionSetId
    }));
  },

  // Update getById to accept number
  getById: async (id: number): Promise<Question> => {
    const token = localStorage.getItem("token");
    
    // Fetch all questions and find the specific one by ID
    const response = await fetch(`${BASE_URL}/questions?page=0&size=100`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !data.data.content) {
      throw new Error("Questions not found");
    }
    
    // Find the specific question by ID
    const allQuestions = data.data.content || [];
    
    // Look for question with matching ID (handle both number and string comparison)
    const foundQuestion = allQuestions.find((q: any) => 
      q.id === id || q.id === id.toString() || Number(q.id) === id
    );
    
    if (!foundQuestion) {
      throw new Error(`Question with ID ${id} not found`);
    }
    
    // Map backend response to frontend Question type
    const question = {
      id: foundQuestion.id?.toString() || id.toString(),
      title: foundQuestion.text || foundQuestion.title || '',
      content: foundQuestion.text || foundQuestion.content || '',
      category: foundQuestion.type || foundQuestion.category || '',
      difficulty: foundQuestion.difficulty || 'Medium',
      tags: foundQuestion.tags ? (typeof foundQuestion.tags === 'string' ? foundQuestion.tags.split(' ') : foundQuestion.tags) : [],
      questionSetId: foundQuestion.questionSetId?.toString()
    };
    
    return question;
  }
};





// Dashboard API
export const dashboardApi = {
  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard stats: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  }
}; 