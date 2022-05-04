import {defineStore} from 'pinia';


export const useBreadcrumbStore = defineStore({
    id: 'breadcrumb',
    state: () => ({
        // never changed titles, not overwritten by dynamic Content e.g. Plone
        static_titles: {
            '/': 'Start',
        },
        // includes some initial values which can be changed by dynamic content
        dynamic_titles: {
            '/blog': 'Aktuelles',
            '/problem': 'Fehler melden',
            '/search': 'Suche',
            '/publisher': 'Datenbereitsteller'
        },
        elements: ['/'],
    }),
    actions: {
        get_router(){
            let router;
            try {
                router = useRouter()}
            catch (e){
                // Router not avaible on SSR, BreadCrumb is Client-Only content, but store is called by other stores
                // catch errors on SSR
                router = undefined
            }
            return router
        },
        set_title(title) {
            let router = this.get_router();
            if (router!==undefined){
                let path = router.currentRoute.value.path;
                this.dynamic_titles[path] = title;
            }
        },
        get_elements(){
            let router = this.get_router();
            if (router!==undefined){
                let res = [];
                let path = router.currentRoute.value.path;
                if (path === '/'){
                    this.elements = ['/'];
                    return
                }
                let elements = path.split('/');
                let sub_path = '';
                elements.forEach(function (item) {
                    sub_path += '/';
                    sub_path += item;
                    sub_path = sub_path.replace('//', '/');
                    res.push(sub_path);
                    if (!sub_path in this.dynamic_titles){
                        this.dynamic_titles[sub_path] = sub_path
                    }

                }, this);
                this.elements = res
            } else {
                this.elements = ['/']
            }
        }

    },
    getters: {
        BCTitle: state => {
            return (url) => {
                if ( url in state.static_titles) {
                    return state.static_titles[url]
                } else {
                    return state.dynamic_titles[url]
                }
            }
        },
        BCElements: state => state.elements
    }
});