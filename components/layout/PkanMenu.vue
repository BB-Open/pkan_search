<template>
  <nav :class="menu_class" aria-label="site">
    <ul>
      <li>
        <nuxt-link class="router-link" to="/" >Start</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/faq">Fragen und Antworten</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/blog">Aktuelles</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/publisher">Datenbereitsteller</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li class="hidebigscreen">
        <nuxt-link to="/accessibility" class="router-link">Barrierefreiheit</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li class="hidebigscreen">
        <nuxt-link to="/data_protection" class="router-link">Datenschutz</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li class="hidebigscreen">
        <nuxt-link to="/impressum" class="router-link">Impressum</nuxt-link>
      </li>
      <li>
        <nuxt-link class="router-link" to="/search">Suche</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
    </ul>
  </nav>

</template>

<script>
  export default {
    name: 'PkanMenu',
    data() {
      return {
        menu_class: 'menu content_container'
      }
    },
    methods: {
      button_clicked() {
        if (this.menu_class === 'menu content_container') {
          this.menu_class += ' responsive'
        } else {
          this.menu_class = 'menu content_container'
        }
      }

    },
  }
</script>

<style scoped>
  ul {
    display: flex;
    flex-flow: row wrap;
    margin: 0 -2px 0 -2px;
    justify-content: flex-end;
  }

  ul li {
    list-style-type: none;
  }

  .router-link {
    background-color: #ffffff;
    border: none;
    padding-left: 16px;
    padding-right: 16px;
    margin: 2px;
    text-align: center;
    text-decoration: none;
    color: #161616;
  }

  .router-link:hover,
  .router-link:focus,
  .nuxt-link-exact-active {
    background-color: white;
    color: #C73C35;
    text-decoration: underline;
  }

  .router-link.inexact.nuxt-link-active{
    background-color: white;
    color: #C73C35;
  }

  .menu .icon {
    display: none;
  }

  .menu .icon_box {
    display: none;
  }

  .content_container {
    margin-right: -16px;
    padding-right: 0;
  }

  @media (max-width: 640px) {
    .menu .icon_box {
      width: 100%;
      float: left;
      position: relative;
      display: block;
      background-color: #C73C35;
      border: none;
    }

    .menu .icon_box button {
      background-color: #C73C35;
      border: none
    }

    .menu .icon_box p {
      position: absolute;
      bottom: 1px;
      left: 30px;
      margin: 2px;
      padding: 1px;
      background-color: #C73C35;
      color: white;
    }

    .menu {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      padding-right: 0;
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      padding-bottom: 5px;
      background-color: white;
    }

    .menu.responsive ul {
      padding: 0;
      background-color: #f5f5f5;
    }

    .menu .router-link {
      display: none;
    }

    .menu .icon {
      float: left;
      display: block;
      background-color: white;
      padding: 1px;
    }

    .menu.responsive ul li .router-link {
      float: none;
      display: block;
      text-align: left;
      padding-left: 5px;
      width: 50vw;
      background-color: #f5f5f5;
    }

    .menu.responsive ul li .hidebigscreen {
      display: block;
    }

    .router-link {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
