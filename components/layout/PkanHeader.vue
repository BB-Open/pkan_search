<template>
  <header class="header">
    <div class="header-line hidesmallscreen">DatenAdler</div>
    <div class="logo-container content_container">
      <div class="logo logo-left"><a class="image-link" href="https://www.brandenburg.de"
                                     title="Link zum Landesportal Brandenburg">
        <img
            src="/brandenburg-logo.png"
            alt="Logo des Landes Brandenburg"
            aria-label='Link zum Landesportal Brandenburg'/></a>
      </div>
      <div class="logo logo-right"><a class="image-link" href="/" title="Link zur Startseite">
        <img src="/datenadler-logo.png"
             alt="Logo des Datenadlers"
             aria-label="Link zur Startseite"/></a>
      </div>
    </div>

  </header>
</template>

<script>

  export default {
    name: "PkanHeader",
    data() {
      return {
      }
    },
  }
</script>

<style scoped>
  .logo a[href^="https://"]:not([href*="https://datenadler.de"])::after {
    content: "";
  }


  .logo a[href^="http://"]:not([href*="http://datenadler.de"])::after {
    content: "";
  }

  .header-line {
    height: 30px;
    line-height: 30px;
    background-color: #C13B33;
    color: #fff;
    white-space: nowrap;
    text-align: left;
  }

  .logo {
    margin-top: auto;
    margin-bottom: auto;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .logo img {
    max-width: 200px;
    max-height: 90px;
  }

  .logo-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .header_content {
    padding-bottom: 0;
  }

  .header_content .breadcrumb {
    padding-top: 30px;
    padding-bottom: 3px;
  }

  .header-line {
    padding-left: 30px;
    padding-right: 30px;
  }

  .image-link:hover, .image-link:focus, .image-link {
    background-color: unset;
    color: unset;
  }


  @media (max-width: 640px) {
    .header_content .breadcrumb {
      padding-top: 10px;
      padding-bottom: 3px;
    }

    .header-line {
      padding-left: 10px;
      padding-right: 10px;
    }

    .logo-container {
      margin-top: 30px;
    }
  }


</style>
