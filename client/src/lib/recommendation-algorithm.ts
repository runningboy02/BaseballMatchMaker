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
        if (answer.selectedOption === 'a') {
          teamScores['kia'] += 3;
teamScores['lg'] += 2;
teamScores['lotte'] += 2;
teamScores['hanwha'] += 1;
        } else if (answer.selectedOption === 'b') {
        teamScores['samsung'] += 3;
teamScores['doosan'] += 3;
teamScores['kt'] += 2;
        } else if (answer.selectedOption === 'c') {
       teamScores['nc'] += 3;
teamScores['kt'] += 3;
teamScores['ssg'] += 2;
        } else if (answer.selectedOption === 'd') {
          teamScores['kiwoom'] += 3;
teamScores['ssg'] += 2;
teamScores['lg'] += 1;
        }
        break;

      case 2: // 선호하는 지역
        if (answer.selectedOption === 'a') {
        teamScores['lg'] += 3;
teamScores['doosan'] += 3;
teamScores['kiwoom'] += 3;
        } else if (answer.selectedOption === 'b') {
       teamScores['kt'] += 3;
teamScores['ssg'] += 3;
        } else if (answer.selectedOption === 'c') {
          teamScores['lotte'] += 3;
        } else if (answer.selectedOption === 'd') {
          teamScores['kia'] += 3;
teamScores['hanwha'] += 3;
        } 
        break;

      case 3: // 팀 역사와 전통
        if (answer.selectedOption === 'a') {
         teamScores['samsung'] += 3;
teamScores['lg'] += 3;
teamScores['doosan'] += 2;
teamScores['kia'] += 2;
teamScores['lotte'] += 2;
        } else if (answer.selectedOption === 'b') {
          teamScores['nc'] += 3;
teamScores['kt'] += 3;
teamScores['kiwoom'] += 2;
teamScores['ssg'] += 2;
        } else if (answer.selectedOption === 'c') {
        teamScores['lotte'] += 3;
teamScores['kia'] += 3;
teamScores['hanwha'] += 2;
teamScores['samsung'] += 1;
        }  else if (answer.selectedOption === 'd') {
          teamScores['hanwha'] += 3;
teamScores['lg'] += 2;
teamScores['kiwoom'] += 2;
        } break;

      case 4: // 응원 문화
        if (answer.selectedOption === 'a') {
         teamScores['lotte'] += 3;
teamScores['kia'] += 3;
teamScores['hanwha'] += 2;
        } else if (answer.selectedOption === 'b') {
         teamScores['lg'] += 3;
teamScores['doosan'] += 3;
teamScores['ssg'] += 2;
        } else if (answer.selectedOption === 'c') {
        teamScores['nc'] += 3;
teamScores['kt'] += 2;
teamScores['kiwoom'] += 2;
        } else if (answer.selectedOption === 'd') {
        teamScores['ssg'] += 3;
teamScores['hanwha'] += 2;
teamScores['lotte'] += 1;
        } break;

      case 5: // 선수 스타일
        if (answer.selectedOption === 'a') {
         teamScores['nc'] += 3;
teamScores['kt'] += 3;
teamScores['kiwoom'] += 2;
        } else if (answer.selectedOption === 'b') {
       teamScores['hanwha'] += 3;
teamScores['doosan'] += 2;
teamScores['lotte'] += 2;
        } else if (answer.selectedOption === 'c') {
         teamScores['samsung'] += 3;
teamScores['lg'] += 3;
teamScores['kia'] += 2;
        } else if (answer.selectedOption === 'd') {
        teamScores['kiwoom'] += 3;
teamScores['lotte'] += 2;
teamScores['lg'] += 2;
teamScores['ssg'] += 1;
        }  break;

      case 6: // 구장 분위기
        if (answer.selectedOption === 'a') {
        teamScores['doosan'] += 3;
teamScores['lg'] += 3;
teamScores['samsung'] += 2;
        } else if (answer.selectedOption === 'b') {
       teamScores['nc'] += 3;
teamScores['ssg'] += 3;
teamScores['kt'] += 3;
        } else if (answer.selectedOption === 'c') {
      teamScores['lotte'] += 3;
teamScores['kia'] += 3;
teamScores['hanwha'] += 2;
        } else if (answer.selectedOption === 'd') {
        teamScores['ssg'] += 3;
teamScores['kt'] += 2;
teamScores['nc'] += 1;
        } break;

      case 7: // 성적과 성과
        if (answer.selectedOption === 'a') {
        teamScores['doosan'] += 3;
teamScores['lg'] += 3;
teamScores['kt'] += 2;
teamScores['samsung'] += 1;
        } else if (answer.selectedOption === 'b') {
      teamScores['kia'] += 3;
teamScores['samsung'] += 3;
teamScores['lotte'] += 2;
teamScores['lg'] += 1;
        } else if (answer.selectedOption === 'c') {
       teamScores['kiwoom'] += 3;
teamScores['nc'] += 3;
teamScores['hanwha'] += 2;
        } else if (answer.selectedOption === 'd') {
        teamScores['ssg'] += 3;
teamScores['kt'] += 2;
teamScores['hanwha'] += 1;
         } break;

      case 8: // 마스코트와 엔터테인먼트
        if (answer.selectedOption === 'a') {
        teamScores['hanwha'] += 3;
teamScores['nc'] += 3;
teamScores['kt'] += 2;
        } else if (answer.selectedOption === 'b') {
     teamScores['lg'] += 3;
teamScores['doosan'] += 3;
teamScores['kiwoom'] += 2;
        } else if (answer.selectedOption === 'c') {
        teamScores['ssg'] += 3;
teamScores['lotte'] += 2;
teamScores['kia'] += 2;
        } else if (answer.selectedOption === 'd') {
        teamScores['samsung'] += 3;
teamScores['kia'] += 2;
        } break;
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
console.log(`Recommended Team: ${recommendedTeam.name}, Match Percentage: ${matchPercentage}%`);
function getRandom(min: number, max: number)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}
  return {
    recommendedTeam,
    matchPercentage: Math.max(matchPercentage, getRandom(50, 65)), // Minimum 65% for better UX
  };
}