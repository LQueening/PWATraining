<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header mdl-layout__header--waterfall portfolio-header is-casting-shadow is-compact">
      <div class="mdl-layout__header-row portfolio-logo-row">
        <div class="mdl-layout__title">
          <div class="portfolio-logo"></div>
        </div>
      </div>
      <div class="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
        <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
          <a class="mdl-navigation__link" href="javascript:void(0)" @click="toPage('index')"
             :class="{'is-active':getActiveStatus('index')}">TIMELINE</a>
          <a class="mdl-navigation__link" href="javascript:void(0)" @click="toPage('addItem')"
             :class="{'is-active':getActiveStatus('addItem')}">ADD
            CAT</a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer mdl-layout--small-screen-only">
      <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
        <a class="mdl-navigation__link" href="javascript:void(0)" @click="toPage('index')"
           :class="{'is-active':getActiveStatus('index')}">TIMELINE</a>
        <a class="mdl-navigation__link" href="javascript:void(0)" @click="toPage('addItem')"
           :class="{'is-active':getActiveStatus('addItem')}">ADD CAT</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  require('material-design-lite');

  export default {
    name: 'app',
    data() {
      return {
        currentActiveName: 'index',
      }
    },
    mounted() {
      this.currentActiveName = this.$route.name || '';
    },
    methods: {
      toPage(pageName) {
        this.currentActiveName = pageName;
        this.$router.push(pageName);
      },
      getActiveStatus(name) {
        return name === this.currentActiveName;
      },
    },
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://cdn.bootcss.com/material-design-lite/1.3.0/material.grey-pink.min.css');
  @import "assets/css/demo.css";
  @import "assets/css/common.css";

  ::-webkit-scrollbar {
    display: none
  }

  body {
    margin: 0;
    position: relative;
  }
</style>
