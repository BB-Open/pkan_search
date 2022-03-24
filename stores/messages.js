import {defineStore} from 'pinia';


export const useMessageStore = defineStore({
    id: 'messages',
    state: () => ({
        'error': '',
        'aria_polite': '',
        'aria_assertive': ''
    }),
    actions: {
        write_assertive(message) {
            console.log('Assertive Message')
            console.log(message)
            this.aria_assertive = message
        },
        write_polite(message) {
            console.log('Polite Message')
            console.log(message)
            this.aria_polite = message
        },
        write_error(message) {
            console.log('Error Message')
            console.log(message)
            this.error = message
        }

    },
    getters: {
        errorMessage: state => state.error,
        politeMessage: state => state.aria_polite,
        assertiveMessage: state => state.aria_assertive
    },
});