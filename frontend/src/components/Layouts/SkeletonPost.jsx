import { Skeleton } from '@mui/material'

const SkeletonPost = () => {
    return (
        <div className="flex flex-col border w-full my-4 rounded bg-gray-800">
            <div className="flex items-center gap-2 p-2">
                <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ bgcolor: 'grey.700' }} />
                <div className="flex flex-col gap-1 w-full">
                    <Skeleton height={10} variant="rectangular" width="25%" animation="wave" sx={{ bgcolor: 'grey.700' }} />
                    <Skeleton height={10} variant="rectangular" width="20%" animation="wave" sx={{ bgcolor: 'grey.700' }} />
                </div>
            </div>
            <Skeleton sx={{ height: 520, bgcolor: 'grey.700' }} animation="wave" variant="rectangular" />
        </div>
    )
}

export default SkeletonPost
