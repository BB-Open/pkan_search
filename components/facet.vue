<template>
    <div class='facet'>
        <h3 class='facet_name'>{{facetTitle}}</h3>
        <form ref="checkboxForm">
            <ul class="nobull">
                <li  v-for='item in entries'>
                    <div v-if="item.count > 0 || item.checked" class="parent">
                        <div class="input_checkbox">
                        <input type='checkbox' :checked='item.checked' @click='onClick(item.val)' :name="item.val "
                               :id="item.val" @keydown.enter.prevent="onClick(item.val)">
                        </div>
                        <div class="label">
                          <label :for="item.val" :class="item.checked && 'checked'"><span class='name_column'>{{item.val}}</span> <span class='count_column'>[{{item.count}}]</span></label>
                        </div>
                    </div>
                </li>
            </ul>
        </form>
      <div v-if="entries_length > DEFAULT_DISPLAY_AMOUNT_FACET">
        <button @click="displayAll=!displayAll" class="facet_button"><span v-if="!displayAll">weiter &gt;&gt;</span><span v-else>weniger &lt;&lt;</span></button>
      </div>
    </div>
</template>

<script setup lang="ts">

import {useEntityStore} from '~/stores/entities'
import {computed, nextTick, ref} from "vue";
import {DEFAULT_DISPLAY_AMOUNT_FACET} from '/etc/pkan/nuxt_config'


const entityStore = useEntityStore();
    const checkboxForm = ref();
const displayAll = ref(false)
const entries_length = ref(0)

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
      entries_length.value = Object.keys(res).length
      if (!displayAll.value) {
        return Object.fromEntries(Object.entries(res).slice(0, DEFAULT_DISPLAY_AMOUNT_FACET))
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

    .label {
        padding-left: 2px;
    }

    .parent {
        display: flex;
    }

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

    .facet_button {
      font-size: 0.8rem;
      border-radius: 0;
      border: 1px solid #C13B33;
      padding: 2px;
    }

    .facet_button:hover, .facet_button:focus {
      background: white;
      color: #C13B33;
    }

</style>
