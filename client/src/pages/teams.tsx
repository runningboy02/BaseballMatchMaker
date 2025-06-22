import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { kboTeams } from "@/lib/team-data";

interface TeamData {
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
}

export default function Teams() {
  const teams = kboTeams;
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-team-blue mb-4"></div>
          <p className="text-lg text-gray-600">팀 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-baseball-green">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-baseball-green mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h1 className="text-3xl font-bold text-gray-800">KBO 리그 팀 정보</h1>
            </div>
            <Link href="/">
              <Button variant="outline">홈으로</Button>
            </Link>
          </div>
          <p className="text-center text-gray-600 mt-2">2025년 시즌 기준 KBO 리그 10개 팀 완전 정보</p>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 py-8">
        {/* Team Summary Cards */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {teams?.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                    
                  ><img 
            src={`https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/emblem/regular/fixed/emblem_${team.logo}.png`}>
          </img>
                  </div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">{team.name}</h3>
                  <p className="text-xs text-gray-600">{team.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Teams Table */}
        <section>
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-3c-.83 0-1.54.5-1.85 1.22L11.74 12H9.5v8H11v2H5v-2h1.5v-8H4.5v-2h7.24l1.91-3.78c.31-.72 1.02-1.22 1.85-1.22h3c.67 0 1.26.34 1.61.89L22 14v6h2v2h-6v-2h2z"/>
                </svg>
                KBO 리그 팀별 대표선수 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">팀</TableHead>
                      <TableHead>팀명</TableHead>
                      <TableHead>연고지</TableHead>
                      <TableHead>홈구장</TableHead>
                      <TableHead>창단</TableHead>
                      <TableHead>우승</TableHead>
                      <TableHead>에이스</TableHead>
                      <TableHead>스타선수</TableHead>
                      <TableHead>감독</TableHead>
                      <TableHead>마스코트</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams?.map((team) => (
                      <TableRow key={team.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                          ><img 
            src={`https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/emblem/regular/fixed/emblem_${team.logo}.png`}>
          </img>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.location}</TableCell>
                        <TableCell>{team.stadium}</TableCell>
                        <TableCell>{team.founded}</TableCell>
                        <TableCell>
                          <span className="font-bold text-yellow-600">{team.championships}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-blue-600">{team.ace}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-red-600">{team.star}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">{team.manager}</span>
                        </TableCell>
                        <TableCell>{team.mascot}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <section className="mt-12 text-center">
          <div className="space-y-4">
            <Link href="/survey">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 mr-4">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                내게 맞는 팀 찾기
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="py-3 px-8 text-lg">
                홈으로 돌아가기
              </Button>
            </Link>
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
          <p className="text-xs text-gray-500">© 2025 Baseball Team Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}