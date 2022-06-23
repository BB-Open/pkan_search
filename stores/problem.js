import {defineStore} from 'pinia';
import {useMessageStore} from '~/stores/messages.js'

import {MY_URL, FLASK_UNREACHABLE_MESSAGE, FLASK_URL_MESSAGE} from '/etc/pkan/nuxt_config'

export const useProblemStore = defineStore({
    id: 'problem',
    state: () => ({
        'info': '',
        'message': '',
        'route': ''
    }),
    actions: {
        page_loaded(){
            let messageStore = this.get_message_store();
            messageStore.write_polite('Die Seite Problem melden wurde geladen');
            messageStore.write_error('');
            messageStore.write_assertive('');
            this.info = ''
        },
        get_message_store(){
            return useMessageStore()
        },
        handle_error(){
            let messageStore = this.get_message_store();
            messageStore.write_assertive(FLASK_UNREACHABLE_MESSAGE);
            messageStore.write_error(FLASK_UNREACHABLE_MESSAGE);
        },
        set_route(message) {
            this.route = message
        },
        async send_message() {
            let messageStore = this.get_message_store();
            let dataset_res = await axios({
                method: 'POST',
                url: FLASK_URL_MESSAGE,
                data: {
                    message: this.message,
                    link: MY_URL + this.route
                },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json',
                }}
            ).catch(function (error) {
                console.log('Error', error);
                this.handle_error()
            }.bind(this));

            this.message = '';
            this.info = 'Ihre Nachricht wurde gesendet.';
            messageStore.write_polite('Ihre Nachricht wurde gesendet.');
            messageStore.write_error('');
            messageStore.write_assertive('')
        }

    },
    getters: {
        infoMessage: state => state.info,
    },
});