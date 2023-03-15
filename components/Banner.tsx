import { TV } from '@/typings';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { baseURL } from '@/constants/movie';

interface Props {
	original: TV[];
}

function Banner({ original }: Props) {
	const [TV, setTV] = useState<TV | null>(null);

	useEffect(() => {
		//0~20사이의 랜덤 정수값을 반환하는 공식
		//Math.floor(Math.random() * 20)
		//console.log(Math.floor(Math.random() * 19));
		const num = Math.floor(Math.random() * 19);
		console.log(num);
		setTV(original[num]);
	}, [original]);

	console.log(TV);

	return (
		<section>
			<div>
				<Image src={`${baseURL}${TV?.backdrop_path}`} alt={`${TV?.name}`} fill priority quality={50} className='object-cover' />
			</div>
		</section>
	);
}

export default Banner;
