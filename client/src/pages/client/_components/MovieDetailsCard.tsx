import { useState } from "react"
import ReactPlayer from "react-player"
import { Calendar, Hourglass  } from "lucide-react"
import { format, parseISO } from "date-fns"

export const MovieDetailsCard = (event: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <div className="flex flex-col items-center sm:items-start sm:flex-row gap-2 sm:gap-0 2xl:gap-2 p-4 sm:p-4 md:p-6 2xl:p-12 bg-[#1c1d20] rounded-2xl shadow-xl pt-8 font-outfit">
      <img
        src={event?.cardImage || "/placeholder.svg"}
        alt="poster"
        className="w-[25rem] h-[25rem] ml:w-[30rem] ml:h-[30rem] rounded-3xl shadow-2xl"
      />

      <div className="flex flex-col gap-6 llg:gap-10 p-2 pl-4 lg:px-8 sm:items-start xl:mt-4">
        <h2 className="text-3xl sm:text-4xl sm:pl-2 ml:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-white tracking-wider">
          {event?.title}
        </h2>

        <div className="flex 2xl:gap-10">
   
          <div className="flex-1 md:px-4 sm:pl-1 xl:pr-16">
            <div className="flex flex-wrap gap-2 mb-6">
              {event?.genre.split(",").map((genre: any) => (
                <span
                  key={genre}
                  className="px-5 text-[15px] lg:text-base text-gray-300 py-1 rounded-full bg-[#323336]"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center text-gray-300 mb-6">
              <div className="flex items-center gap-2 pr-4">
                <span className="bg-green-500 text-black px-3 py-1 rounded-xl text-sm font-semibold">
                  <Hourglass className="w-4 xs:w-5" />
                </span>
                <span className="text-gray-400 rounded font-medium text-[15px]">{event?.duration}m</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-blue-400 text-black px-3 py-1 rounded-xl text-sm font-semibold">
                  <Calendar className="w-4 xs:w-5" />
                </span>
                <span className="text-gray-400 rounded font-medium text-[15px]">
                  {format(parseISO(event?.date), "yyyy-MM-dd")}
                </span>
              </div>
            </div>

            <p className="leading-relaxed mb-6 text-gray-400 text-[16px] lg:text-[18px] llg:text-[15.5px] xl:text-[17px] 2xl:text-[18px] tracking-wide pr-2 2xl:pr-10 hidden md:block">
              {event?.description}
            </p>

            <div className="flex space-x-4 mb-4 mt-4 2xl:mt-14">
              <div className="flex">
                <button
                  className="text-sm ml:text-sm 2xl:text-lg p-2 rounded-3xl ml:px-3 font-medium bg-[#FFC987] hover:border-green-400"
                  onClick={handleOpenModal}
                >
                  <span className="text-gray-900 xs:font-md text-sm xl:text-base tracking-wide xs:text-[13px] text-[12px]">
                    WATCH TRAILER
                  </span>
                </button>
                <button
                  className="px-3 py-3 bg-[#FFC987] text-white flex items-center space-x-2 rounded-full"
                  onClick={handleOpenModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="#fffff"
                    stroke="#fffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </button>
              </div>

              <button className="text-[12px] xs:text-[13px] ml:text-sm xl:text-base p-2 rounded-3xl ml:px-3 xs:font-medium border-[#FFC987] border text-white">
                TO WATCHLIST +
              </button>
            </div>
          </div>

          <div className="text-gray-400 flex-col gap-12 2xl:-ml-11 hidden llg:flex">
            <div className="border-t border-gray-600">
              <h3 className="text-lg xl:text-lg 2xl:text-xl text-blue-300 mt-2 tracking-wider">Director</h3>
              <p className="text-sm">{event?.director}</p>
            </div>
            <div className="border-t border-gray-600">
              <h3 className="text-lg xl:text-lg 2xl:text-xl text-blue-300 mt-2 tracking-wider">Writers</h3>
              <p className="text-sm">{event?.cast}</p>
            </div>
            <div className="border-t border-gray-600">
              <h3 className="text-lg xl:text-lg 2xl:text-xl text-blue-300 mt-2 tracking-wider">Venue</h3>
              <p className="text-sm">{event.venue}, Kathmandu</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-6">
          <div className="relative rounded-xl shadow-xl w-[90vw] sm:h-[90vh] h-[50vh] overflow-hidden pt-4 border border-gray-900">
            <button className="absolute -top-[0.25px] right-0 text-white" onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <ReactPlayer
              url={event?.videoUrl}
              controls
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    showinfo: 0,
                  },
                },
              }}
              className=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

