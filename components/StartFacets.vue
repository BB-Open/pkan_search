<template>
    <ul class="nobull category box_area">
        <li class="box"
            v-for="item in elements"
            @click="onClick(item.title)"
            @keydown.enter.prevent="onClick(item.title)" >
            <div class="lightbutton button vocabbutton" :aria-label="item.title" tabindex="0">
                <div class="category_label">
                    <div class="category_icon">
                        <div :class="item.icon + ' bb-ifa'">
                        </div>
                        <br class="hidesmallscreen"/>
                    </div>
                    <div class="category_text" aria-hidden="true">{{item.title}}</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import {useEntityStore} from '~/stores/entities'

    const entityStore = useEntityStore();
    const router = useRouter();

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

    const onClick = (choice) => {
        entityStore.facetsChoices['dcat_theme_facet'][choice] = 1;
        router.push('/search')
    };
</script>

<style scoped>

    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .box {
        width: 200px;
    }

    .vocabbutton {
        width: 100%;
        height: 100%;
        padding: 15px;
    }

    .vocabbutton {
        text-decoration: none;
        display: block;
        height: 100%;
        width: 100%;
    }

    .vocabbutton:hover, .vocabbutton:focus {
        background-color: #C13B33;
        color: #fff;
    }

    @media (max-width: 640px) {

      .box {
        width: 100%;
      }
    }

</style>
