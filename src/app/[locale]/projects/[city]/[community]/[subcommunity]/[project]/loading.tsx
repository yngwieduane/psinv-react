import ContentLoader from "react-content-loader"

export default function Loading(props:any) {
    // You can add any UI inside Loading, including a Skeleton.
    return <ContentLoader 
        speed={2}
        width={600}
        className="w-full"
        height={500}
        viewBox="0 0 600 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
        >
        <rect x="0" y="0" rx="0" ry="0" width="600" height="500" />
        </ContentLoader>
}