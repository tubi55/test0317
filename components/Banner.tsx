import { TV } from '@/typings';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { baseURL } from '@/constants/movie';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { modalState } from '@/atoms/globalAtom';
import { useRecoilState } from 'recoil';

interface Props {
	original: TV[];
}

function Banner({ original }: Props) {
	const ref = useRef<any>(null);
	const [TV, setTV] = useState<TV | null>(null);
	const [ShowModal, setShowModal] = useRecoilState(modalState);

	useEffect(() => {
		//0~20사이의 랜덤 정수값을 반환하는 공식
		//Math.floor(Math.random() * 20)
		//console.log(Math.floor(Math.random() * 19));
		const num = Math.floor(Math.random() * 19);
		setTV(original[num]);
	}, [original]);

	return (
		<section className='flex flex-col space-y-2 py-16 pt-[40vh] md:space-y-4 lg:h[90vh] lg:justify-end lg:pb-12'>
			<div className='absolute top-0 left-0 z-[1] h-[95vh] w-full'>
				<Image
					src={`${baseURL}original${TV?.backdrop_path}`}
					alt={`${TV?.name}`}
					priority
					quality={70}
					fill
					//placeholder='blur'
					//blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
					sizes='100vw'
					className='object-cover'
					onLoadingComplete={() => ref.current.remove()}
				/>

				{/* gradient mask  */}
				<div className='absolute top-0 left-0 z-[5] w-[100vw] h-[100%] bg-gradient1'></div>

				{/* loading bar */}
				<div
					ref={ref}
					className='w-[40px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[4px] border-solid border-[orange] rounded-[50%] border-l-[transparent] animate-ani-rotation'
				></div>
			</div>

			<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>{TV?.name}</h1>
			<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{TV?.overview}</p>

			<div className='relative flex space-x-3 z-[3]'>
				<button className='bannerButton bg-white text-black'>
					<FaPlay /> Play
				</button>

				<button className='bannerButton bg-[gray]/70 text-white' onClick={() => setShowModal(true)}>
					More Info
					<FaInfoCircle />
				</button>
			</div>
		</section>
	);
}

export default Banner;
