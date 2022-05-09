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
        showDeepLinks : false,
        sortOrder: 'score',
        suggestions: [],
        query: '',
    }),
    actions: {
        get_message_store() {
            return useMessageStore()
        },
        get_breadcrumb_store() {
            return useBreadcrumbStore()
        },
        get_router(){
            let router;
            try {
                router = useRouter()}
            catch (e){
                // Router not avaible on SSR, Deeplink is Client-Only content, but store is called by other stores
                // catch errors on SSR
                router = undefined
            }
            return router
        },

        set_deep_link() {
            let router = this.get_router();
            if (router !== undefined) {
                let currentRoute = router.currentRoute;
                let path = currentRoute.value.path;
                if (this.showDeepLinks) {
                    let newPath = currentRoute.value.path + "#/?" + this.getParams;
                    router.replace(newPath);
                } else {
                    router.replace(path)
                }
            }

        },
        load_query(){
          let router = this.get_router();
          if (router !== undefined) {
              let reset = true
              let query = router.currentRoute.value.query;
              console.log(router);
              console.log(query);
              if ('query' in query) {
                  this.query = query['query']
              }
              if ('facets' in query) {
                  this.facetsChoices = JSON.parse(query["facets"]);
                  console.log(this.facets)
              }
              if ('sortOrder' in query) {
                  this.sortOrder = query['sortOrder']
              }
              if ('pagination_page' in query) {
                  this.pagination_page = parseInt(query['pagination_page'])
                  reset = false
              }
              if (query && Object.keys(query).length !== 0) {
                  this.showDeepLinks = true
              }
              if (reset) {
                  this.reset_pagination_and_solr_get();
              } else {
                  this.getSolr()
              }
          }
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
        toggleDeepLinks() {
            this.showDeepLinks = !this.showDeepLinks
        },
        async reset_pagination_and_solr_get() {
            this.reset_pagination();
            await this.getSolr();
            console.log('New Data')
        },
        async query_solr(url, data) {
            let res;
            try {
                res = await useFetch(url, {
                    method: 'POST',
                    body: data,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        'Accept': 'application/json',
                    }
                })
            } catch (error) {
                console.log('Error', error);
                this.handle_error()
            }
            try {
                return JSON.parse(res.data.value)
            } catch (error) {
                console.log('Error', error);
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
            } catch (error) {
                console.log('Error', error);
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
            }
        ),
        getParams: state => {
            if (!state.showDeepLinks) {
                return ''
            }
            let params = '';
            params += "query=" + state.query;
            params += "&facets=" + JSON.stringify(state.facetsChoices);
            params += "&sortOrder=" + state.sortOrder;
            params += "&pagination_page=" + state.pagination_page;
            return params
        },
        showDeepLinksVal: state => state.showDeepLinks
    },

});

