<template>
    <ul class="nobull category box_area">
        <li class="box"
            v-for="item in elements"
            @click="onClick(item.title)">
            <nuxt-link
                    to="/search"
                    class="lightbutton button vocabbutton">
                <div class="category_label">
                    <div class="category_icon">
                        <i :class="item.icon + ' bb-ifa'"
                           :aria-label="item.title"
                        ></i>
                        <br class="hidesmallscreen"/>
                    </div>
                    <div class="category_text">{{item.title}}</div>
                </div>
            </nuxt-link>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import {useEntityStore} from '~/stores/entities'

    const entityStore = useEntityStore();

    const elements = [
        {
            'title': 'Bevölkerung und Gesellschaft',
            'icon': 'fa-users'
        },
        {
            'title': 'Bildung, Kultur und Sport',
            'icon': 'fa-laptop'
        },
        {
            'title': 'Energie',
            'icon': 'fa-battery-full'
        },
        {
            'title': 'Gesundheit',
            'icon': 'fa-stethoscope'
        },
        {
            'title': 'Internationale Themen',
            'icon': 'fa-globe'
        },
        {
            'title': 'Justiz, Rechtssystem und öffentliche Sicherheit',
            'icon': 'fa-balance-scale'
        },
        {
            'title': 'Landwirtschaft, Fischerei, Forstwirtschaft und Nahrungsmittel',
            'icon': 'fa-tree'
        },
        {
            'title': 'Regierung und öffentlicher Sektor',
            'icon': 'fa-inbox'
        },
        {
            'title': 'Regionen und Städte',
            'icon': 'fa-building'
        },
        {
            'title': 'Umwelt',
            'icon': 'fa-leaf'
        },
        {
            'title': 'Verkehr',
            'icon': 'fa-train'
        },
        {
            'title': 'Wirtschaft und Finanzen',
            'icon': 'fa-shopping-cart'
        },
        {
            'title': 'Wissenschaft und Technologie',
            'icon': 'fa-microchip'
        },
    ];

    entityStore.facetsChoices = {
        'dcterms_publisher_facet': {},
        'dcat_theme_facet': {},
        'dcterms_license_facet': {},
        'dcterms_format_facet': {},
    };

    const onClick = (choice) => {
        entityStore.facetsChoices['dcat_theme_facet'][choice] = 1;
        let router = useRouter();
        router.push('/search')

    };
</script>

<style scoped>
    li.box {
        display: block;
    }

    .vocabbutton {
        width: 100%;
        height: 100%;
        padding: 15px;
    }

    a.vocabbutton {
        text-decoration: none;
        display: block;
        height: 100%;
        width: 100%;
    }

    a.vocabbutton:hover, a.vocabbutton:focus {
        background-color: #C73C35;
        color: #fff;
    }

</style>