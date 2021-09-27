import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// import modules
import Movie from "./modules/movie";

export default new Vuex.Store({
  modules: {
    Movie,
  },
  plugins: [
    createPersistedState({
      key: "movie-list",
      reducer: (state) => ({
        Movie: state.Movie,
      }),
    }),
  ],
});
