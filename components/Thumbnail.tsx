import { Movie } from '@/typings';
import Image from 'next/image';
import { baseURL } from '@/constants/movie';

interface Props {
	movie: Movie;
}

function Thumbnail({ movie }: Props) {
	console.log(`${baseURL}`);
	return (
		<div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:hover:scale-[1.1]'>
			<Image
				src={`${baseURL}original${movie?.backdrop_path}`}
				fill
				//placeholder='blur'
				//blurDataURL={`${baseURL}original${movie?.backdrop_path}`}
				alt={movie?.title}
				sizes='20vw'
				className='rounded-sm object-cover md:rounded'
			/>
		</div>
	);
}

export default Thumbnail;
