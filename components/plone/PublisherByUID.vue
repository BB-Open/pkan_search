<template>

    <div v-if="ploneStore.UID(props.uid)">
        <div class="box_area plone_box_area">
            <div class="text_area">
                <div class="header">
                    <div>
                        <h1>{{ ploneStore.UID(props.uid).title }}</h1>
                        <div v-if="ploneStore.UID(props.uid).description" class="description">{{
                            ploneStore.UID(props.uid).description}}
                        </div>
                    </div>
                    <div class="element_logo" ><img v-if="ploneStore.UID(props.uid).logo"
                            :src="ploneStore.UID(props.uid).logo.download"
                            :alt="ploneStore.UID(props.uid).title + ' Logo'"/></div>
                </div>
                <div v-html="ploneStore.removeSelfClosingTags(ploneStore.UID(props.uid).text)"
                     v-if="ploneStore.UID(props.uid).text" class="plone_content"></div>

            </div>
            <button class="link" @click="onClick(ploneStore.UID(props.uid).foaf_name)">
                Zu den Daten von "{{ploneStore.UID(props.uid).foaf_name}}"
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {useEntityStore} from '~/stores/entities'
    import {onMounted, onServerPrefetch} from 'vue'

    const entityStore = useEntityStore();

    const ploneStore = usePloneStore();

    const router = useRouter();

    const props = defineProps({
        uid: {required: true},
    });

    onMounted(async () => {
        await ploneStore.ContentByUID(props.uid);
    })

    onServerPrefetch(async () => {
        await ploneStore.ContentByUID(props.uid);
    })

    const onClick = (choice) => {
        entityStore.reset_all();
        entityStore.facetsChoices['dct_publisher_facet'][choice] = 1;
        router.push('/search')
    };
</script>

<style scoped>

    .text_area {
        width: 100%;
    }

    .header {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .plone_content {
        width: 100%;
    }

    .element_logo {
        font-size: 2rem;
        margin-top: 0.2em;
        width: 250px
    }

    .element_logo img {
        width: 250px;
    }

    .plone_box_area {
        padding: 0;
        margin: 0;
    }

    .link {
        background: none;
        border-radius: unset;
        border: none;
        padding: 0 !important;
        /*optional*/
        font-family: arial, sans-serif;
        /*input has OS specific font-family*/
        cursor: pointer;
    }

    .link, .link:visited {
        color: #C13B33;
        text-decoration: underline;
    }

    .link:hover, .link:active, .link:focus {
        color: #161616;
        background-color: #FFCC00;
    }

</style>