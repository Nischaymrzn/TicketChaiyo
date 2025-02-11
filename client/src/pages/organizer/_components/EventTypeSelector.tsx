import { Button } from "@/components/ui/button"

interface EventTypeSelectorProps {
  onSelect: (type: "MOVIE" | "CONCERT") => void
}

export function EventTypeSelector({ onSelect }: EventTypeSelectorProps) {
  return (
    <div className="flex flex-col items-center space-y-6 py-8 bg-[#1C1C24] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-2">Select Event Type</h2>
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Button
          variant="outline"
          size="lg"
          className="h-14 bg-[#1C1C24] border-[#2E2E3A] text-white hover:text-white text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-[#2A2A35]"
          onClick={() => onSelect("MOVIE")}
        >
          Movie
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-14 bg-[#1C1C24] border-[#2E2E3A] text-white hover:text-white text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-[#2A2A35]"
          onClick={() => onSelect("CONCERT")}
        >
          Concert
        </Button>
      </div>
    </div>
  )
}

