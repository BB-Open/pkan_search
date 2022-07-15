<template>
  <div>
  <h3>Kontakt:</h3>
    <div class="contact_title" v-if="contactPoint['dct_description']">{{contactPoint['dct_description']}}</div>
  <div class="contact organization" v-if="contactPoint['vcard_organization']">{{contactPoint['vcard_organization']}}</div>
  <div class="contact_street_address" v-if="contactPoint['vcard_street-address']">{{contactPoint['vcard_street-address']}}</div>
  <div>
    <span class="contact_postal" v-if="contactPoint['vcard_postal-code']">{{contactPoint['vcard_postal-code']}}</span>
    <span class="contact_locality"  v-if="contactPoint['vcard_locality']"> {{contactPoint.vcard_locality}} </span>
  </div>
<!--  <div class="contact_region"  v-if="contactPoint.vcard_region">{{contactPoint.vcard_region}}</div> -->
  <div class="contact_country"  v-if="contactPoint['vcard_country-name']">{{contactPoint['vcard_country-name']}}</div>
  <div class="contact_email" v-if="contactPoint.vcard_email">{{contactPoint.vcard_email}}</div>
  <div class="contact_email" v-if="contactPoint.vcard_hasEmail">{{contactPoint.vcard_hasEmail}}</div>
  <div class="contact_voice" v-if="contactPoint.vcard_voice">Tel. {{contactPoint.vcard_voice}}</div>
    <div class="contact_voice" v-if="contactPoint.hasTelephone">Tel. {{contactPoint.hasTelephone}}</div>
  <div class="contact_fax" v-if="contactPoint.vcard_fax">Fax {{contactPoint.vcard_fax}}</div>
    <div class="contact_fax" v-if="contactPoint.vcard_Fax">Fax {{contactPoint.vcard_Fax}}</div>
    <div class="contact_form" v-if="contactPoint.hasURL">Kontaktformular: {{contactPoint.hasURL}}</div>
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
