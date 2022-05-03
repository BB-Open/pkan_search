import {defineStore} from 'pinia';
import axios from 'axios';

import {useMessageStore} from '~/stores/messages.js'
import {useBreadcrumbStore} from '~/stores/breadcrumb.js'

import {PLONE_UNREACHABLE_MESSAGE, BASE_URL, FLASK_URL_PLONE} from '/etc/pkan/nuxt_config'

export const usePloneStore = defineStore({
    id: 'plone-store',
    state: () => ({
        'ploneSubject': {},
        'ploneListing': {},
        'ploneUID': {}
    }),

    actions: {
        get_message_store(){
            return useMessageStore()
        },
        get_breadcrumb_store(){
            return useBreadcrumbStore()
        },
        handle_error(){
          let messageStore = this.get_message_store();
          messageStore.write_assertive(PLONE_UNREACHABLE_MESSAGE);
          messageStore.write_error(PLONE_UNREACHABLE_MESSAGE);
        },
        removeSelfClosingTags(html) {
            // this is ugly but we need it to clean plone html
            if (html === undefined) {
                return ''
            }
            var split = html.split("/>");
            var newHtml = "";
            for (var i = 0; i < split.length - 1; i++) {
                var edsplit = split[i].split("<");
                newHtml += split[i] + "></" + edsplit[edsplit.length - 1].split(" ")[0] + ">";
            }
            return newHtml + split[split.length - 1];
        },
        async QueryData(type, tag, sort_on, uid, sort_order, max_number) {
            let data_url = BASE_URL;

            if (type !== undefined) {
                data_url += '&portal_type=' + type
            }

            if (sort_on !== undefined) {
                data_url += '&sort_on=' + sort_on
            }

            if (sort_order !== undefined) {
                data_url += '&sort_order=' + sort_order
            }
            if (max_number !== undefined) {
                data_url += '&sort_limit=' + max_number
            }

            if (tag !== undefined) {
                data_url += '&Subject=' + tag
            }

            if (uid !== undefined) {
                data_url += '&UID=' + uid
            }

            let data = {
                'plone_url': data_url
            }

            return axios({
                method: 'POST',
                url: FLASK_URL_PLONE,
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
        extractSingleContent(res) {
            return res.data.items[0]
        },
        extractListingContent(res) {
            return res.data.items
        },
        async ContentBySubject(type, tag, write_title=true) {
            console.log('Loading Data for ' + type + ' ' + tag);
            let messageStore = this.get_message_store();
            let breadcrumbStore = this.get_breadcrumb_store()
            if (this.ploneSubject[type] === undefined) {
                this.ploneSubject[type] = {};
            } else if (this.ploneSubject[type][tag] !== undefined && this.ploneSubject[type][tag]['@id'] !== undefined) {
                if (write_title === true) {
                    breadcrumbStore.set_title(this.ploneSubject[type][tag]['title']);
                    let message = 'Die Seite ' + this.ploneSubject[type][tag]['title'] + ' wurde geladen.';
                    messageStore.write_polite(message);
                    messageStore.write_error('');
                    messageStore.write_assertive('');
                }
                return
            }
            this.ploneSubject[type][tag] = {
                'title': 'Titel wird geladen.',
                'description': 'Beschreibung wird geladen.',
                'text': '<div>Text wird geladen.</div>'
            };
            if (write_title === true) {
                breadcrumbStore.set_title(this.ploneSubject[type][tag]['title']);
            }

            let res = await this.QueryData(type, tag, 'created', undefined, 'reverse', 1);

            if (res === undefined) {
                return
            }

            res = this.extractSingleContent(res);
            if (res !== undefined) {
                this.ploneSubject[type][tag] = res
            } else {
                this.ploneSubject[type][tag] = {
                    'title': 'Inhalt nicht gefunden.',
                    'description': '',
                    'text': '',
                };
            }
            if (write_title === true) {
                breadcrumbStore.set_title(this.ploneSubject[type][tag]['title']);
                let message = 'Die Seite ' + this.ploneSubject[type][tag]['title'] + ' wurde geladen.';
                messageStore.write_polite(message);
                messageStore.write_error('');
                messageStore.write_assertive('');
            }

        },
        async ListingByType(type, title){
            console.log('Loading Listing Data for ' + type);
            let messageStore = this.get_message_store();
            if (this.ploneListing[type] !== undefined && this.ploneListing[type]['items'] !== undefined) {
                let message = 'Die Seite ' + title + ' wurde geladen.';
                messageStore.write_polite(message);
                messageStore.write_error('');
                messageStore.write_assertive('');
                return
            }
            this.ploneListing[type] = [];
            let res = await this.QueryData(type, undefined, 'sortable_title', undefined, undefined, undefined);
            console.log(res)
            if (res === undefined) {
                return
            }

            res = this.extractListingContent(res);
            console.log(res)
            if (res !== undefined) {
                this.ploneListing[type] = res
            } else {
                this.ploneListing[type] = {
                    'title': 'Inhalt nicht gefunden.',
                    'description': '',
                    'text': {'data': ''}
                };
            }
            let message = 'Die Seite ' + title + ' wurde geladen.';
            messageStore.write_polite(message);
            messageStore.write_error('');
            messageStore.write_assertive('');
        },
        async ListingBySubject(type, tag, title) {
            console.log('Loading Listing Data for ' + type + ' ' + tag);
            let messageStore = this.get_message_store();
            if (this.ploneListing[type] === undefined) {
                this.ploneListing[type] = {};
            } else if (this.ploneListing[type][tag] !== undefined && this.ploneListing[type][tag]['items'] !== undefined) {
                let message = 'Die Seite ' + title + ' wurde geladen.';
                messageStore.write_polite(message);
                messageStore.write_error('');
                messageStore.write_assertive('');
                return
            }
            this.ploneListing[type][tag] = [];
            let res = await this.QueryData(type, tag, 'created', undefined, 'reverse', undefined);

            if (res === undefined) {
                return
            }

            res = this.extractListingContent(res);
            if (res !== undefined) {
                this.ploneListing[type][tag] = res
            } else {
                this.ploneListing[type][tag] = {
                    'title': 'Inhalt nicht gefunden.',
                    'description': '',
                    'text': {'data': ''}
                };
            }
            let message = 'Die Seite ' + title + ' wurde geladen.';
            messageStore.write_polite(message);
            messageStore.write_error('');
            messageStore.write_assertive('');
        },
        async ContentByUID(uid) {
            console.log('Loading Data for UID ' + uid);
            let messageStore = this.get_message_store();
            let breadcrumbStore = this.get_breadcrumb_store()
            if (this.ploneUID[uid] !== undefined && this.ploneUID[uid]['@id'] !== undefined) {
                let message = 'Die Seite ' + this.ploneUID[uid]['title'] + ' wurde geladen.';
                messageStore.write_polite(message);
                messageStore.write_error('');
                messageStore.write_assertive('');
                return
            }
            this.ploneUID[uid] = {
                'title': 'Titel wird geladen.',
                'description': 'Beschreibung wird geladen.',
                'text': '<div>Text wird geladen.</div>'
            };
            breadcrumbStore.set_title(this.ploneUID[uid]['title']);
            let res = await this.QueryData(undefined, undefined, 'created', uid, 'reverse', 1);

            if (res === undefined) {
                return
            }

            res = this.extractSingleContent(res);
            if (res !== undefined) {
                this.ploneUID[uid] = res
            } else {
                this.ploneUID[uid] = {
                    'title': 'Inhalt nicht gefunden.',
                    'description': '',
                    'text': {'data': ''}
                };
            }
            breadcrumbStore.set_title(this.ploneUID[uid]['title']);
            let message = 'Die Seite ' + this.ploneUID[uid]['title'] + ' wurde geladen.';
            messageStore.write_polite(message);
            messageStore.write_error('');
            messageStore.write_assertive('');
        },
    },

    getters: {
        PortalTypeSubject: state => {
            return (portal_type, tag) => state.ploneSubject[portal_type][tag]
        },
        PortalTypeSubjectListing: state => {
            return (portal_type, tag) => state.ploneListing[portal_type][tag]
        },
        UID: state => {
            return (uid) => state.ploneUID[uid]
        },
    },

})