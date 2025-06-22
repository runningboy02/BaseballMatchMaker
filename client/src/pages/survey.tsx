import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/progress-bar";
import { surveyQuestions } from "@/lib/survey-data";
import { useToast } from "@/hooks/use-toast";
import { storeSurveyResult, type SurveyAnswer } from "@/lib/static-storage";
import { calculateRecommendation } from "@/lib/recommendation-algorithm";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState(surveyQuestions);
  const [shuffledOptions, setShuffledOptions] = useState<Record<number, any[]>>({});
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Shuffle questions and options on component mount
  useEffect(() => {
    const shuffled = shuffleArray(surveyQuestions);
    setShuffledQuestions(shuffled);
    
    // Create shuffled options for each question
    const optionsMap: Record<number, any[]> = {};
    shuffled.forEach(question => {
      optionsMap[question.id] = shuffleArray(question.options);
    });
    setShuffledOptions(optionsMap);
  }, []);

  const handleSubmit = () => {
    const answers: SurveyAnswer[] = Object.entries(selectedAnswers).map(([questionId, selectedOption]) => ({
      questionId: parseInt(questionId),
      selectedOption
    }));

    try {
      const recommendation = calculateRecommendation(answers);
      const result = storeSurveyResult(recommendation);
      setLocation(`/result/${result.shareId}`);
    } catch (error) {
      toast({
        title: "오류",
        description: "설문조사 제출 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const totalQuestions = shuffledQuestions.length;
  const selectedOption = selectedAnswers[currentQuestion.id];

  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const isNextDisabled = !selectedOption;
  const isPreviousDisabled = currentQuestionIndex === 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-baseball-green">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <svg className="w-8 h-8 text-baseball-green mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">나만의 야구팀 찾기</h1>
            <svg className="w-8 h-8 text-baseball-green ml-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-center text-gray-600 mt-2">설문조사로 알아보는 당신에게 딱 맞는 KBO 팀!</p>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ProgressBar currentQuestion={currentQuestionIndex + 1} totalQuestions={totalQuestions} />

        {/* Question Card */}
        <Card className="bg-white rounded-2xl shadow-xl border-t-4 border-team-orange">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Q{currentQuestion.id}. {currentQuestion.title}
            </h3>
            
            <div className="space-y-4">
              {(shuffledOptions[currentQuestion.id] || currentQuestion.options).map((option) => {
                const isSelected = selectedOption === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group ${
                      isSelected
                        ? "border-team-blue bg-blue-50"
                        : "border-gray-200 hover:border-team-blue hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        isSelected
                          ? "border-team-blue"
                          : "border-gray-300 group-hover:border-team-blue"
                      }`}>
                        <div className={`w-3 h-3 rounded-full bg-team-blue transition-opacity ${
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`} />
                      </div>
                      <span className={`text-lg font-medium ${
                        isSelected
                          ? "text-team-blue"
                          : "text-gray-700 group-hover:text-team-blue"
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={isPreviousDisabled}
                variant="outline"
                className="px-6 py-3"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                이전
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="px-6 py-3 bg-team-blue hover:bg-blue-700"
              >
                {currentQuestionIndex === totalQuestions - 1 ? (
                  "결과 보기"
                ) : (
                  <>
                    다음
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
