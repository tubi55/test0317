import { Movie } from '@/typings';
import Image from 'next/image';
import { baseURL } from '@/constants/movie';

interface Props {
	movie: Movie;
}

function Thumbnail({ movie }: Props) {
	return (
		<div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:hover:scale-[1.1]'>
			<Image src={`${baseURL}${movie.backdrop_path}`} fill priority alt={movie.title} className='rounded-sm object-cover md:rounded' />
		</div>
	);
}

export default Thumbnail;
