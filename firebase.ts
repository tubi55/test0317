import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCG5kKIpqQN_7YJ6wYWhvNzOB8x_P4jUnc',
	authDomain: 'dcode-may.firebaseapp.com',
	projectId: 'dcode-may',
	storageBucket: 'dcode-may.appspot.com',
	messagingSenderId: '538598286383',
	appId: '1:538598286383:web:2eb6c7c0cdef0ae70a52da',
};

//firebase로 구동한 app이 없으면 아직 인증처리가 되지 않은 상태에서만 초기화
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export default app;
export { auth };
