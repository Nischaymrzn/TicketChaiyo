import ClientNav from '@/pages/client/_components/ClientNav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import VotingCard from '@/pages/client/_components/VotingCard'
import { votings } from '@/constants/votings'

type FilterType = 'all' | 'award' | 'reality'

interface Voting {
  id: string | number
  type: string
  title: string
  poster: string
  released: string
  director: string
  cast: string
  duration: string
}

const VotingPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all')

  const handleFilterChange = (type: FilterType): void => {
    setFilter(type)
  }

  const filteredMovies: Voting[] =
    filter === 'all' ? votings : votings.filter((voting) => voting.type === filter)

  return (
    <div className="bg-[#13131A] min-h-screen text-gray-100 flex flex-col gap-8 overflow-hidden">
      <ClientNav />
      
      <main className="w-full sm:px-8">
        <p className="text-4xl font-medium px-4"></p>
      
        <div className="flex items-center w-full px-6 text-white gap-8 mt-8 lg:px-10 2xl:px-10 overflow-x-auto sm:overflow-hidden">
          <p className="text-4xl font-medium">Ongoing Events</p>
          <div className="flex items-center gap-4">
            <Button
              className={cn(
                'px-6 py-5 font-medium text-lg border border-gray-500',
                filter === 'all'
                  ? 'bg-[#FFC987] hover:bg-[#f1c692] text-black border-transparent'
                  : 'border-gray-500'
              )}
              onClick={() => handleFilterChange('all')}
            >
              All Events
            </Button>
            <Button
              className={cn(
                'px-6 py-5 font-medium text-lg border border-gray-500',
                filter === 'award' 
                  ? 'bg-[#FFC987] hover:bg-[#f1c692] text-black border-transparent' 
                  : 'border-gray-500'
              )}
              onClick={() => handleFilterChange('award')}
            >
              Awards
            </Button>
            <Button
              className={cn(
                'px-6 py-5 font-medium text-lg border border-gray-500',
                filter === 'reality' 
                  ? 'bg-[#FFC987] hover:bg-[#f1c692] text-black border-transparent' 
                  : 'border-gray-500'
              )}
              onClick={() => handleFilterChange('reality')}
            >
              Reality Shows
            </Button>
          </div>
        </div>

        <section className="grid items-center justify-center w-full grid-cols-1 px-6 text-white sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-5 mt-6 pb-14 lg:px-10 2xl:px-12">
          {filteredMovies.map((voting) => (
            <VotingCard movie={voting} key={voting.id} isDetailed={false} />
          ))}
        </section>

        <section className="grid items-center justify-center w-full grid-cols-1 px-6 text-white sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-5 mt-6 pb-14 lg:px-10 2xl:px-12">
          {filteredMovies.map((voting) => (
            <VotingCard movie={voting} key={voting.id} isDetailed={false} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default VotingPage