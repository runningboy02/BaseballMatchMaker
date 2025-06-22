import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">진행률</span>
        <span className="text-sm font-medium text-gray-600">
          {currentQuestion}/{totalQuestions}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-3" />
      
      {/* Baseball bases as progress indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: 4 }, (_, index) => {
          const baseLabels = ["홈", "1루", "2루", "3루"];
          const isActive = index <= Math.floor((currentQuestion - 1) / 2);
          
          return (
            <div key={index} className="text-center">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isActive ? "bg-team-blue border-team-blue" : "bg-gray-200 border-gray-300"
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isActive ? "bg-white" : "bg-gray-400"
                }`} />
              </div>
              <p className="text-xs text-gray-600 mt-1">{baseLabels[index]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
