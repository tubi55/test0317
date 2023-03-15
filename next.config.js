/** @type {import('next').NextConfig} */
module.exports = {
	//true로 지정시 콘솔문 2번씩 출력되므로 개발시에는 false로 지정
	reactStrictMode: false,
	//외부 사이트에서 가져오는 이미지를 최적화하기 위해서는 해당 이미지의 서버 도메인을 이곳에 등록
	//도메인을 등록하지 않은 url의 이미지를 Image컴포넌트로 호출시 에러발생
	images: {
		domains: ['image.tmdb.org'],
	},
};
