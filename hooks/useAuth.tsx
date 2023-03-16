import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';

//전역 객체의 인터페이스 설정
interface IAuth {
	user: User | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	errors: string | null;
	loading: boolean;
}

//AuthProvider로 전체 리액트 컴포넌트들을 감싸줄 것이므로 자식 타입을 리액트 노드로 지정
interface AuthProviderProps {
	children: React.ReactNode;
}

//전역으로 담을 초기값 정보를 createContext로 생성
const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	errors: null,
	loading: false,
});

//전역 컴포넌트를 감싸서 내부적으로 firebase에서 가져온 User정보와 인증 관련 함수를 전달해줄 Wrapping컴포넌트 export
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [errors, setErrors] = useState<null>(null);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	//AuthProvider컴포넌트 실행시 현재 로그인되어있는지 아닌지를 판단해서 User정보를 state에 옮겨담음
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				//logged in
				setUser(user);
				setLoading(false);
			} else {
				//not logged in
				setUser(null);
				setLoading(true);
				router.push('/login');
			}
			setInitialLoading(false);
		});
	}, [auth]);

	//회원가입 함수
	const signUp = async (email: string, password: string) => {
		setLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				setLoading(false);
				router.push('/');
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//로그인 함수
	const signIn = async (email: string, password: string) => {
		setLoading(true);

		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				setLoading(false);
				router.push('/');
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//로그아웃 함수
	const logout = async () => {
		setLoading(true);
		signOut(auth)
			.then(() => setUser(null))
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//useMemo를 이용하여 user, loading값이 바뀔때만 각 함수 및 정보를 객체로 묶어서 내보냄
	//해당 정보값을 메모이제이션해서 의존성 배열에 등록된 값 외에는 재실행하지 않음
	const memoedValue = useMemo(() => ({ user, loading, errors, signUp, signIn, logout }), [user, loading]);

	//firebase로 인증정보가 아직 받아지지 않은 상태에서는 컴포넌트를 아예 미출력하도록 설정
	//이유: 로그인이 되어야지만 메인페이지가 보여야 함에도 불구하고 처음 로딩시 아직 firebase값이 없으며
	//index.tsx값이 살짝 보였다 로그인화면으로 넘어가는 이슈를 해결하기 위함
	return <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>;
};

//위의 AuthProvider wrapping컴포넌트로 전역을 감쌀때 createContext로 만든 전역 객체를 사용가능하도록 활성화
export default function useAuth() {
	return useContext(AuthContext);
}
