import Image from 'next/image';

type TabsContainerProps = {
  activeTab: number;
  setActiveTab: (index: number) => void;
  levels: { comingSoon?: boolean }[];
};

const TabsContainer = ({ activeTab, setActiveTab, levels }: TabsContainerProps) => {
  const tabLabels = ['Discover', 'Immerse', 'Innovate'];

  const imagePaths = [
    '/images/youngsters/discover.svg',
    '/images/youngsters/immerse.svg',
    '/images/youngsters/innovate.svg',
  ];

  const mobileImagePaths = [
    '/images/youngsters/discover-mob2.webp',
    '/images/youngsters/immerse-mob2.webp',
    '/images/youngsters/innovate-mob2.webp',
  ];

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4">
      {/* Desktop Tabs */}
      <div className="hidden md:grid mt-10 grid-cols-3 gap-8 justify-items-center">
        {tabLabels.map((tab, idx) => {
          const isComingSoon = levels[idx]?.comingSoon;
          const isActive = activeTab === idx;

          return (
            <div
              key={tab}
              className={`text-center w-[400px] rounded-t-lg p-4 -mb-px border border-transparent ${
                !isComingSoon ? 'hover:border-white' : ''
              } transition-all duration-300`}
            >
              <div className={`relative w-full h-[400px] ${isComingSoon ? 'grayscale' : ''}`}>
                <Image
                  src={imagePaths[idx]}
                  alt={tab}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {!isComingSoon ? (
                isActive ? (
                  <span className="arrowTab block mt-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80" className="mx-auto">
                      <path d="M12 15.5l-6.5-6.5-1.5 1.5 8 8 8-8-1.5-1.5z" fill="#E0592A" />
                    </svg>
                  </span>
                ) : (
                  <button
                    className="bg-[#FD661F] text-white mt-6 px-6 py-2 rounded-md"
                    onClick={() => setActiveTab(idx)}
                  >
                    More Details
                  </button>
                )
              ) : (
                <p className="text-[#FD661F] mt-6">Coming Soon</p>
              )}
            </div>
          );
        })}
      </div>

{/* Mobile Tabs */}
<div className="flex justify-center gap-6 mt-6 md:hidden">
  {tabLabels.map((tab, idx) => {
    const isComingSoon = levels[idx]?.comingSoon;
    const isActive = activeTab === idx;

    return (
      <div key={tab} className="flex flex-col items-center space-y-2 relative">
        <button
          onClick={() => !isComingSoon && setActiveTab(idx)}
          className={`relative w-[100px] h-[100px] rounded-full overflow-hidden shadow-md ${
            isActive ? 'ring-4 ring-orange-500 scale-105' : ''
          } ${isComingSoon ? 'grayscale opacity-60 cursor-not-allowed' : ''}`}
        >
          <Image
            src={mobileImagePaths[idx]}
            alt={tab}
            fill
            className="object-cover"
          />
        </button>
        {!isComingSoon ? (
          isActive ? (
            <span className="mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                className="mx-auto"
              >
                <path
                  d="M12 15.5l-6.5-6.5-1.5 1.5 8 8 8-8-1.5-1.5z"
                  fill="#E0592A"
                />
              </svg>
            </span>
          ) : (
            <button
              className="bg-[#FD661F] text-white text-sm font-semibold px-4 py-2 rounded-md"
              onClick={() => setActiveTab(idx)}
            >
              More Details
            </button>
          )
        ) : (
          <p className="text-[#FD661F] text-sm font-semibold">Coming Soon</p>
        )}
      </div>
    );
  })}
</div>
    </div>
  );
};

export default TabsContainer;
