import { defineStore } from 'pinia';
import axios from 'axios';
import {useMessageStore} from '~/stores/messages.js'

//const SOLR_SELECT_URI='http://test.datenadler.de/solr/LGB3/select'
//const SOLR_SUGGEST_URI='http://test.datenadler.de/solr/LGB3/suggest'
const SOLR_SELECT_URI='http://127.0.0.1:5000/solr_request'
const SOLR_SUGGEST_URI='http://127.0.0.1:5000/solr_suggest'

export const FLASK_UNREACHABLE_MESSAGE = 'Teile des dargestellten Inhalts werden aus dem Flask Backend geladen. ' +
    'Leider scheint das Flask Backend gerade nicht erreichbar zu sein. ' +
    'Bitte versuchen Sie die Seite neu zu laden oder wenden Sie sich an den Admin.';

const PASSWORD = 'Sas242!!'

export const useEntityStore = defineStore({
  id: 'entity-store',
  state: () => ({
          entities: [],
          entityCount: 0,
          suggestions: [],
          query: '',
          isBlur : false,
          perPageResults: 10,
          pagination_page: 1,
  }),
  actions: {
      get_message_store(){
          return useMessageStore()
      },
      handle_error(){
          let messageStore = this.get_message_store();
          messageStore.write_assertive(FLASK_UNREACHABLE_MESSAGE);
          messageStore.write_error(FLASK_UNREACHABLE_MESSAGE);
      },
    async getSolr(){
/*      if (!query) {
        const effective_query = query;
      } else
      {
        const effective_query = this.query;
      }
*/      try {
        let dataset_res = await axios({
          method: 'POST',
          url: SOLR_SELECT_URI,
          data: {
            query: this.query,
            // todo: from and to with pagination
            // from: (this.pagination_page - 1) * this.perPageResults,
            // to: this.pagination_page * this.perPageResults
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
          }}
          ).catch(function (error) {
            console.log('Error', error);
            this.handle_error()
        }.bind(this));
        this.entities = dataset_res.data.response.docs
        this.entityCount = dataset_res.data.response.numFound
      } catch(err){
        throw err.message
      }
      try {
        let suggest_res = await axios({
          method: 'POST',
          url:SOLR_SUGGEST_URI,
          data: { params: {
              'suggest.q': this.query.toLowerCase(),
            }},
        }).catch(function (error) {
            console.log('Error', error);
            this.handle_error()
        }.bind(this));
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
    perPage: state => state.perPageResults,
    numberOfPages: state => {
        let res = state.entities.length / state.perPageResults
        if (state.perPageResults * res < state.entities.length){
            res = res + 1
        }
        return res

    }
  },

})

