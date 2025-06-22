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
          style={{ backgroundColor: team.color }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
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
