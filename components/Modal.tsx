import { modalState, movieState } from '@/atoms/globalAtom';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseURL } from '@/constants/movie';

function Modal() {
	const [ShowModal, setShowModal] = useRecoilState(modalState);
	const Movie = useRecoilValue(movieState);
	console.log(Movie);

	return (
		<aside className='fixed w-full h-[100vh] top-0 left-0 z-[10] bg-[rgba(0,0,0,.9)] p-10 flex items-center justify-center'>
			<article className='w-[600px] h-[100%]'>
				{/* pic box */}
				<div className='relative w-full h-[60%]'>
					<Image src={`${baseURL}w780${Movie?.poster_path}`} fill className='object-contain' alt={`${Movie?.name || Movie?.title}`} />
				</div>

				{/* txt box */}
				<div>
					<h2>{Movie?.name || Movie?.title}</h2>
					<p>{Movie?.overview}</p>
				</div>
			</article>
			<span className='absolute top-10 right-10 text-[16px] text-white cursor-pointer' onClick={() => setShowModal(false)}>
				close
			</span>
		</aside>
	);
}

export default Modal;
