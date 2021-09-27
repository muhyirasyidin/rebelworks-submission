import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import queryString from "query-string";

// import APIs
import {
  GET_MOVIE_LIST_API,
  GET_SIMILAR_MOVIE_LIST_API,
} from "../../api/movie";

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
  results: ResultsMovieTypeModel[];
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

@Module({ namespaced: true })
export default class Movie extends VuexModule {
  movieResp = null as unknown;
  movieList = [] as ResultsMovieTypeModel[];
  movieSimilarList = [] as ResultsMovieTypeModel[];
  params = {
    api_key: "6a639e6d4608fa22ca8280a8a819f86b",
    page: 1,
  };
  selectedMovie = null as unknown;

  @Mutation
  SET_PARAMS(page: number): void {
    this.params.page = page;
  }

  @Mutation
  SET_SELECTED_MOVIE(payload: ResultsMovieTypeModel): void {
    this.selectedMovie = payload;
  }

  @Mutation
  SET_MOVIE(payload: RespMovieTypeModel): void {
    this.movieList = payload.results;
    this.movieResp = payload;
  }

  @Mutation
  SET_MOVIE_LOADMORE(payload: RespMovieTypeModel): void {
    payload.results.forEach((item) => {
      this.movieList.push(item);
    });
    this.params.page = payload.page;
  }

  @Mutation
  SET_SIMILAR_MOVIE(payload: RespMovieTypeModel): void {
    this.movieSimilarList = payload.results;
  }

  // action get
  @Action
  async GET_MOVIE_LIST(): Promise<CommonResp> {
    const params = queryString.stringify(this.context.getters.getParams);
    return GET_MOVIE_LIST_API(params)
      .then((resp) => {
        this.context.commit("SET_MOVIE", resp.data);
        return resp;
      })
      .catch((err) => {
        console.log("err from GET_MOVIE_LIST => ", err);
        return err;
      });
  }

  @Action
  async MOVIE_LIST_LOADMORE(): Promise<CommonResp> {
    const params = queryString.stringify(this.context.getters.getParams);
    return GET_MOVIE_LIST_API(params)
      .then((resp) => {
        this.context.commit("SET_MOVIE_LOADMORE", resp.data);
        return resp;
      })
      .catch((err) => {
        console.log("err from GET_MOVIE_LIST => ", err);
        return err;
      });
  }

  @Action
  async SIMILAR_MOVIE_LIST(id: number): Promise<CommonResp> {
    return GET_SIMILAR_MOVIE_LIST_API(id)
      .then((resp) => {
        this.context.commit("SET_SIMILAR_MOVIE", resp.data);
        return resp;
      })
      .catch((err) => {
        console.log("err from GET_MOVIE_LIST => ", err);
        return err;
      });
  }

  get getParams(): unknown {
    return this.params;
  }

  get getSelectedMovie(): unknown {
    return this.selectedMovie;
  }

  get getMovieResp(): unknown {
    return this.movieResp !== null ? this.movieResp : {};
  }

  get getMovieList(): ResultsMovieTypeModel[] {
    return this.movieList.length > 0 ? this.movieList : [];
  }

  get getMovieSimilarList(): ResultsMovieTypeModel[] {
    return this.movieSimilarList.length > 0 ? this.movieSimilarList : [];
  }
}
