import { Link } from 'react-router-dom';

interface Movie {
  id: string | number;
  poster: string;
  title: string;
  type: string;
  released: string;
  director: string;
  cast: string;
  duration: string;
}

interface VotingCardProps {
  movie: Movie;
  isDetailed: boolean;
}

const VotingCard: React.FC<VotingCardProps> = ({ movie, isDetailed }) => {
  return (
    <div className="flex flex-col w-full gap-3 pb-8" key={movie.id}>

      <div className="relative w-full group">
        <img
          src={movie.poster}
          alt={movie.title}
          className="object-cover w-full 2xl:w-[380px] 2xl:h-[435px] border rounded-lg cursor-pointer border-gray-700"
          width={500}
          height={500}
          loading="lazy"
        />

        <p className="absolute top-0 right-0 px-4 py-2 m-4 font-semibold capitalize rounded-md transparent">
          {movie.type}
        </p>

        <Link to="/voting/details">
          <button className="absolute bottom-12 w-[150px] xl:w-[200px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm sm:text-base p-2 rounded-lg px-3 font-medium border bg-[#FFC987] sm:rounded-xl sm:px-8 shadow-md border-red-300 hover:bg-[#e4ad69] transition duration-700 text-black">
            Vote now
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">{movie.title}</p>

        {!isDetailed ? (
          <div className="flex items-center gap-3 text-sm">
            <p>{movie.released}</p>
            <div className="w-2 h-2 rounded-full bg-text-secondary"></div>
            <p>Kathmandu, Nepal</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="font-semibold">Director: </span> {movie.director}
            </p>
            <p>
              <span className="font-semibold">Actors: </span> {movie.cast}
            </p>
            <p>
              <span className="font-semibold">Duration: </span>
              {movie.duration}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingCard;