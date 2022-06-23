import {defineStore} from 'pinia';

import {useMessageStore} from '~/stores/messages.js'
import {useBreadcrumbStore} from '~/stores/breadcrumb.js'

import {FLASK_URL_PLONE, PLONE_UNREACHABLE_MESSAGE} from '/etc/pkan/nuxt_config'
import {is_external_link} from "~/stores/utils";

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
        improveAccessibility(html) {
            // this is ugly but we need it to clean plone html

            if (html === undefined) {
                return ''
            }
            // aria-label to external a tags
            let parser = undefined
            try {
                parser = new DOMParser();
            } catch {
                console.log('No Parser available')
            }
            console.log(html)
            if (parser !== undefined){
                let htmlDoc = parser.parseFromString(html, 'text/html');
                let elements = htmlDoc.getElementsByTagName( 'a' )
                Array.from(elements).forEach((a_tag) => {
                    let href = a_tag.href
                    if (is_external_link(href)){
                        a_tag.innerHTML += '<em class="external_link" aria-label="Externer Link"></em>'
                    }
                })
                html = htmlDoc.body.innerHTML
                html = html.replaceAll('&nbsp;', ' ')
            }
            // remove self closing tags
            var split = html.split("/>");
            var newHtml = "";
            for (var i = 0; i < split.length - 1; i++) {
                var edsplit = split[i].split("<");
                newHtml += split[i] + "></" + edsplit[edsplit.length - 1].split(" ")[0] + ">";
            }
            newHtml = newHtml + split[split.length - 1];
            console.log(newHtml)
            return newHtml
        },
        async QueryData(type, tag, sort_on, uid, sort_order, max_number) {
            let data = {};

            if (type !== undefined) {
                data['portal_type'] = type
            }

            if (sort_on !== undefined) {
                data['sort_on'] = sort_on
            }

            if (sort_order !== undefined) {
                data['sort_order'] = sort_order
            }
            if (max_number !== undefined) {
                data['sort_limit'] = max_number
            }

            if (tag !== undefined) {
                data['Subject'] = tag
            }

            if (uid !== undefined) {
                data['UID'] = uid
            }

            let res;

            try {
                res = await useFetch(FLASK_URL_PLONE, {
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
        extractSingleContent(res) {
            try {
                return res.items[0]
            } catch (error) {
                console.log('Error', error);
                console.log(res)
                this.handle_error()
            }
        },
        extractListingContent(res) {
            try {
                return res.items
            } catch (error) {
                console.log('Error', error);
                console.log(res)
                this.handle_error()
            }
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
            if (res === undefined) {
                return
            }

            res = this.extractListingContent(res);
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
            return (portal_type, tag) => {
                if (state.ploneListing[portal_type]) {
                return state.ploneListing[portal_type][tag]
                } else {
                    return undefined
                }
            }
        },
        UID: state => {
            return (uid) => state.ploneUID[uid]
        },
    },

})