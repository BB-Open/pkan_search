<template>
  <footer class="footer">
    <div class="footercontent content_container">
      <PkanBreadcrumb></PkanBreadcrumb>
      <div class="footerbox">
        <h2 class="hidden_help_text">Weiterführende Informationen</h2>
        <div class="footerelement">
          <h3 class="footerelementtitle">Open Data</h3>
          <hr/>
          <ul class="nobull">
            <li>
              <a class="footerelementlink" href="https://www.dcat-ap.de/" target="_blank"><span
                class="hidden_help_text">Metadatenmodell </span>
                DCAT-AP.de
                <em class="external_link" aria-label="Externer Link"></em>
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="https://www.govdata.de/" target="_blank"><span class="hidden_help_text">Bund-Länder-Portal </span>
                GovData.de
                <em class="external_link" aria-label="Externer Link"></em>
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="https://data.europa.eu/de" target="_blank"><span class="hidden_help_text">Open-Data-Portal für Europa: </span>
                EuropeanDataportal.eu
                <em class="external_link" aria-label="Externer Link"></em>
              </a>
            </li>
          </ul>
        </div>
        <div class="footerelement">
          <h3 class="footerelementtitle">Service</h3>
          <hr/>
          <ul class="nobull">
            <li>
              <nuxt-link class="footerelementlink" to="/problem"
              ><span class="hidden_help_text">Link zum Formular</span>
                Fehler melden
              </nuxt-link>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <nuxt-link class="footerelementlink" to="/faq"
              ><span class="hidden_help_text">Link zu </span>
                Fragen & Antworten
              </nuxt-link>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <nuxt-link class="footerelementlink" to="/haftung"
              ><span class="hidden_help_text">Link zur Seite</span>
                Haftungsausschluss
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footerelement">
          <h3 class="footerelementtitle">Landesportale</h3>
          <hr/>
          <ul class="nobull">
            <li>
              <a class="footerelementlink" href="https://brandenburg.de" target="_blank"
              ><span class="hidden_help_text">Link zur Seite</span>
                Landesportal Brandenburg
                <em class="external_link" aria-label="Externer Link"></em>
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="https://service.brandenburg.de" target="_blank"
              ><span class="hidden_help_text">Link zur Seite</span>
                Serviceportal Brandenburg
                <em class="external_link" aria-label="Externer Link"></em>
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="https://mik.brandenburg.de" target="_blank"
              ><span class="hidden_help_text">Link zur Seite</span>
                Ministerium des Innern und für Kommunales
                Brandenburg
                <em class="external_link" aria-label="Externer Link"></em>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-line">
      <div class="footer-line-left hidesmallscreen"><span>{{year}} | Landesregierung Brandenburg</span></div>
      <div >
        <ul class="footer-line-right nobull">
          <li>
            <nuxt-link to="/accessibility">Barrierefreiheit</nuxt-link>|
          </li>
          <li>
            <nuxt-link to="/data_protection">Datenschutz</nuxt-link>|
          </li>
          <li>
            <nuxt-link to="/impressum">Impressum</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  import PkanBreadcrumb from "./PkanBreadcrumb";
  export default {
    name: "PkanFooter",
    components: {PkanBreadcrumb},
    created() {
      this.year = new Date().getFullYear();
    }
  }
</script>

<style scoped>
  hr, ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .footer {
    background-color: #eeeeee;
  }

  .footercontent {
    padding-left: 15px;
    padding-right: 15px;
  }

  .footer-line a {
    color: white;
    text-decoration: unset;
  }

  .footer-line a:hover, .footer-line a:active, .footer-line a:focus {
    color: #161616;
    background-color: #FFCC00;
    text-decoration: underline;
  }

  .footerelement a {
    color: #161616;
    text-decoration: unset;
  }

  .footerelement a:hover, .footerelement a:active, .footerelement a:focus {
    color: #C13B33;
    background-color: unset;
    text-decoration: underline;
  }

  .footerbox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .footer-line {
    height: 30px;
    line-height: 30px;
    background-color: #C13B33;
    color: #fff;
    white-space: nowrap;
    padding-left: 30px;
    padding-right: 30px;
  }

  .footer-line {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .footer-line-left {
  }

  .footer-line-right {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
  }

  .footer-line-right li {
    display: block;
  }

  .footercontent  {
    padding: 15px;
  }

  .footerbox {
  }

  .footerelement {
    width: 33%;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 16px;
  }

  .footerelementtitle {
    margin: 0;
    font-size: 1rem;
  }

  .footerelement .footerelementtitle {
    font-style: italic;
    margin-bottom: .5rem;
    line-height: 1.4;
  }

  .footerelement .footerelementlink {
    margin-bottom: 1rem;
    line-height: 30px;
  }


  @media (max-width: 640px) {
    .footerbox {
      display: block;
    }

    .footerelement {
      width: 100%;
      margin-bottom: 5px;
      padding-right: 5px;
      padding-left: 5px;
    }

    .footerelement a {
      display: block;
    }

    .footer-line {
      height: auto;
      padding-right: 10px;
      padding-left: 10px;
    }

    .footerelement .footerelementlink {
      margin-bottom: auto;
      line-height: 30px;
    }

    .footercontent {
      padding-right: 5px;
      padding-left: 5px;
    }

    .footercontent .breadcrumb {
      padding: 5px;
    }

  }

</style>
