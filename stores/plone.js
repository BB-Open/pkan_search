import {defineStore} from 'pinia';
import axios from 'axios';

const BASE_URL = 'https://backend.datenadler.de/@search?fullobjects=1';

export const usePloneStore = defineStore({
    id: 'plone-store',
    state: () => ({
        'plone': {}
    }),

    actions: {
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

            return await axios({
                    method: 'get',
                    url: data_url,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        'Accept': 'application/json',
                    }

                }
            )

        },
        extractSingleContent(res) {
            return res.data.items[0]
        },
        async ContentBySubject(type, tag) {
            console.log('Loading Data for ' + type + ' ' + tag)
            if (this.plone[type] === undefined) {
                this.plone[type] = {};
            } else if (this.plone[type][tag] !== undefined && this.plone[type][tag]['@id'] !== undefined) {
                return
            }
            this.plone[type][tag] = {
                'title': 'Titel wird geladen.',
                'description': 'Beschreibung wird geladen.',
                'text': {'data': '<div>Text wird geladen.</div>'}
            };
            let res = await this.QueryData(type, tag, 'created', undefined, 'reverse', 1);

            res = this.extractSingleContent(res);
            if (res !== undefined) {
                this.plone[type][tag] = res
            } else {
                this.plone[type][tag] = {
                    'title': 'Inhalt nicht gefunden.',
                    'description': '',
                    'text': {'data': ''}
                };
            }
            console.log(this.ploneState)
            // todo: Aria Polite
            // 'Die Seite ' + result.title + ' wurde geladen.'
        }
    },

    getters: {
        ploneState: state => state.plone,
        PortalTypeSubject: state => {
            return (portal_type, tag) => state.plone[portal_type][tag]
        }
    },

})