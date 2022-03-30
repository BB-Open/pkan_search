import {defineStore} from 'pinia';
import axios from 'axios';
import {useMessageStore} from '~/stores/messages.js'
import {FLASK_UNREACHABLE_MESSAGE, SOLR_SUGGEST_URI, SOLR_SELECT_URI} from "/etc/pkan/nuxt_config";


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
        reset_pagination_and_solr_get(){
            this.pagination_page = 1;
            this.getSolr()
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
                q: this.query,
                // todo: from and to with pagination
                start: (this.pagination_page - 1) * this.perPageResults,
                rows: this.perPageResults
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

