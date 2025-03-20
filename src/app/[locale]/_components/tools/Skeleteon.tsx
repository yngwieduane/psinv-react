const Skeleton = (props:any) => (
    <div aria-live="polite" aria-busy="true" className={props.className}>
      <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
        ‌
      </span>
      <br />
    </div>
  )
  
  const SVGSkeleton = (props:any) => (
    <svg
      className={
        props.className + " animate-pulse rounded bg-gray-300"
      }
    />
  )
  
  export { Skeleton, SVGSkeleton }