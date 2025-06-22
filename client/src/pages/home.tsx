import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TeamCard from "@/components/team-card";
import { kboTeams } from "@/lib/team-data";

export default function Home() {
  const teams = kboTeams;

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
        {/* Welcome Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-team-blue">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Baseball stadium with crowd" 
              className="rounded-xl shadow-lg w-full h-48 object-cover mb-6" 
            />
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">⚾ 당신의 운명의 팀을 찾아보세요!</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              간단한 설문조사를 통해 당신의 성향과 가장 잘 맞는 KBO 리그 팀을 추천해드립니다.<br />
              총 <span className="font-bold text-team-blue">8개의 질문</span>에 답하시면 됩니다.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-green-50 border-2 border-green-200">
                <CardContent className="p-6 text-center">
                  <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-3c-.83 0-1.54.5-1.85 1.22L11.74 12H9.5v8H11v2H5v-2h1.5v-8H4.5v-2h7.24l1.91-3.78c.31-.72 1.02-1.22 1.85-1.22h3c.67 0 1.26.34 1.61.89L22 14v6h2v2h-6v-2h2z"/>
                  </svg>
                  <h3 className="font-bold text-gray-800 mb-2">성향 분석</h3>
                  <p className="text-sm text-gray-600">당신의 야구 관람 스타일과 성격을 분석합니다</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <h3 className="font-bold text-gray-800 mb-2">지역 연고</h3>
                  <p className="text-sm text-gray-600">거주지역과 팀의 연고지를 고려합니다</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-2 border-purple-200">
                <CardContent className="p-6 text-center">
                  <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <h3 className="font-bold text-gray-800 mb-2">플레이 스타일</h3>
                  <p className="text-sm text-gray-600">선호하는 팀의 경기 스타일을 파악합니다</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/survey">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-xl text-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  설문조사 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Team Info Section */}
        <section className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-baseball-green">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              <svg className="w-8 h-8 text-yellow-500 inline mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 5h5.5l1.5 5 1.5-5H17l-2 11H5zm2.5-7H9l-.5 2h1.5l.5-2h1.5L11 13H8L9.5 9z"/>
              </svg>
              KBO 리그 팀 소개
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams?.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/teams">
                <Button variant="outline" className="px-6 py-3">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                  </svg>
                  전체 팀 정보 표로 보기
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
