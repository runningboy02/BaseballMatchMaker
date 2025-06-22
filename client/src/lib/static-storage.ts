// Static storage for client-side only functionality
export interface SurveyResult {
  shareId: string;
  recommendedTeam: {
    id: string;
    name: string;
    location: string;
    stadium: string;
    founded: string;
    championships: string;
    ace: string;
    star: string;
    manager: string;
    mascot: string;
    color: string;
    logo: string;
  };
  matchPercentage: number;
  createdAt: string;
}

export interface SurveyAnswer {
  questionId: number;
  selectedOption: string;
}

// Generate random ID for sharing
function generateShareId(): string {
  return Math.random().toString(36).substr(2, 10);
}

// Store result in localStorage
export function storeSurveyResult(result: Omit<SurveyResult, 'shareId' | 'createdAt'>): SurveyResult {
  const shareId = generateShareId();
  const fullResult: SurveyResult = {
    ...result,
    shareId,
    createdAt: new Date().toISOString(),
  };
  
  localStorage.setItem(`survey_result_${shareId}`, JSON.stringify(fullResult));
  return fullResult;
}

// Get result from localStorage
export function getSurveyResult(shareId: string): SurveyResult | null {
  const stored = localStorage.getItem(`survey_result_${shareId}`);
  return stored ? JSON.parse(stored) : null;
}