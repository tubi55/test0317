import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/requests';

const Home: NextPage = (props) => {
	console.log(props);

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
	const [top, sf, drama, fantasy, thriller, animation, anime] = await Promise.all([
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.sf).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.fantasy).then((res) => res.json()),
		fetch(requests.thriller).then((res) => res.json()),
		fetch(requests.animation).then((res) => res.json()),
		fetch(requests.anime).then((res) => res.json()),
	]);

	return {
		props: {
			topRated: top.results,
			sf: sf.results,
			drama: drama.results,
			fantasy: fantasy.results,
			thriller: thriller.results,
			animation: animation.results,
			anime: anime.results,
		},
	};
};
