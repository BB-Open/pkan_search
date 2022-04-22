<template>
    <div class='facet'>
        <h3 class='facet_name'>{{facetTitle}}</h3>
        <form ref="checkboxForm">
            <ul class="nobull">
                <li  v-for='item in entries'>
                    <div v-if="item.count > 0 || item.checked">
                        <input type='checkbox' :checked='item.checked' @click='onClick(item.val)' :name="item.val "
                               :id="item.val" @keydown.enter.prevent="onClick(item.val)">
                        <label :for="item.val" :class="item.checked && 'checked'"><span class='name_column'>{{item.val}}</span> <span class='count_column'>{{item.count}}</span></label>
                    </div>
                </li>
            </ul>
        </form>
    </div>
</template>

<script setup lang="ts">

    import {useEntityStore} from '~/stores/entities'
    import {computed, ref, nextTick} from "vue";

    const entityStore = useEntityStore();
    const checkboxForm = ref();

    const props = defineProps({
        facet: {type: Object, required: true},
        facetName: {type: String, required: true},
        facetTitle: {type: String, required: true},
    });

    const entries = computed(() => {
        const res = {};
        if (props.facet.buckets) {
            for (const entry of entityStore.facets[props.facetName]?.buckets) {
                res[entry.val] = {val: entry.val, checked: isChecked(entry.val), count: entry.count}
            }
        }
        if (props.facetName in entityStore.facetsChoices) {
            Object.entries(entityStore.facetsChoices[props.facetName]).forEach(([key, value]) => {
                if (key in res) {
                    res[key].checked = true
                } else {
                    res[key] = {val: key, checked: true, count: 0}
                }
            })
        }
        return res
    })

    const isChecked = (choice) => {
        return choice in entityStore.facetsChoices[props.facetName]
    };

    const onClick = async (choice) => {
        if (choice in entityStore.facetsChoices[props.facetName]) {
            delete entityStore.facetsChoices[props.facetName][choice]
        } else {
            entityStore.facetsChoices[props.facetName][choice] = 1
        }
        await entityStore.reset_pagination_and_solr_get();
        nextTick(() => {
            // we need to reference form and get children, cause children are dynamic content and
            // can't be called by ref() as Input
            console.log('Set Focus for ' + choice);
            let ref_facet  = checkboxForm.value
            for (let i = 0; i < ref_facet.length; i++) {
                let input = ref_facet[i];
                if (input.id === choice) {
                    input.focus();
                    break
                }
            }
        });


        // ref(props.facetTitle + '_' + choice).focus()
    };
</script>

<style scoped>

    .checked {
      font-weight: 700;
    }

    .facet {
      margin-bottom: 0.9rem;
      background-color: #eeeeee;
      padding: 0.1rem;
    }

    .facet h3{
      font-size: 1.2rem;
      font-style: normal;
    }

    .facet_name {
      margin-bottom: 0.1rem;
    }

    .name_column {
      font-size: 0.8rem;
    }

    .count_column {
      margin-left: 1rem;
      font-size: 0.8rem;
    }

    li div label:hover {
      text-decoration: underline;
      background-color: unset;
      color: #C13B33;
    }

    ul {
      margin-top: 0;  /* important for vertical alignment */
      margin-bottom: 0; /* important for vertical alignment */
    }

</style>
