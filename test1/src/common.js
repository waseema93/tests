import axios from "axios";
const {VUE_APP_IMDB_API_URL,VUE_APP_IMDB_KEY}=process.env;
import { mapGetters, mapMutations } from "vuex";
import lang from "./lang";

export { 
    axios,
    VUE_APP_IMDB_API_URL,
    VUE_APP_IMDB_KEY,
    mapGetters,
    mapMutations,
    lang
};
