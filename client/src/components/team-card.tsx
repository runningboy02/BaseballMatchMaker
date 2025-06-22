import { KBOTeam } from "@/lib/team-data";

interface TeamCardProps {
  team: KBOTeam;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div 
      className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow border-2 border-transparent hover:border-opacity-50"
      style={{ borderColor: `${team.color}50` }}
    >
      <div className="text-center">
        <div 
          className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
        ><img 
            src={`https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/emblem/regular/fixed/emblem_${team.logo}.png`}>
          </img>
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">{team.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{team.location}</p>
        <div className="text-xs text-gray-500">
          <span className="block">창단: {team.founded}</span>
          <span className="block">우승: {team.championships}</span>
        </div>
      </div>
    </div>
  );
}
