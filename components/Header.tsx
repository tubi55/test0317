function Header() {
	return (
		<header>
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
		</header>
	);
}

export default Header;
