import {defineStore} from 'pinia';
import axios from 'axios';
import {useMessageStore} from '~/stores/messages.js'

//const SOLR_SELECT_URI='http://test.datenadler.de/solr/LGB3/select'
//const SOLR_SUGGEST_URI='http://test.datenadler.de/solr/LGB3/suggest'
const SOLR_SELECT_URI='http://flask.datenadler.lan/solr_search'
const SOLR_SUGGEST_URI='http://flask.datenadler.lan/solr_suggest'

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
        isBlur: false,
        perPageResults: 10,
        pagination_page: 1,
    }),
    actions: {
        get_message_store() {
            return useMessageStore()
        },
        handle_error() {
            let messageStore = this.get_message_store();
            messageStore.write_assertive(FLASK_UNREACHABLE_MESSAGE);
            messageStore.write_error(FLASK_UNREACHABLE_MESSAGE);
        },
        async query_solr(url, data) {
            return axios({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json',
                }
            }).catch(function (error) {
                console.log('Error', error);
                this.handle_error()
            }.bind(this));
        },
        async getSolr() {
            let data = {
                query: this.query,
                // todo: from and to with pagination
                // start: (this.pagination_page - 1) * this.perPageResults,
                // rows: this.perPageResults
            };
            let dataset_res = await this.query_solr(SOLR_SELECT_URI, data);

            if (dataset_res === undefined) {

            } else {
                console.log(dataset_res)
                this.entities = dataset_res.data.response.docs;
                this.entityCount = dataset_res.data.response.numFound
            }

            data = {
                params: {
                    'suggest.q': this.query.toLowerCase(),
                }
            };

            let suggest_res = await this.query_solr(SOLR_SUGGEST_URI, data);

            if (suggest_res === undefined) {

            } else {
                if (suggest_res.data.suggest.mySuggester[this.query.toLowerCase()].numFound > 0) {
                    this.suggestions = suggest_res.data.suggest.mySuggester[this.query.toLowerCase()].suggestions
                } else {
                    this.suggestions = []
                }
            }
        }
    },

    getters: {
        entityList: state => state.entities,
        is_suggestions: state => state.suggestions.length > 0,
        suggestionList: state => state.suggestions.map(
            sug => {
                return {label: sug.term, count: sug.weight}
            }),
        perPage: state => state.perPageResults,
        numberOfPages: state => {
            let res = state.entityCount / state.perPageResults;
            return Math.ceil(res)

        }
    },

});

