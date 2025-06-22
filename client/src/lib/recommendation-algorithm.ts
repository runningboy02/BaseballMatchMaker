import { kboTeams } from './team-data';
import type { SurveyAnswer } from './static-storage';

export function calculateRecommendation(answers: SurveyAnswer[]) {
  const teamScores: Record<string, number> = {};
  
  // Initialize scores
  kboTeams.forEach(team => {
    teamScores[team.id] = 0;
  });

  answers.forEach(answer => {
    switch (answer.questionId) {
      case 1: // 좋아하는 야구 스타일
        if (answer.selectedOption === 'power') {
          teamScores['kia'] += 3;
          teamScores['lg'] += 2;
          teamScores['doosan'] += 2;
        } else if (answer.selectedOption === 'speed') {
          teamScores['nc'] += 3;
          teamScores['kiwoom'] += 2;
          teamScores['lotte'] += 2;
        } else if (answer.selectedOption === 'strategy') {
          teamScores['samsung'] += 3;
          teamScores['hanwha'] += 2;
          teamScores['kt'] += 2;
        } else if (answer.selectedOption === 'defense') {
          teamScores['ssg'] += 3;
          teamScores['kiwoom'] += 2;
          teamScores['kt'] += 2;
        }
        break;

      case 2: // 선호하는 지역
        if (answer.selectedOption === 'seoul') {
          teamScores['lg'] += 3;
          teamScores['doosan'] += 3;
          teamScores['kiwoom'] += 3;
        } else if (answer.selectedOption === 'gyeonggi') {
          teamScores['kt'] += 3;
          teamScores['kiwoom'] += 2;
        } else if (answer.selectedOption === 'busan') {
          teamScores['lotte'] += 3;
        } else if (answer.selectedOption === 'daegu') {
          teamScores['samsung'] += 3;
        } else if (answer.selectedOption === 'gwangju') {
          teamScores['kia'] += 3;
        } else if (answer.selectedOption === 'incheon') {
          teamScores['ssg'] += 3;
        } else if (answer.selectedOption === 'daejeon') {
          teamScores['hanwha'] += 3;
        } else if (answer.selectedOption === 'changwon') {
          teamScores['nc'] += 3;
        }
        break;

      case 3: // 팀 역사와 전통
        if (answer.selectedOption === 'very_important') {
          teamScores['samsung'] += 3;
          teamScores['lg'] += 3;
          teamScores['lotte'] += 2;
        } else if (answer.selectedOption === 'somewhat') {
          teamScores['doosan'] += 2;
          teamScores['kia'] += 2;
        } else if (answer.selectedOption === 'new_fresh') {
          teamScores['nc'] += 3;
          teamScores['kiwoom'] += 3;
          teamScores['kt'] += 2;
        }
        break;

      case 4: // 응원 문화
        if (answer.selectedOption === 'loud_energetic') {
          teamScores['lg'] += 3;
          teamScores['kia'] += 2;
          teamScores['lotte'] += 2;
        } else if (answer.selectedOption === 'organized') {
          teamScores['samsung'] += 3;
          teamScores['doosan'] += 2;
        } else if (answer.selectedOption === 'family_friendly') {
          teamScores['nc'] += 3;
          teamScores['kiwoom'] += 2;
          teamScores['hanwha'] += 2;
        } else if (answer.selectedOption === 'unique_creative') {
          teamScores['ssg'] += 3;
          teamScores['kt'] += 2;
        }
        break;

      case 5: // 선수 스타일
        if (answer.selectedOption === 'veteran_experience') {
          teamScores['lg'] += 3;
          teamScores['samsung'] += 2;
          teamScores['doosan'] += 2;
        } else if (answer.selectedOption === 'young_potential') {
          teamScores['nc'] += 3;
          teamScores['kiwoom'] += 2;
          teamScores['kt'] += 2;
        } else if (answer.selectedOption === 'foreign_players') {
          teamScores['kia'] += 3;
          teamScores['ssg'] += 2;
          teamScores['lotte'] += 2;
        } else if (answer.selectedOption === 'balanced_roster') {
          teamScores['hanwha'] += 3;
          teamScores['samsung'] += 2;
        }
        break;

      case 6: // 구장 분위기
        if (answer.selectedOption === 'historic_traditional') {
          teamScores['lg'] += 3;
          teamScores['doosan'] += 3;
          teamScores['samsung'] += 2;
        } else if (answer.selectedOption === 'modern_facilities') {
          teamScores['nc'] += 3;
          teamScores['ssg'] += 3;
          teamScores['kt'] += 2;
        } else if (answer.selectedOption === 'outdoor_natural') {
          teamScores['kia'] += 3;
          teamScores['lotte'] += 2;
          teamScores['hanwha'] += 2;
        } else if (answer.selectedOption === 'unique_character') {
          teamScores['kiwoom'] += 3;
          teamScores['ssg'] += 2;
        }
        break;

      case 7: // 성적과 성과
        if (answer.selectedOption === 'championship_history') {
          teamScores['kia'] += 3;
          teamScores['samsung'] += 2;
          teamScores['lg'] += 2;
        } else if (answer.selectedOption === 'recent_success') {
          teamScores['kia'] += 3;
          teamScores['lg'] += 2;
          teamScores['ssg'] += 2;
        } else if (answer.selectedOption === 'underdog_spirit') {
          teamScores['hanwha'] += 3;
          teamScores['kt'] += 2;
          teamScores['nc'] += 2;
        } else if (answer.selectedOption === 'consistent_performance') {
          teamScores['doosan'] += 3;
          teamScores['samsung'] += 2;
          teamScores['lotte'] += 2;
        }
        break;

      case 8: // 마스코트와 엔터테인먼트
        if (answer.selectedOption === 'cute_mascot') {
          teamScores['hanwha'] += 3;
          teamScores['nc'] += 2;
          teamScores['kiwoom'] += 2;
        } else if (answer.selectedOption === 'cool_character') {
          teamScores['lg'] += 3;
          teamScores['doosan'] += 2;
          teamScores['samsung'] += 2;
        } else if (answer.selectedOption === 'fun_entertainment') {
          teamScores['kia'] += 3;
          teamScores['lotte'] += 2;
          teamScores['ssg'] += 2;
        } else if (answer.selectedOption === 'traditional_focus') {
          teamScores['kt'] += 3;
          teamScores['samsung'] += 2;
        }
        break;
    }
  });

  // Find team with highest score
  let recommendedTeam = kboTeams[0];
  let maxScore = teamScores[kboTeams[0].id];

  kboTeams.forEach(team => {
    if (teamScores[team.id] > maxScore) {
      maxScore = teamScores[team.id];
      recommendedTeam = team;
    }
  });

  // Calculate match percentage (normalize to 0-100%)
  const maxPossibleScore = answers.length * 3; // Each question can give max 3 points
  const matchPercentage = Math.round((maxScore / maxPossibleScore) * 100);

  return {
    recommendedTeam,
    matchPercentage: Math.max(matchPercentage, 65), // Minimum 65% for better UX
  };
}