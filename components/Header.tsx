import Link from 'next/link';
import { FaBell, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Header() {
	const [Scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => (window.scrollY > 0 ? setScrolled(true) : setScrolled(false));
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header className={`transition-colors duration-[.5s] ${Scrolled && 'bg-[#141414]'}`}>
			{/* logo ,menu 그룹 */}
			<div className='flex items-center space-x-2 md:space-x-10'>
				<h1>
					<img src='https://rb.gy/ulxxee' alt='netflix' width={100} className='cursor-pointer' />
				</h1>

				<ul className='space-x-4 hidden md:flex'>
					<li className='headerLink'>Home</li>
					<li className='headerLink'>TV Shows</li>
					<li className='headerLink'>Movies</li>
					<li className='headerLink'>New & Popular</li>
					<li className='headerLink'>My List</li>
				</ul>
			</div>

			{/* 유틸메뉴 그룹 */}
			<div className='flex items-center space-x-4 text-sm font-light'>
				<FaSearch className='w-6' />
				<p className='hidden lg:inline'>Kids</p>
				<FaBell className='w-6' />
				<Link href='/'>
					<img src='https://rb.gy/g1pwyx' alt='profile' className='rounded' />
				</Link>
			</div>
		</header>
	);
}

export default Header;
