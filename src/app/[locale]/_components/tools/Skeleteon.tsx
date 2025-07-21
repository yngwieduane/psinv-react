import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props:any) => (
    <>
    <div className="relative flex flex-col gap-5 lg:flex-row rounded-lg w-full border border-gray-300 p-2 items-center bg-white animate-pulse">
      <div className="relative w-full h-52 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
        <div className="absolute inset-0 rounded-2xl bg-gray-200"></div>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-x-4 text-xs">
          <div className="rounded-full bg-gray-200 px-3 py-1.5"></div>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-0 text-lg/6 font-semibold text-gray-200">
            <div className="h-6 bg-gray-200 rounded"></div>
          </h3>
          <p className="mt-2 md:mt-5 text-normal/6 text-gray-200 truncate h-4 bg-gray-200 rounded"></p>
          <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-200 h-4 bg-gray-200 rounded"></p>
        </div>
        <div className="mt-2 md:mt-6">
          <div className="grid grid-cols-2 items-center content-center">
            <div className="relative flex items-center gap-x-4">
              <div className="text-sm/6 hidden md:grid">
                <p className="h-4 bg-gray-200 rounded"></p>
                <p className="font-normal text-xl h-6 bg-gray-200 rounded"></p>
                <p className="hidden text-gray-200 h-4 bg-gray-200 rounded"></p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-gray-200 px-5 py-3 rounded-lg text-lg"></div>
              <button type="button" className="bg-gray-200 px-5 py-3 rounded-lg text-lg"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative flex flex-col gap-5 lg:flex-row rounded-lg w-full border border-gray-300 p-2 items-center bg-white animate-pulse">
      <div className="relative w-full h-52 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
        <div className="absolute inset-0 rounded-2xl bg-gray-200"></div>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-x-4 text-xs">
          <div className="rounded-full bg-gray-200 px-3 py-1.5"></div>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-0 text-lg/6 font-semibold text-gray-200">
            <div className="h-6 bg-gray-200 rounded"></div>
          </h3>
          <p className="mt-2 md:mt-5 text-normal/6 text-gray-200 truncate h-4 bg-gray-200 rounded"></p>
          <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-200 h-4 bg-gray-200 rounded"></p>
        </div>
        <div className="mt-2 md:mt-6">
          <div className="grid grid-cols-2 items-center content-center">
            <div className="relative flex items-center gap-x-4">
              <div className="text-sm/6 hidden md:grid">
                <p className="h-4 bg-gray-200 rounded"></p>
                <p className="font-normal text-xl h-6 bg-gray-200 rounded"></p>
                <p className="hidden text-gray-200 h-4 bg-gray-200 rounded"></p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-gray-200 px-5 py-3 rounded-lg text-lg"></div>
              <button type="button" className="bg-gray-200 px-5 py-3 rounded-lg text-lg"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative flex flex-col gap-5 lg:flex-row rounded-lg w-full border border-gray-300 p-2 items-center bg-white animate-pulse">
      <div className="relative w-full h-52 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
        <div className="absolute inset-0 rounded-2xl bg-gray-200"></div>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-x-4 text-xs">
          <div className="rounded-full bg-gray-200 px-3 py-1.5"></div>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-0 text-lg/6 font-semibold text-gray-200">
            <div className="h-6 bg-gray-200 rounded"></div>
          </h3>
          <p className="mt-2 md:mt-5 text-normal/6 text-gray-200 truncate h-4 bg-gray-200 rounded"></p>
          <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-200 h-4 bg-gray-200 rounded"></p>
        </div>
        <div className="mt-2 md:mt-6">
          <div className="grid grid-cols-2 items-center content-center">
            <div className="relative flex items-center gap-x-4">
              <div className="text-sm/6 hidden md:grid">
                <p className="h-4 bg-gray-200 rounded"></p>
                <p className="font-normal text-xl h-6 bg-gray-200 rounded"></p>
                <p className="hidden text-gray-200 h-4 bg-gray-200 rounded"></p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-gray-200 px-5 py-3 rounded-lg text-lg"></div>
              <button type="button" className="bg-gray-200 px-5 py-3 rounded-lg text-lg"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
const BlogItem =  (props:any) => (
  <ContentLoader viewBox="0 0 500 280" height={280} width={500} {...props}>
    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
    <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
    <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
    <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
  </ContentLoader>
)
  
const SVGSkeleton = (props:any) => (
  <svg
    className={
      props.className + " animate-pulse rounded bg-gray-300"
    }
  />
)
  
  export { Skeleton, SVGSkeleton, BlogItem}