# KBO Team Finder - Static Version

이 프로젝트는 한국 프로야구(KBO) 팬들을 위한 팀 추천 웹사이트의 정적 버전입니다.

## 특징

- 8가지 질문으로 구성된 개인화된 설문조사
- KBO 10개 팀 정보 제공
- 팀 추천 알고리즘
- 결과 공유 기능 (Instagram, Facebook, 링크 복사)
- 반응형 디자인
- 100% 클라이언트 사이드 - 서버 불필요

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Wouter (라우팅)
- localStorage (데이터 저장)

## 설치 및 실행

### 개발 환경
```bash
npm install
npm run dev
```

### 빌드
```bash
npm run build
```

### 미리보기
```bash
npm run preview
```

## 프로젝트 구조

```
client/
├── src/
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── lib/               # 유틸리티 및 데이터
│   │   ├── team-data.ts   # KBO 팀 정보
│   │   ├── survey-data.ts # 설문조사 질문
│   │   ├── static-storage.ts # localStorage 관리
│   │   └── recommendation-algorithm.ts # 추천 알고리즘
│   └── App.tsx            # 메인 앱 컴포넌트
└── index.html             # HTML 템플릿
```

## 배포

이 정적 웹사이트는 다음 플랫폼에 쉽게 배포할 수 있습니다:

- Netlify
- Vercel
- GitHub Pages
- Replit Static Hosting

빌드된 `dist` 폴더를 업로드하면 됩니다.

## 데이터 저장

- 설문조사 결과는 브라우저의 localStorage에 저장됩니다
- 공유 링크는 고유한 ID를 통해 접근 가능합니다
- 데이터는 브라우저별로 관리되며 서버 없이 동작합니다

## 추천 알고리즘

설문조사 답변을 바탕으로 각 팀에 점수를 부여하여 가장 적합한 팀을 추천합니다:

1. 야구 스타일 선호도
2. 지역적 선호도
3. 팀 역사와 전통 중요도
4. 응원 문화 선호도
5. 선수 스타일 선호도
6. 구장 분위기 선호도
7. 성적과 성과 중요도
8. 마스코트와 엔터테인먼트 선호도