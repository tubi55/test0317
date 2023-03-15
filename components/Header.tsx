import Link from 'next/link';
import { FaBell, FaSearch } from 'react-icons/fa';

function Header() {
	return (
		<header>
			{/* logo ,menu 그룹 */}
			<div>
				<h1>
					<img src='https://rb.gy/ulxxee' alt='netflix' width={100} className='cursor-pointer' />
				</h1>

				<ul className='space-x-4 md:flex'>
					<li className='headerLink'>Home</li>
					<li className='headerLink'>TV Shows</li>
					<li className='headerLink'>Movies</li>
					<li className='headerLink'>New & Popular</li>
					<li className='headerLink'>My List</li>
				</ul>
			</div>

			{/* 유틸메뉴 그룹 */}
			<div>
				<FaSearch />
				<p>Kids</p>
				<FaSearch />
				<Link href='/'>
					<img src='https://rb.gy/g1pwyx' alt='profile' className='rounded' />
				</Link>
			</div>
		</header>
	);
}

export default Header;
