import { Movie } from '@/typings';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Thumbnail from '@/components/Thumbnail';
import { useRef } from 'react';

interface Props {
	title: string;
	movies: Movie[];
}

function Row({ title, movies }: Props) {
	const rowRef = useRef<HTMLDivElement>(null);

	const handleClick = (direction: string) => {
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;
			//좌우버튼 클릭시 클릭한 방향에 따라 가로축으로 이동할 타겟위치값을 구해서 scrollTo로 이동
			const targetPos = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: targetPos, behavior: 'smooth' });
		}
	};

	return (
		<article className='h-40 space-y-0.5 mb-[40px] md:space-y-2 relative z-[4]'>
			{/* title */}
			<h2 className='w-50 text-base font-semibold text-[#e5e5e5] transition duration-[0.3] hover:text-white md:text-2xl'>{title}</h2>

			<div className='group relative '>
				{/* left btn */}
				<FaAngleLeft className='absolute top-0 bottom-0 left-2 z-[4] m-auto h-9 cursor-pointer opacity-[0] transition hover:scale-[1.5] group-hover:opacity-[1]' onClick={() => handleClick('left')} />

				{/* Thumbnail Frame*/}
				<div
					ref={rowRef}
					className='flex items-center space-x-0.5 overflow-x-scroll scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-hide !pb-4 hover:scrollbar-default md:space-x-2.5 md:p-2'
				>
					{movies.map((movie) => (
						<Thumbnail key={movie.id} movie={movie} />
					))}
				</div>

				{/* right btn */}
				<FaAngleRight
					className='absolute top-0 bottom-0 right-2 z-[4] m-auto h-9 cursor-pointer opacity-[0] transition hover:scale-[1.5] group-hover:opacity-[1]'
					onClick={() => handleClick('right')}
				/>
			</div>
		</article>
	);
}

export default Row;
