<template>
  <div class="textsearch">
  <label class="">
    <span class="hidden_help_text">Geben Sie hier die Suchbegriffe ein, um in den Datensätzen zu suchen. Sie werden automatisch zur Suchseite weiter geleitet, sobald Sie eine Taste betätigen.</span>
    <input
        ref="startInput"
        type="text"
        v-model="entityStore.query"
        placeholder="In den Datensätzen suchen"
        class="single_line_edit"
        @keyup="redirect_search"></label>
    <span class="input_button">
    <button
            @click="router.push('/search')"
            class="button textsearch_button"
            type="submit" title="Search" aria-label="Suchen - Sie werden zur Suchseite geleitet">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           width="30" height="30"
           viewBox="0 0 172 172"
           style=" fill:#000000;"
           role="img"
           aria-label="Suchen"
      >
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
           stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
            font-size="none" style="mix-blend-mode: normal">
          <path d="M0,172v-172h172v172z" fill="none"></path>
          <g fill="#c73c35">
            <path
                    d="M11.99038,6.61538c-2.92007,0 -5.375,2.40324 -5.375,5.375v148.01923c0,2.97176 2.45493,5.375 5.375,5.375h148.01923c2.92007,0 5.375,-2.40324 5.375,-5.375v-148.01923c0,-2.97176 -2.45493,-5.375 -5.375,-5.375zM72.76923,33.07692c21.91346,0 39.69231,17.77885 39.69231,39.69231c0,8.57933 -2.81671,16.46094 -7.44231,22.94712l34.73077,34.52404c0.82692,0.80108 0.67188,3.25601 -2.89423,6.82212c-3.5661,3.56611 -5.6851,3.61779 -6.61538,2.6875c-0.93029,-0.93029 -34.52404,-34.73077 -34.52404,-34.73077c-6.48618,4.6256 -14.36779,7.44231 -22.94712,7.44231c-21.91346,0 -39.69231,-17.77885 -39.69231,-39.69231c0,-21.91346 17.77885,-39.69231 39.69231,-39.69231zM72.76923,46.30769c-14.6262,0 -26.46154,11.83534 -26.46154,26.46154c0,14.62621 11.83534,26.46154 26.46154,26.46154c14.62621,0 26.46154,-11.83533 26.46154,-26.46154c0,-14.6262 -11.83533,-26.46154 -26.46154,-26.46154z"></path>
          </g>
        </g>
      </svg>
    </button></span></div>
</template>

<script setup lang="ts">

import {useEntityStore} from '~/stores/entities'
import {onMounted} from "vue";

const entityStore = useEntityStore();

const router = useRouter();

function redirect_search() {
  if (entityStore.query !== '') {
    router.push('/search')
  }
}
// focussing the input on entering the site
const startInput = ref()
onMounted(() => {
  setTimeout(() => {startInput.value.focus()}, 10)
})
  entityStore.reset_all()
</script>

<style scoped>
  .textsearch {
    display: table;
    width: 100%;
    margin-bottom: 1rem;
  }

  .single_line_edit {
    margin: 0;
    white-space: nowrap;
    display: table-cell;
    vertical-align: middle;
    padding-left: 5px;
    height: 30px;
    width: 100%;
  }

  .textsearch_button {
    width: 30px;
    height: 30px;
    vertical-align: center;
    background-color: white;
  }

  .input_button {
    display: table-cell;
    padding: 0;
    text-align: center;
    height: 100%;
    width: 1%;
    margin: 0;
    white-space: nowrap;
    vertical-align: middle;
  }

  .input_button button {
    margin: 0;
    padding: 0;
  }
</style>

