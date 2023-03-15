import { Movie } from '@/typings';
import { useEffect, useState } from 'react';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		//0~20사이의 랜덤 정수값을 반환하는 공식
		//Math.floor(Math.random() * 20)
		//console.log(Math.floor(Math.random() * 19));
		setMovie(original[Math.floor(Math.random() * 19)]);
	}, [original]);

	console.log(Movie);

	return <div>Banner</div>;
}

export default Banner;
