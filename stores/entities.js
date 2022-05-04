import {defineStore} from 'pinia';
import {useMessageStore} from '~/stores/messages.js'
import {useBreadcrumbStore} from '~/stores/breadcrumb.js'
import {FLASK_UNREACHABLE_MESSAGE, SOLR_SUGGEST_URI, SOLR_SELECT_URI, SOLR_PICK_URI} from "/etc/pkan/nuxt_config";

const facetsChoicesDefault = {
    'dct_publisher_facet': {},
    'dcat_theme_facet': {},
    'dct_license_facet': {},
    'dct_format_facet': {},
    'rdf_type': {},
};

const facetsDefault = {
    'dct_publisher_facet': {buckets: []},
    'dcat_theme_facet': {buckets: []},
    'dct_license_facet': {buckets: []},
    'dct_format_facet': {buckets: []},
    'rdf_type': {buckets: []},
};


export const useEntityStore = defineStore({
    id: 'entity-store',
    state: () => ({
        dataset_uri: undefined,
        dataset: {},
        entities: [],
        entityTotalCount: 0,
        // We need deep clone here
        facets: JSON.parse(JSON.stringify(facetsDefault)),
        facetsChoices: JSON.parse(JSON.stringify(facetsChoicesDefault)),
        isBlur: false,
        perPageResults: 10,
        pagination_page: 1,
        suggestions: [],
        query: '',
        sortOrder: 'score',
    }),
    actions: {
        get_message_store() {
            return useMessageStore()
        },
        get_breadcrumb_store() {
            return useBreadcrumbStore()
        },
        handle_error() {
            let messageStore = this.get_message_store();
            messageStore.write_assertive(FLASK_UNREACHABLE_MESSAGE);
            messageStore.write_error(FLASK_UNREACHABLE_MESSAGE);
        },
        reset_facetsChoices() {
            // we need deep clone here
            this.facetsChoices = JSON.parse(JSON.stringify(facetsChoicesDefault));
        },
        reset_query() {
            this.query = ''
        },
        reset_facets() {
            // we need deep clone here
            this.facets = JSON.parse(JSON.stringify(facetsDefault))
        },
        reset_pagination() {
            this.pagination_page = 1
        },
        reset_sortorder() {
            this.sortOrder = 'score'
        },
        reset_all() {
            this.reset_facets();
            this.reset_facetsChoices();
            this.reset_query();
            this.reset_pagination();
            this.reset_sortorder();
            console.log('Reset all');
        },
        async reset_pagination_and_solr_get() {
            this.reset_pagination();
            await this.getSolr();
            console.log('New Data')
        },
        async query_solr(url, data) {
            try {
                let res = await useFetch(url, {
                    method: 'POST',
                    body: data,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        'Accept': 'application/json',
                    }
                })
            } catch {
                console.log('Error', error);
                this.handle_error()
            }
            try {
                return JSON.parse(res.data.value)
            } catch {
                this.handle_error()
            }
        },
        async getSolr() {
            let data = {
                q: this.query,
                sort: this.sortOrder,
                start: (this.pagination_page - 1) * this.perPageResults,
                rows: this.perPageResults,
                choices: this.facetsChoices,
            };
            let dataset_res = await this.query_solr(SOLR_SELECT_URI, data);

            if (dataset_res === undefined) {

            } else {
                this.entities = dataset_res.response.docs;
                this.entityTotalCount = dataset_res.response.numFound;
                if (dataset_res.facets.count == 0) {
                    this.reset_facets()
                } else {
                    this.facets = dataset_res.facets;
                }
            }

            data = {
                params: {
                    'suggest.q': this.query,
                }
            };

            let suggest_res;

            try {
                suggest_res = await this.query_solr(SOLR_SUGGEST_URI, data);
            } catch {
                // SSR
                suggest_res = undefined;
            }

            if (suggest_res === undefined) {

            } else {
                if (suggest_res.suggest.mySuggester[this.query].numFound > 0) {
                    this.suggestions = suggest_res.suggest.mySuggester[this.query].suggestions
                } else {
                    this.suggestions = []
                }
            }
        },
        async getDataset() {
            let data = {
                q: this.dataset_uri,
            };
            let dataset_res = await this.query_solr(SOLR_PICK_URI, data);
            this.dataset = dataset_res.response.docs[0];
            let messageStore = this.get_message_store();
            let breadcrumbStore = this.get_breadcrumb_store()
            let title = 'Kein Titel vorhanden'
            if (this.dataset.dct_title !== undefined) {
                title = this.dataset.dct_title
            }
            breadcrumbStore.set_title(title);
            let message = 'Die Seite ' + title + ' wurde geladen.';
            messageStore.write_polite(message);
            messageStore.write_error('');
            messageStore.write_assertive('');
        }
    },

    getters: {
        entityList: state => state.entities,
        entityCount: state => state.entities.length,
        is_suggestions: state => state.suggestions.length > 0,
        numberOfPages: state => {
            let res = state.entityTotalCount / state.perPageResults;
            return Math.ceil(res)
        },
        perPage: state => state.perPageResults,
        offset: state => {
            return state.perPageResults * (state.pagination_page - 1) + 1
        },
        suggestionList: state => state.suggestions.map(
            sug => {
                return {label: sug.term, count: sug.weight}
            }),
    },

});

