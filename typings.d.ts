/*
  *.ts vs *.d.ts
  *.ts는 자바스크립트로 컴파일됨
  *.d.ts는 개발과정에서만 실행되고 빌드시에 일반 자바스크립트 파일로 컴파일 되지 않음
  실제 서비스때 프로젝트 배포시 불필요하게 호출된느 자바스크립트 파일이 적어짐
*/

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	release_date: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	video: boolean;
	vote_average: number;
	vout_count: number;
	overview: string;
	popularity: number;
	poster_path: string;
}

export interface TV {
	backdrop_path: string;
	genre_ids: number[];
	first_air_date: string;
	id: number;
	name: string;
	original_country: string[];
	original_language: string;
	original_name: string;
	video: boolean;
	vote_average: number;
	vout_count: number;
	overview: string;
	popularity: number;
	poster_path: string;
}
