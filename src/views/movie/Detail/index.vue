<template>
  <div id="detail" class="height-100">
    <h2>detail</h2>
    <div class="detail_cover" :style="coverImage"></div>
    <div class="detail_content">
      <div class="detail_content_container">
        <h1 class="detail_content_container_header">
          {{ getSelectedMovie.original_title }}
        </h1>
        <p class="detail_content_container_year">{{ getYear() }}</p>
        <p class="detail_content_container_description">
          {{ getSelectedMovie.overview }}
        </p>
        <div class="detail_content_container_related">
          <b-row style="overflow: hidden">
            <h3 class="detail_content_container_related_description">
              Related Movie
            </h3>
            <b-col v-for="(item, index) in getMovieSimilarList" :key="index">
              <div
                @click="setMovie(item)"
                class="detail_content_container_related_card"
                :style="{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.backdrop_path})`,
                  height: '150px',
                  width: '300px',
                }"
              >
                <h4 class="detail_content_container_related_card_title">
                  {{ item.title }}
                </h4>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <img class="detail_content_poster" :src="posterImage" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import store from "../../../store";

// Interfaces
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

@Options({})
export default class Detail extends Vue {
  getYear(): string {
    const split = this.getSelectedMovie.release_date.split("-");
    return split[0];
  }

  async setMovie(item: ResultsMovieTypeModel): Promise<void> {
    await store.commit("Movie/SET_SELECTED_MOVIE", item);
    await store.dispatch("Movie/SIMILAR_MOVIE_LIST", item.id);
    window.location.reload();
  }

  get getSelectedMovie(): ResultsMovieTypeModel {
    return store.getters["Movie/getSelectedMovie"];
  }

  get getMovieSimilarList(): ResultsMovieTypeModel {
    return store.getters["Movie/getMovieSimilarList"];
  }

  get coverImage(): unknown {
    const getSelectedMovieTemp = store.getters["Movie/getSelectedMovie"];
    return {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${getSelectedMovieTemp.backdrop_path}`,
    };
  }

  get posterImage(): unknown {
    const getSelectedMovieTemp = store.getters["Movie/getSelectedMovie"];
    return `https://image.tmdb.org/t/p/w500/${getSelectedMovieTemp.poster_path}`;
  }
}
</script>
