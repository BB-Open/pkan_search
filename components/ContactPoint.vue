<template>
  <div>
  <h3>Kontakt:</h3>
  <div class="contact street_address" v-if="contactPoint['vcard_street-address']">{{contactPoint['vcard_street-address']}}</div>
  <div class="contact_postal" v-if="contactPoint['vcard_postal-code']">{{contactPoint['vcard_postal-code']}}</div>
  <div class="contact locality"  v-if="contactPoint['vcard_locality']">{{contactPoint.vcard_locality}} </div>
  <div class="contact region"  v-if="contactPoint.vcard_region">{{contactPoint.vcard_region}}</div>
  <div class="contact country"  v-if="contactPoint['vcard_country-name']">{{contactPoint['vcard_country-name']}}</div>
  <div class="contact email" v-if="contactPoint.vcard_email">{{contactPoint.vcard_email}}</div>
  </div>
</template>

<script setup lang="ts" >

    const props = defineProps({
        contactPoint: {type: Object, required: true},
    });

</script>

<style scoped>

.contact_postal {
  margin-right: 0.1em;
}

</style>
