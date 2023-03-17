function Modal() {
	return (
		<aside className='fixed w-full h-[100vh] top-0 left-0 z-[10] bg-[rgba(0,0,0,.9)] p-10 flex items-center justify-center'>
			<article className='w-[600px] h-[100%]'></article>
			<span className='absolute top-10 right-10 text-[16px] text-white cursor-pointer'>close</span>
		</aside>
	);
}

export default Modal;
