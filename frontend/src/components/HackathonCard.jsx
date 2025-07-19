import { Users, Trophy } from "lucide-react"

const HackathonCard = ({ hackathon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-full">{hackathon.status}</span>
          <span className="text-sm text-gray-500 font-medium">{hackathon.timeLeft}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{hackathon.title}</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{hackathon.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">{hackathon.teams} teams</span>
          </div>
          <div className="flex items-center text-orange-600 font-bold">
            <Trophy className="w-4 h-4 mr-1" />
            <span className="text-sm">{hackathon.prize}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HackathonCard
