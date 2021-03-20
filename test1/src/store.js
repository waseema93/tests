import Vue from "vue";
import Vuex from "vuex";
import { axios, VUE_APP_IMDB_API_URL, VUE_APP_IMDB_KEY } from "./common.js";
Vue.use(Vuex);
const state = {
  imdbMovies: [],
  favMovies: [],
  selectedMovie: "",
};
const getters = {
  imdbMovies: (state) => state.imdbMovies,
  favMovies: (state) => state.favMovies,
  selectedMovie: (state) => state.selectedMovie,
};
const mutations = {
  setImdbMovies: (state, payload) => (state.imdbMovies = payload),
  setFavMovies: (state, payload) => (state.favMovies = payload),
  setSelcectedMovie: (state, payload) => (state.selectedMovie = payload),
};

const actions = {
  async fetchMovies({ commit }, ids) {
    let movies = [];
    for (const id of ids) {
      let response = await axios //fetching Imdb movies
        .get(`${VUE_APP_IMDB_API_URL}/?apikey=${VUE_APP_IMDB_KEY}&i=${id}`)
        .catch((err) => {
          console.log(err);
        });
      if (response.status == 200 && response.data.Response === "True") {
        movies.push(response.data);
        commit("setImdbMovies", movies);
      }
    }
  },
  async fetchMovie({ commit }, id) {
    let response = await axios //fetching Imdb movie
      .get(`${VUE_APP_IMDB_API_URL}/?apikey=${VUE_APP_IMDB_KEY}&i=${id}`)
      .catch((err) => {
        console.log(err);
      });
    if (response.status == 200 && response.data.Response === "True") {
      commit("setSelcectedMovie", response.data);
    }
  },
  async updateFavourite({ commit }, id) {
    let favIds = state.favMovies;
    if (favIds.includes(id)) {
      favIds.splice(favIds.indexOf(id), 1);
    } else {
      favIds.push(id);
    }
    commit("setFavMovies", favIds);
  },
};

export const store = new Vuex.Store({ state, mutations, getters, actions });
