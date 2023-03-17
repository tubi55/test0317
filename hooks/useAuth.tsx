import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';

interface IAuth {
	user: User | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
}

//전역으로 담을 초기 정보값을 createContext로 생성
const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	error: null,
	loading: false,
});

//AuthProvider로 전체 리액트 컴포넌트를 감싸줄 것이므로
//자식 타입을 리액트 노드로 지정
interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// Logged in...
					setUser(user);
					setLoading(false);
				} else {
					// Not logged in...
					setUser(null);
					setLoading(true);
					router.push('/login');
				}

				setInitialLoading(false);
			}),
		[auth]
	);

	//signUp func
	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push('/');
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//signIn func
	const signIn = async (email: string, password: string) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push('/');
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//logout func
	const logout = async () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//useMemo를 이용하여 user, loding값이 바뀔때만  각 함수 및 정보를 객체로 묶어서 내보냄
	//해당 정보값을 메모이제이션해서 의존성배열에 등록된 값 외에는 재실행하지 않음
	const memoedValue = useMemo(() => ({ user, loading, error, signUp, signIn, logout }), [user, loading]);

	//firebase로 인증정보가 아직 받아지지 않은 상태에서는 컴포넌트를 아예 미출력
	//로그인이 되어야지만 메인이 보여야 함에도 불구하고 처음 로딩시 아직 firebase값이 없으면 index.tsx값이 살짝 보였다 로그인화면으로 넘어가는 이슈 해결위함
	return <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
