import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/requests';
import { Movie, TV } from '@/typings';
import Banner from '@/components/Banner';
import Row from '@/components/Row';
import useAuth from '@/hooks/useAuth';
import Modal from '@/components/Modal';
import { modalState } from '@/atoms/globalAtom';
import { useRecoilValue } from 'recoil';

interface IndexProps {
	original: TV[];
	topRated: Movie[];
	sf: Movie[];
	drama: Movie[];
	fantasy: Movie[];
	thriller: Movie[];
	animation: Movie[];
}

const Home: NextPage<IndexProps> = ({ original, topRated, sf, drama, fantasy, thriller, animation }: IndexProps) => {
	const showModal = useRecoilValue(modalState);
	const { user } = useAuth();
	console.log(user);
	return (
		<div className='relative h-screen bg-gradient-to-b from-[#333] to-[#141414]'>
			<Head>
				<title>Netflix clon-coding</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='relative pl-4 pb-24 lg:space-y-18 lg:pl-16'>
				<Banner original={original} />

				<section>
					<Row title='Top Rated' movies={topRated} />
					<Row title='Science Fiction' movies={sf} />
					<Row title='Drama' movies={drama} />
					<Row title='Fantasy' movies={fantasy} />
					<Row title='Thriller' movies={thriller} />
					<Row title='Animation' movies={animation} />
				</section>
			</main>

			{showModal && <Modal />}
		</div>
	);
};

export default Home;
export const getServerSideProps = async () => {
	const [original, top, sf, drama, fantasy, thriller, animation] = await Promise.all([
		fetch(requests.original).then((res) => res.json()),
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.sf).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.fantasy).then((res) => res.json()),
		fetch(requests.thriller).then((res) => res.json()),
		fetch(requests.animation).then((res) => res.json()),
	]);

	return {
		props: {
			original: original.results,
			topRated: top.results,
			sf: sf.results,
			drama: drama.results,
			fantasy: fantasy.results,
			thriller: thriller.results,
			animation: animation.results,
		},
	};
};
