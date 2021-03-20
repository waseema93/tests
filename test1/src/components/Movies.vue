<template>
  <div class="imdbMovies">
    <div class="searchBar">
      <div class="headingImdb">{{searchImdb}}</div>
      <div class="searchInput">
        <input
          class="inputIds"
          name="moviesId"
          :placeholder="inputPlaceholder"
          v-model.trim="value"
          v-on:keyup.enter="handleSearch"
          autocomplete="off"
        />
        <button class="searchButton" @click="handleSearch">
          {{search}}
        </button>
      </div>
    </div>
    <div class="searchInput" v-if="imdbMovies.length">
        <input
          class="inputIds"
          name="moviesFilter"
          :placeholder="searchPlaceholder"
          v-model.trim="filterValue"
          v-on:change="handleChange"
          autocomplete="off"
        />
      </div>
    <div
      class="moviesView"
      v-for="(movie, index) in movies"
      :index="index"
      :key="movie.Title"
    >
     
    <Movie :imdbMovie="movie" :index="index + 1" :list="true" />
    </div>
  </div>
</template>

<script>
import { mapGetters,lang } from "../common";
import Movie from "./Movie.vue";
export default {
  name: "Movies",
  components: {
    Movie,
  },
  data() {
    let {searchImdb,inputPlaceholder,searchPlaceholder,search}=lang.movies
    return {
      value: "",
      filterValue: "",
      movieIds: [],
      movies:[],
      searchImdb,
      inputPlaceholder,
      searchPlaceholder,
      search
    };
  },
  computed: mapGetters(["imdbMovies"]),
  watch: {
    imdbMovies: function(newVal) {
      if (newVal.length) {
        this.value = "";
        this.movies=newVal
      }
    },
    filterValue: function(newVal) {
      if(newVal){
       this.movies = this.movies.filter((n) =>
            n.Title.toLowerCase().search(newVal.toLowerCase())>=0
        );
      }else{
        this.movies=this.imdbMovies;
      }
    }
  },
  methods: {
    handleSearch() {
      this.movieIds = this.value.replace(/\s+/g, "").split(",");
      this.$store.dispatch("fetchMovies", this.movieIds); //dispatching fetchMovies to fetch movies list
    },
    handleChange() {
     console.log(this.filterValue)
    },
  },
  async mounted() {
    this.movies=this.imdbMovies
  },

  
};
</script>

<style lang="scss" scoped>
div[class="imdbMovies"] {
  text-align: center;
  background-color: rgb(250, 245, 253);
  min-height: 100vh;
  div[class="searchBar"] {
    padding: 1em 0;
    background-color: lightgray;
    div[class="headingImdb"] {
      text-align: center;
      font-size: 2em;
      font-weight: 700;
      color: blue;
    }
    div[class="searchInput"] {
      margin-top: 20px;
      input[class="inputIds"] {
        margin: 1em 0 0.5em 0;
        width: 40%;
        padding: 0.6em 0.6em;
        font-size: 1em;
        line-height: 1.5;
        border: 1px solid darkgray;
        color: #495057;
        box-shadow: 0px 0px 5px #00000047;
        border-radius: 3px;
        &:focus {
          outline: none;
        }
      }
      button[class="searchButton"] {
        text-align: center;
        color: white;
        background-color: blue;
        border-color: blue;
        border: 1px solid transparent;
        margin-left: 20px;
        padding: 0.4em 1.5em;
        font-size: 1.15em;
        font-weight: bold;
        line-height: 1.5;
        border-radius: 3px;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  input[class="inputIds"] {
        margin: 1em 0 0.5em 0;
        width: 20%;
        padding: 0.6em 0.6em;
        font-size: 1em;
        line-height: 1.5;
        border: 1px solid darkgray;
        color: #495057;
        box-shadow: 0px 0px 5px #00000047;
        border-radius: 3px;
        &:focus {
          outline: none;
        }
      }
}
</style>
