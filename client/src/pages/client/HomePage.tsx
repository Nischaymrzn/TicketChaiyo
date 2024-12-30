import ClientNav from './_components/ClientNav'
import MovieCard from './_components/MovieCard'
import Slider from '@/components/Slider'
import React from 'react'
import {movies} from "@/constants/movies"
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Movie {
  id: number;
  title: string;
  type: string;
  released: string;
  duration: string;
  genre: string; 
  director: string;
  cast: string;
  poster: string;
  ticketPriceNormal: string;
  ticketPriceVip: string;
}

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all'); // State to manage the current filter

  const handleFilterChange = (type: string): void => {
    setFilter(type);
  };

  const filteredMovies : Movie[] =
    filter === 'all' ? movies : movies.filter((movie) => movie.type === filter);

  
  return (
    <div className='flex flex-col bg-[#13131A] overflow-hidden'>
       <ClientNav />
       <Slider />
      <main className="w-full sm:px-8">
      
      <div className="flex items-center w-full px-6 text-white gap-8 mt-8  lg:px-10 2xl:px-10 overflow-x-auto sm:overflow-hidden">
        <p className='text-4xl font-medium'>Ongoing  Events</p>
        <div className='flex items-center gap-4'>

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
                filter === 'movie' ? 'bg-[#FFC987] hover:bg-[#f1c692] text-black border-transparent' : 'border-gray-500'
              )}
              onClick={() => handleFilterChange('movie')}
            >
              Movies
            </Button>
            <Button
              className={cn(
                'px-6 py-5 font-medium text-lg border border-gray-500',
                filter === 'concert' ? 'bg-[#FFC987] hover:bg-[#f1c692] text-black border-transparent' : 'border-gray-500'
              )}
              onClick={() => handleFilterChange('concert')}
            >
              Concert
            </Button>

        </div>
        

      </div>
      <section className="grid items-center justify-center w-full grid-cols-1 px-6 text-white sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-5 mt-6 pb-14 lg:px-10 2xl:px-12">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} isDetailed={false} />
        ))}
      </section>

      <section className="grid items-center justify-center w-full grid-cols-1 px-6 text-white sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-5 mt-6 pb-14 lg:px-10 2xl:px-12">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} isDetailed={false} />
        ))}
      </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

