import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
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
