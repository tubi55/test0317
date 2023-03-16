import Head from 'next/head';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
	email: string;
	password: string;
}

function login() {
	const [Login, setLogin] = useState(false);
	const {
		register, //원하는 인풋요소에 전개연산자로 등록해서 값을 관리
		handleSubmit, //해당훅 전용 전송 이벤트 핸들러
		formState: { errors }, //register로 등록된 값이 올바르지 않으면 에러 반환
	} = useForm<Inputs>();

	//전송 이벤트 발생시 handleSubmit함수로 실행할 콜백함수 등록
	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		console.log('email', email);
		console.log('password', password);
		if (Login) {
			//만약 클릭한게 로그인 버튼이면 firebase에 로그인처리를 하는 함수 호출
			//await signIn(email, password)
		} else {
			//클릭한게 로그인 버튼이 아니면(회원가입 버튼이면) 로그인이 아닌 회원정보 등록함수 호출
			//await signUp(email, password);
		}
	};

	return (
		<div className='relative flex h-screen flex-col  md:items-center md:justify-center'>
			<Head>
				<title>Netflix Member</title>
				<link rel='icon' href='favicon.ico' />
			</Head>

			<img src='https://rb.gy/ulxxee' alt='netflix' width={260} height={130} className='absolute left-4 top-4 object-contain cursor-pointer md:left10 md:top-6 md:mt-0 md:max-w-md md:px-14' />

			<form className='relative mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:max-w-md md:px-14' onSubmit={handleSubmit(join)}>
				<h1 className='text-4xl font-semibold'>Sign In</h1>

				<div className='space-y-4'>
					<input type='email' placeholder='Email' className='input' {...register('email', { required: true })} />
					<input type='password' placeholder='Password' className='input' {...register('password', { required: true })} />
				</div>

				<button className='w-full rounded bg-[red] py-3 font-semibold' onClick={() => setLogin(true)}>
					Sign In
				</button>

				<div className='text-[gray]'>
					New to Netflix?{' '}
					<button className='text-white ml-4 hover:underline' onClick={() => setLogin(false)}>
						Sign Up Now
					</button>
				</div>
			</form>
		</div>
	);
}

export default login;
