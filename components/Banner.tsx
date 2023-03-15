import { Movie } from '@/typings';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { baseURL } from '@/constants/movie';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		//0~20사이의 랜덤 정수값을 반환하는 공식
		//Math.floor(Math.random() * 20)
		//console.log(Math.floor(Math.random() * 19));
		setMovie(original[Math.floor(Math.random() * original.length - 1)]);
	}, [original]);

	console.log(Movie);

	return (
		<section>
			<div>
				<Image src={`${baseURL}${Movie?.backdrop_path}`} alt={`${Movie?.title}`} fill className='object-cover' />
			</div>
		</section>
	);
}

export default Banner;
