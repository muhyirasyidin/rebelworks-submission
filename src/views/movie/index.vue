<template>
  <div id="parent" class="height-100">
    <center>
      <h1 class="header">Now Playing</h1>
      <b-row style="overflow: hidden">
        <b-col v-for="(item, index) in getMovieList" :key="index">
          <div
            class="movie-card"
            :style="{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.poster_path})`,
              height: '750px',
              width: '500px',
            }"
            @click="setMovie(item)"
          >
            <h2 class="movie-card_title">{{ item.original_title }}</h2>
          </div>
        </b-col>
      </b-row>
    </center>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import store from "../../store";

// import component
import MovieFooter from "../components/movieFooter.vue";

// Interfaces
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

@Options({
  components: {
    MovieFooter,
  },
})
export default class Movie extends Vue {
  created(): void {
    window.addEventListener("scroll", this.handleScroll);
  }

  mounted(): void {
    store.dispatch("Movie/GET_MOVIE_LIST");
  }

  destroyed(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // you're at the bottom of the page
      if (this.getParams + 1 < this.getMovieResp.total_pages) {
        store.commit("Movie/SET_PARAMS", this.getParams + 1);
        store.dispatch("Movie/MOVIE_LIST_LOADMORE");
      }
    }
  }

  async setMovie(item: ResultsMovieTypeModel): Promise<void> {
    await store.commit("Movie/SET_SELECTED_MOVIE", item);
    await store.dispatch("Movie/SIMILAR_MOVIE_LIST", item.id);
    window.location.href = "/movie/detail";
  }

  get getMovieResp(): RespMovieTypeModel {
    return store.getters["Movie/getMovieResp"];
  }

  get getMovieList(): ResultsMovieTypeModel[] {
    return store.getters["Movie/getMovieList"];
  }

  get getParams(): number {
    return store.getters["Movie/getParams"].page;
  }
}
</script>
