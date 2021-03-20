<template>
  <div v-if="movie" :class="$route.params.id?'movie':'movieList'">
    <router-link :to="{ name: 'movies' }">
    <button v-if="$route.params.id" class="backButton">
          {{back}}
    </button>
    </router-link>
    <div class="moviePoster" @click="movieClick(movie.imdbID)">
      <img :src="movie.Poster" class="movieImage" :alt="movie.Title" />
    </div>
    <div class="movieInfo">
      <div class="movieHead" @click="movieClick(movie.imdbID)">
        <span>{{ index ? `${index}. ` : "" }} </span>
        <span class="movieTitle">
          {{ movie.Title }}
        </span>
        <span> ({{ movie.Year }}) </span>
        <i :class="favourite?'fa fa-heart':'fa fa-heart-o'" aria-hidden="true" @click.stop="handleFavourite(movie.imdbID)"/>
      </div>
      <div class="movieRuntime">
        <span class="rated">{{ movie.Rated }}</span>
        <span class="divider">|</span>
        <span class="runtime">{{ movie.Runtime }}</span>
        <span class="divider">|</span>
        <span class="genre"> {{ movie.Genre }} </span>
      </div>
      <div class="movieRatings">
        <i class="fa fa-star"></i>
        <strong>{{ movie.imdbRating }}</strong>
      </div>
      <div class="moviePlot">
         <span class="plot">  Plot : </span>
        {{ movie.Plot }}
      </div>
      <div class="movieStars"> <span class="star">  Director : </span> {{ movie.Director }}</div>
      <div class="movieStars"> <span class="star">  Stars : </span> {{ movie.Actors }}</div>
    </div>
  </div>
  <div v-else>
    {{invalidText}}
  </div>
</template>

<script>
import { mapGetters,lang } from "../common";
export default {
  name: "Movie",
  props: ["imdbMovie", "index"],
  data(){
    let {back,invalidText}=lang.movie;
    return {
      movie:this.imdbMovie,
      favourite:false,
      back,
      invalidText
    }
  },
  computed:mapGetters(["selectedMovie","favMovies"]),
  watch: {
    selectedMovie: function (newVal) {
      if(newVal){
        this.movie=newVal;
        this.favourite=this.favMovies.includes(newVal.imdbID)
      }
    },
    favMovies: function (newVal) {
      this.favourite=newVal.includes(this.movie.imdbID)
    },
  },
  methods:{
    movieClick (id){
      id && !this.$route.params.id?this.$router.push({name:"movie",params:{id:id}}):'';
    },
    handleFavourite(id){
      this.$store.dispatch("updateFavourite",id)
    },
  },

  async mounted() {
    let id=this.$route.params.id;
    if(id){
      this.$store.dispatch("fetchMovie",id)
    }else{
      if(this.favMovies.length){
        this.favourite=this.favMovies.includes(this.imdbMovie.imdbID)
      }
    }
  },
};
</script>

<style lang="scss" scoped>

div[class="movie"], div[class="movieList"] {
  display: flex;
  margin: 1em 2em;
  background-color: rgb(241, 237, 241);
  border-radius: 10px;

  button[class="backButton"] {
    position: fixed;
    top:20px;
    left:20px;
    text-align: center;
    color: white;
    background-color: blue;
    border-color: blue;
    border: 1px solid transparent;
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
  div[class="moviePoster"] {
    margin: 2vw;
    margin-top: 1vw;
    cursor: pointer;
    img {
      max-width: 10vw;
    }
  }
  div[class="movieInfo"] {
    padding: 1em;
    display: flex;
    text-align: left;
    flex-direction: column;
    div[class="movieHead"] {
      font-size: 24px;
      cursor: pointer;
      span[class="movieTitle"] {
        font-weight: normal;
        color: blue;
      }
      i{
        position: absolute;
        right:2em;
        float: right;
        }
        i[class="fa fa-heart"]{
        color:rgb(199, 4, 4);
          }
    }
    div[class="movieRuntime"] {
      font-size: 18px;
      margin-top: 10px;
      span[class="rated"] span[class="runtime"] span[class="genre"] {
        font-weight: normal;
        color: blue;
      }
      span[class="divider"] {
        margin: 0 0.3em;
      }
    }
    div[class="movieRatings"] {
      margin-top:10px;
      font-size: 18px;
      span[class="divider"] {
        margin: 0 1em;
      }
      i[class="fa fa-star"] {
        color: #fad817;
      }
      i[class="fa fa-star grayed"] {
        margin: 0 0.4em;
      }
      strong{
        margin-left:0.5em;
      }
    }
    div[class="moviePlot"]{
      margin-top: 10px;
      font-size: 18px;
      span[class="plot"]{
        font-weight: bold;
        }
      }
    div[class="movieStars"]{
      margin-top: 10px;
      font-size: 18px;
      span[class="star"]{
        font-weight: bold;
        }
      }
  }
}
div[class="movie"] {
  flex-direction: column;
  margin:0;
  border-radius: 0;
  min-height: 100vh;
  background-color: #fafcfd;
  div[class="moviePoster"] {
    img {
      max-width: 15vw;
    }
  }
  div[class="movieInfo"] {
    div[class="movieHead"] {
      i{
        top:0.5em;
        right:1em;
        }
    }
    
  }
}

</style>
