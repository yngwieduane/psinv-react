import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props:any) => (
    <div aria-live="polite" aria-busy="true" className={props.className}>
      <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
        ‌
      </span>
      <br />
    </div>
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