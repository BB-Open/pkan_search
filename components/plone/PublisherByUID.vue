<template>

    <div v-if="ploneStore.UID(props.uid)">
        <div class="box_area plone_box_area">
            <div class="text_area">
                <h1>{{ ploneStore.UID(props.uid).title }}</h1>

                <div v-if="ploneStore.UID(props.uid).description" class="description">{{ ploneStore.UID(props.uid).description}}</div>
                <div v-html="ploneStore.removeSelfClosingTags(ploneStore.UID(props.uid).text.data)" v-if="ploneStore.UID(props.uid).text"></div>
            </div>

            <div class="element_logo" v-if="ploneStore.UID(props.uid).logo"><img :src="ploneStore.UID(props.uid).logo.download" :alt="ploneStore.UID(props.uid).title + ' Logo'"/></div>
        </div>
        <button class="link" @click="onClick(ploneStore.UID(props.uid).foaf_name)">
            Zu den Daten von "{{ploneStore.UID(props.uid).foaf_name}}"
        </button>
    </div>
    
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {useEntityStore} from '~/stores/entities'

    const entityStore = useEntityStore();

    const ploneStore = usePloneStore();

    const router = useRouter();

    const props = defineProps({
        uid: {required: true},
    });

    ploneStore.ContentByUID(props.uid);

    const onClick = (choice) => {
        entityStore.reset_all();
        entityStore.facetsChoices['dct_publisher_facet'][choice] = 1;
        router.push('/search')
    };
</script>

<style scoped>
    .element_logo img {
        max-width: 150px;
    }

    .plone_box_area {
        padding: 0;
        margin: 0;
    }

    .link {
        background: none;
        border-radius: unset;
        border: none;
        padding: 0!important;
        /*optional*/
        font-family: arial, sans-serif;
        /*input has OS specific font-family*/
        cursor: pointer;
    }

    .link, .link:visited {
        color: #C73C35;
        text-decoration: underline;
    }

    .link:hover, .link:active, .link:focus {
        color: #161616;
        background-color: #FFCC00;
    }

</style>