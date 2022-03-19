import { defineStore } from 'pinia';
import axios from 'axios';

const SOLR_URI='http://test.datenadler.de/solr/LGB2/select'
const SOLR_SUGGET_URI='http://test.datenadler.de/solr/LGB2/suggest'

const PASSWORD = 'Sas242!!'

export const useEntityStore = defineStore({
  id: 'entity-store',
  state: () => ({
          entities: ['youtube', 'twitch'],
          suggestions: ['a', 'b'],
          query: 'B'
  }),
  actions: {
    async getSolr(){
      try {
        let dataset_res = await axios.post(
          SOLR_URI,
          {
            query: 'dcterms_title:*' + this.query + '*',
            limit: 100
          }
          )
        this.entities = dataset_res.data.response.docs
      } catch(err){
        throw err.message
      }
      try {
        let suggest_res = await axios.get(
          SOLR_SUGGET_URI,
          { params: {
              'suggest.build' : true,
              'suggest.q': this.query.toLowerCase(),
              'suggest': true,
              'suggest.dictionary': 'mySuggester',
              'suggest.count': 10,
            }},
        )
        if (suggest_res.data.suggest.mySuggester[this.query.toLowerCase()].numFound > 0) {
          this.suggestions =  suggest_res.data.suggest.mySuggester[this.query.toLowerCase()].suggestions
        }
      } catch(err){
        throw err.message
      }
    }
  },

  getters: {
    entityList: state => state.entities,
    is_suggestions: state => state.suggestions.length > 0,
  },

})

