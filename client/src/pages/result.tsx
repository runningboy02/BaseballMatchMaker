import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSurveyResult, type SurveyResult } from "@/lib/static-storage";



export default function Result() {
  const { shareId } = useParams<{ shareId: string }>();
  const { toast } = useToast();
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (shareId) {
      const surveyResult = getSurveyResult(shareId);
      setResult(surveyResult);
      setIsLoading(false);
    }
  }, [shareId]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `나의 추천 KBO 팀은 ${result?.recommendedTeam.name}! 매칭률 ${result?.matchPercentage}%`;
    
    let shareUrl = "";
    
    switch (platform) {
      case "instagram":
        // Instagram doesn't have direct URL sharing, so copy text to clipboard
        navigator.clipboard.writeText(`${text} ${url}`).then(() => {
          toast({
            title: "텍스트 복사됨",
            description: "Instagram에서 스토리나 게시물에 붙여넣기하세요.",
          });
        });
        return;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크 복사됨",
        description: "결과 링크가 클립보드에 복사되었습니다.",
      });
    } catch {
      toast({
        title: "복사 실패",
        description: "링크 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const getStarRating = (percentage: number) => {
    const stars = Math.round((percentage / 100) * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 mx-1 ${i < stars ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ));
  };

  const getRecommendationReason = (teamName: string) => {
    const reasons = {
      "KIA 타이거즈": "당신은 열정적이고 전통을 중시하는 성향을 보여주셨습니다. KIA 타이거즈는 오랜 역사와 전통을 자랑하며, 팬들의 열정적인 응원으로 유명한 팀입니다.",
      "삼성 라이온즈": "당신은 안정적이고 가족적인 분위기를 선호하시는군요. 삼성 라이온즈는 탄탄한 조직력과 가족 같은 팀 분위기로 많은 사랑을 받고 있습니다.",
      "SSG 랜더스": "당신은 현대적이고 혁신적인 것을 추구하시는 성향입니다. SSG 랜더스는 새로운 도전과 현대적인 야구 문화를 선도하는 팀입니다.",
      "롯데 자이언츠": "당신은 열정적이고 지역 사회와의 유대감을 중시하시는군요. 롯데 자이언츠는 부산 지역의 뜨거운 응원과 끈끈한 팬 문화로 유명합니다.",
      "LG 트윈스": "당신은 세련되고 모던한 스타일을 선호하시는 성향입니다. LG 트윈스는 서울의 대표 팀으로 트렌디한 야구 문화를 만들어가고 있습니다.",
      "한화 이글스": "당신은 따뜻하고 가족적인 분위기를 중요시하시는군요. 한화 이글스는 끈기와 희망, 그리고 팬들과의 소통을 중시하는 팀입니다.",
      "두산 베어스": "당신은 전통과 현대가 조화된 스타일을 선호하시는 성향입니다. 두산 베어스는 오랜 전통과 안정적인 경기력으로 많은 팬들의 사랑을 받고 있습니다.",
      "키움 히어로즈": "당신은 젊고 역동적인 에너지를 선호하시는군요. 키움 히어로즈는 젊은 선수들의 패기와 새로운 도전 정신으로 주목받는 팀입니다.",
      "NC 다이노스": "당신은 균형 잡힌 성향을 보여주셨습니다. NC 다이노스는 창원 지역의 새로운 야구 문화를 만들어가며 꾸준히 발전하는 팀입니다.",
      "KT 위즈": "당신은 혁신적이고 미래지향적인 성향을 가지고 계시는군요. KT 위즈는 최신 기술과 현대적인 야구 철학으로 새로운 변화를 이끌어가는 팀입니다."
    };
    
    return reasons[teamName as keyof typeof reasons] || "당신의 성향과 잘 맞는 팀입니다.";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-team-blue mb-4"></div>
          <p className="text-lg text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">결과를 찾을 수 없습니다</h1>
              <p className="text-sm text-gray-600 mb-4">
                링크가 올바르지 않거나 결과가 만료되었을 수 있습니다.
              </p>
              <Link href="/">
                <Button>홈으로 돌아가기</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        {/* Result Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-team-red">
          {/* Result Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">🎉 추천 결과</h2>
            <p className="text-lg text-white opacity-95 drop-shadow-md">당신에게 딱 맞는 팀을 찾았습니다!</p>
          </div>

          {/* Team Recommendation */}
          <div className="p-8">
            <div className="text-center mb-8">
              {/* Team logo placeholder */}
              <div 
                className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: result.recommendedTeam.color }}
              >
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{result.recommendedTeam.name}</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-team-red mr-2">{result.matchPercentage}%</span>
                <span className="text-gray-600">매칭률</span>
              </div>
              <div className="flex justify-center mb-6">
                {getStarRating(result.matchPercentage)}
              </div>
            </div>

            {/* Team Information Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-team-blue mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                    팀 정보
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><span className="font-medium">창단:</span> {result.recommendedTeam.founded}</li>
                    <li><span className="font-medium">연고지:</span> {result.recommendedTeam.location}</li>
                    <li><span className="font-medium">홈구장:</span> {result.recommendedTeam.stadium}</li>
                    <li><span className="font-medium">우승 횟수:</span> {result.recommendedTeam.championships}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-team-purple mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-3c-.83 0-1.54.5-1.85 1.22L11.74 12H9.5v8H11v2H5v-2h1.5v-8H4.5v-2h7.24l1.91-3.78c.31-.72 1.02-1.22 1.85-1.22h3c.67 0 1.26.34 1.61.89L22 14v6h2v2h-6v-2h2z"/>
                    </svg>
                    대표 선수
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><span className="font-medium">에이스:</span> {result.recommendedTeam.ace}</li>
                    <li><span className="font-medium">타자:</span> {result.recommendedTeam.star}</li>
                    <li><span className="font-medium">감독:</span> {result.recommendedTeam.manager}</li>
                    <li><span className="font-medium">마스코트:</span> {result.recommendedTeam.mascot}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation Reason */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-team-blue mb-8">
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                  </svg>
                  왜 이 팀을 추천했을까요?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {getRecommendationReason(result.recommendedTeam.name)}
                </p>
              </CardContent>
            </Card>

            {/* Share Section */}
            <div className="text-center">
              <h4 className="font-bold text-gray-800 mb-4">결과를 친구들과 공유해보세요!</h4>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Button
                  onClick={() => handleShare("instagram")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </Button>
                <Button
                  onClick={() => handleShare("facebook")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="border-gray-300 hover:border-gray-400"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  링크 복사
                </Button>
              </div>

              <div className="space-y-3">
                <Link href="/survey">
                  <Button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-orange-400">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                    </svg>
                    다시 테스트하기
                  </Button>
                </Link>
                <div className="pt-4">
                  <Link href="/">
                    <Button variant="link" className="text-team-blue hover:text-team-purple font-medium">
                      다른 KBO 팀들도 알아보기
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-xl font-bold">나만의 야구팀 찾기</span>
          </div>
          <p className="text-gray-400 mb-4">KBO 리그 팀 추천 서비스</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">개인정보처리방침</a>
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white">문의하기</a>
          </div>
          <p className="text-xs text-gray-500 mt-4">© 2024 Baseball Team Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
