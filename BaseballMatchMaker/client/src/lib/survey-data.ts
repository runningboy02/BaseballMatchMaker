export interface SurveyQuestion {
  id: number;
  title: string;
  options: {
    id: string;
    text: string;
  }[];
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    title: "야구 경기를 관람할 때 어떤 분위기를 좋아하시나요?",
    options: [
      { id: "a", text: "조용하고 집중된 분위기" },
      { id: "b", text: "열정적이고 시끄러운 분위기" },
      { id: "c", text: "가족적이고 따뜻한 분위기" },
      { id: "d", text: "트렌디하고 세련된 분위기" }
    ]
  },
  {
    id: 2,
    title: "어떤 야구팀의 역사를 중요하게 생각하시나요?",
    options: [
      { id: "a", text: "오랜 전통과 역사가 있는 팀" },
      { id: "b", text: "새롭고 혁신적인 팀" },
      { id: "c", text: "지역 사회와 밀착된 팀" },
      { id: "d", text: "화제성이 많은 팀" }
    ]
  },
  {
    id: 3,
    title: "선호하는 경기 스타일은 무엇인가요?",
    options: [
      { id: "a", text: "공격적이고 박진감 넘치는 경기" },
      { id: "b", text: "안정적이고 차분한 경기 운영" },
      { id: "c", text: "전략적이고 지능적인 야구" },
      { id: "d", text: "즐겁고 재미있는 야구" }
    ]
  },
  {
    id: 4,
    title: "팀 응원에서 중요하게 생각하는 것은?",
    options: [
      { id: "a", text: "승부에 대한 열정과 집착" },
      { id: "b", text: "최신 트렌드와 멋진 퍼포먼스" },
      { id: "c", text: "함께하는 동료의식과 유대감" },
      { id: "d", text: "즐거운 분위기와 엔터테인먼트" }
    ]
  },
  {
    id: 5,
    title: "선수들에게 바라는 모습은?",
    options: [
      { id: "a", text: "팬들과의 소통을 중시하는 선수" },
      { id: "b", text: "경기에서 최선을 다하는 열정적인 선수" },
      { id: "c", text: "겸손하고 성실한 모범적인 선수" },
      { id: "d", text: "개성 있고 매력적인 스타 선수" }
    ]
  },
  {
    id: 6,
    title: "경기장에서의 이상적인 하루는?",
    options: [
      { id: "a", text: "경기에만 집중하며 진지하게 관람" },
      { id: "b", text: "최신 시설에서 편안하게 관람" },
      { id: "c", text: "다양한 응원 이벤트에 적극 참여" },
      { id: "d", text: "가족이나 친구들과 즐겁게 관람" }
    ]
  },
  {
    id: 7,
    title: "팀의 어떤 특징이 가장 매력적인가요?",
    options: [
      { id: "a", text: "강한 투수진과 견고한 수비" },
      { id: "b", text: "오랜 전통과 클래식한 매력" },
      { id: "c", text: "젊은 선수들의 패기와 도전 정신" },
      { id: "d", text: "화목한 팀 분위기와 좋은 팀워크" }
    ]
  },
  {
    id: 8,
    title: "야구를 통해 얻고 싶은 것은?",
    options: [
      { id: "a", text: "승부의 스릴과 짜릿함" },
      { id: "b", text: "새로운 경험과 트렌드" },
      { id: "c", text: "스트레스 해소와 재미" },
      { id: "d", text: "소속감과 동료의식" }
    ]
  }
];
