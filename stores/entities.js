import { defineStore } from 'pinia';
import axios from 'axios';

//const SOLR_SELECT_URI='http://test.datenadler.de/solr/LGB3/select'
//const SOLR_SUGGEST_URI='http://test.datenadler.de/solr/LGB3/suggest'
const SOLR_SELECT_URI='http://flask.datenadler.lan/solr_request'
const SOLR_SUGGEST_URI='http://flask.datenadler.lan'

const PASSWORD = 'Sas242!!'

export const useEntityStore = defineStore({
  id: 'entity-store',
  state: () => ({
          entities: [],
          entityCount: 0,
          suggestions: [],
          query: '',
          isBlur : false
  }),
  actions: {
    async getSolr(){
      try {
        let dataset_res = await axios.post(
          SOLR_SELECT_URI,
          {
            query: 'dcterms_title:*' + this.query + '*',
            limit: 100
          }
          )
        this.entities = dataset_res.data.response.docs
        this.entityCount = dataset_res.data.response.numFound
      } catch(err){
        throw err.message
      }
      try {
        let suggest_res = await axios.get(
          SOLR_SUGGEST_URI,
          { params: {
//              'suggest.build' : true,
              'suggest.q': this.query.toLowerCase(),
              'suggest': true,
              'suggest.dictionary': 'mySuggester',
              'suggest.count': 10,
            }},
        )
        if (suggest_res.data.suggest.mySuggester[this.query.toLowerCase()].numFound > 0) {
          this.suggestions =  suggest_res.data.suggest.mySuggester[this.query.toLowerCase()].suggestions
        } else {
          this.suggestions = []
        }
      } catch(err){
        throw err.message
      }
    }
  },

  getters: {
    entityList: state => state.entities,
    is_suggestions: state => state.suggestions.length > 0,
    suggestionList: state => state.suggestions.map(
      sug => { return {label: sug.term, count: sug.weight}}),
  },

})
