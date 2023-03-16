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

//전역으로 담을 초기값 정보를 createContext로 생성
const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	errors: null,
	loading: false,
});

//AuthProvider로 전체 리액트 컴포넌트들을 감싸줄 것이므로 자식 타입을 리액트 노드로 지정
interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [errors, setErrors] = useState<null>(null);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	//AuthProvider컴포넌트 실행시 현재 로그인되어있는지 아닌지를 판단
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

	//signUp func
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

	//signIn func
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

	//logout func
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

	return <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>;
};
