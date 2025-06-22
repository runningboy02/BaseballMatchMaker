import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { surveySubmissionSchema } from "@shared/schema";
import { nanoid } from "nanoid";

// KBO Teams data with scoring weights (정확한 최신 정보)
const kboTeams = {
  kia: {
    name: "KIA 타이거즈",
    location: "광주광역시",
    stadium: "광주-기아 챔피언스 필드",
    founded: "2001년",
    championships: "12회",
    ace: "양현종",
    star: "나성범 (외야수)",
    manager: "이범호",
    mascot: "호걸이",
    traits: { traditional: 3, passionate: 3, family: 2, modern: 1 },
    region: "gwangju",
    color: "#DC2626"
    
  },
  samsung: {
    name: "삼성 라이온즈",
    location: "대구광역시",
    stadium: "대구 삼성 라이온즈 파크",
    founded: "1982년",
    championships: "8회",
    ace: "원태인",
    star: "구자욱 (외야수)",
    manager: "박진만",
    mascot: "블레오",
    traits: { traditional: 3, family: 2, modern: 2, passionate: 1 },
    region: "daegu",
    color: "#1E40AF"
  },
  ssg: {
    name: "SSG 랜더스",
    location: "인천광역시",
    stadium: "인천 SSG 랜더스필드",
    founded: "2000년",
    championships: "5회",
    ace: "구창모",
    star: "최정 (외야수)",
    manager: "이숭용",
    mascot: "랜디",
    traits: { modern: 3, passionate: 2, traditional: 1, family: 2 },
    region: "incheon",
    color: "#DC2626"
  },
  lotte: {
    name: "롯데 자이언츠",
    location: "부산광역시",
    stadium: "부산 사직 야구장",
    founded: "1982년",
    championships: "2회",
    ace: "박세웅",
    star: "전준우 (외야수)",
    manager: "김태형",
    mascot: "윈지, 누리",
    traits: { passionate: 3, family: 3, traditional: 2, modern: 1 },
    region: "busan",
    color: "#000000"
  },
  lg: {
    name: "LG 트윈스",
    location: "서울특별시",
    stadium: "서울종합운동장 잠실 야구장",
    founded: "1990년",
    championships: "3회",
    ace: "임찬규",
    star: "오지환 (내야수)",
    manager: "염경엽",
    mascot: "럭키, 스타",
    traits: { modern: 3, traditional: 2, passionate: 2, family: 1 },
    region: "seoul",
    color: "#C21807"
  },
  hanwha: {
    name: "한화 이글스",
    location: "대전광역시",
    stadium: "대전 한화생명 이글스파크",
    founded: "1986년",
    championships: "1회",
    ace: "문동주",
    star: "노시환 (내야수)",
    manager: "김경문",
    mascot: "위니, 비니",
    traits: { family: 3, passionate: 2, traditional: 1, modern: 2 },
    region: "daejeon",
    color: "#FF6600"
  },
  doosan: {
    name: "두산 베어스",
    location: "서울특별시",
    stadium: "서울종합운동장 잠실 야구장",
    founded: "1982년",
    championships: "6회",
    ace: "곽빈",
    star: "양의지 (포수)",
    manager: "이승엽",
    mascot: "철웅이",
    traits: { traditional: 3, modern: 2, passionate: 2, family: 1 },
    region: "seoul",
    color: "#131230"
  },
  kiwoom: {
    name: "키움 히어로즈",
    location: "서울특별시",
    stadium: "고척 스카이돔",
    founded: "2008년",
    championships: "0회",
    ace: "안우진",
    star: "김혜성 (내야수)",
    manager: "홍원기",
    mascot: "턱돌이",
    traits: { modern: 3, family: 2, passionate: 2, traditional: 1 },
    region: "seoul",
    color: "#570514"
  },
  nc: {
    name: "NC 다이노스",
    location: "창원시",
    stadium: "창원 NC 파크",
    founded: "2011년",
    championships: "1회",
    ace: "구창모",
    star: "박건우 (외야수)",
    manager: "강인권",
    mascot: "단디, 쎄리",
    traits: { modern: 2, family: 2, passionate: 2, traditional: 1 },
    region: "changwon",
    color: "#315288"
  },
  kt: {
    
    name: "kt wiz",
    location: "수원시",
    stadium: "수원 kt 위즈 파크",
    founded: "2013년",
    championships: "1회",
    ace: "고영표",
    star: "강백호 (내야수/지명타자)",
    manager: "이강철",
    mascot: "빅, 또리",
    traits: { modern: 3, family: 2, traditional: 1, passionate: 2 },
    region: "suwon",
    color: "#000000"
  }
};

// Question weights for each trait
const questionWeights = {
  1: { a: { traditional: 2, family: 1 }, b: { passionate: 3, traditional: 1 }, c: { family: 3, traditional: 1 }, d: { modern: 3, passionate: 1 } },
  2: { a: { traditional: 3 }, b: { modern: 3 }, c: { family: 2, passionate: 1 }, d: { passionate: 2, modern: 1 } },
  3: { a: { passionate: 3 }, b: { traditional: 2, family: 1 }, c: { modern: 2, family: 1 }, d: { family: 3 } },
  4: { a: { traditional: 2, passionate: 1 }, b: { modern: 3 }, c: { family: 2, traditional: 1 }, d: { passionate: 2, modern: 1 } },
  5: { a: { family: 3 }, b: { passionate: 3 }, c: { traditional: 2, family: 1 }, d: { modern: 2, passionate: 1 } },
  6: { a: { traditional: 3 }, b: { modern: 3 }, c: { passionate: 2, family: 1 }, d: { family: 2, modern: 1 } },
  7: { a: { passionate: 3 }, b: { traditional: 2, family: 1 }, c: { modern: 2, family: 1 }, d: { family: 3 } },
  8: { a: { traditional: 2 }, b: { modern: 3 }, c: { passionate: 2, family: 1 }, d: { family: 2, modern: 1 } }
};

function calculateRecommendation(answers: Array<{ questionId: number; selectedOption: string }>) {
  const scores = { traditional: 0, passionate: 0, family: 0, modern: 0 };
  
  // Calculate trait scores
  answers.forEach(answer => {
    const weights = questionWeights[answer.questionId as keyof typeof questionWeights];
    if (weights && weights[answer.selectedOption as keyof typeof weights]) {
      const optionWeights = weights[answer.selectedOption as keyof typeof weights];
      Object.entries(optionWeights).forEach(([trait, weight]) => {
        scores[trait as keyof typeof scores] += weight;
      });
    }
  });

  // Find best matching team
  let bestTeam = 'kia';
  let bestScore = 0;

  Object.entries(kboTeams).forEach(([teamId, team]) => {
    let teamScore = 0;
    Object.entries(scores).forEach(([trait, userScore]) => {
      teamScore += userScore * team.traits[trait as keyof typeof team.traits];
    });
    
    if (teamScore > bestScore) {
      bestScore = teamScore;
      bestTeam = teamId;
    }
  });

  // Calculate match percentage (normalize score to 0-100)
  const maxPossibleScore = Object.values(scores).reduce((a, b) => a + b, 0) * 3;
  const matchPercentage = Math.min(Math.round((bestScore / maxPossibleScore) * 100), 100);

  return { teamId: bestTeam, matchPercentage: Math.max(matchPercentage, 75) };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit survey and get recommendation
  app.post("/api/survey/submit", async (req, res) => {
    try {
      const submission = surveySubmissionSchema.parse(req.body);
      
      const { teamId, matchPercentage } = calculateRecommendation(submission.answers);
      const shareId = nanoid(10);
      
      const result = await storage.createSurveyResult({
        answers: submission.answers,
        recommendedTeam: teamId,
        matchPercentage,
        shareId,
      });

      res.json({
        shareId: result.shareId,
        recommendedTeam: kboTeams[teamId as keyof typeof kboTeams],
        matchPercentage: result.matchPercentage,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid survey data" });
    }
  });

  // Get shared result
  app.get("/api/survey/result/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      const result = await storage.getSurveyResultByShareId(shareId);
      
      if (!result) {
        return res.status(404).json({ message: "Result not found" });
      }

      const teamData = kboTeams[result.recommendedTeam as keyof typeof kboTeams];
      
      res.json({
        shareId: result.shareId,
        recommendedTeam: teamData,
        matchPercentage: result.matchPercentage,
        createdAt: result.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all teams info
  app.get("/api/teams", (req, res) => {
    res.json(Object.entries(kboTeams).map(([id, team]) => ({ id, ...team })));
  });

  const httpServer = createServer(app);
  return httpServer;
}
