import axios from "axios";

// Interfaces
export interface CommonResp {
  data: unknown;
  status: number;
}

export interface RespMovieTypeModel {
  page: number;
  total_pages: number;
  total_results: number;
  dates: DateFormatMovieTypeModel;
  results: ResultsMovieTypeModel;
}

export interface DateFormatMovieTypeModel {
  maximum: string;
  minimum: string;
}

export interface ResultsMovieTypeModel {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const GET_MOVIE_LIST_API = (params: string): Promise<CommonResp> => {
  return axios.get(`movie/now_playing?${params}`);
};

export const GET_SIMILAR_MOVIE_LIST_API = (id: number): Promise<CommonResp> => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=6a639e6d4608fa22ca8280a8a819f86b`
  );
};
