import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/requests';
import { Movie } from '@/typings';

interface IndexProps {
	original: Movie[];
	topRated: Movie[];
	sf: Movie[];
	drama: Movie[];
	fantasy: Movie[];
	thriller: Movie[];
	animation: Movie[];
}

const Home: NextPage<IndexProps> = ({ original, topRated, sf, drama, fantasy, thriller, animation }: IndexProps) => {
	console.log(original);

	return (
		<div className='relative h-screen bg-gradient-to-b from-[#333] to-[#141414]'>
			<Head>
				<title>Netflix clon-coding</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className=''>
				<section></section>
			</main>
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
