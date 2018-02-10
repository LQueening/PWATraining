<template>
  <div>
    <div class="mdl-grid portfolio-max-width pb40-trans" v-masonry transition-duration="0.3s" item-selector=".item">
      <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card item" v-masonry-tile
           v-for="(item,index) in dataList" v-if="dataList&&dataList.length" v-show="allImgLoaded" :key="item['.key']">
        <div class="mdl-card__media">
          <img class="article-image" :src="item.url" border="0" alt="cute-cat" @load="handleImgLoaded">
        </div>
        <div class="mdl-card__title" v-show="item&&item.comment">
          <h2 class="mdl-card__title-text">{{item.comment}}--{{item['.key']}}</h2>
        </div>
        <div class="mdl-card__supporting-text meta meta--fill">
          <div>
            <strong>{{item.info}}</strong>
            <span class="mt5">2 days ago</span>
          </div>
          <div class="bar tar">
            <mdl-button :id="`menu${index}`" icon class="hp100">
              <i class="material-icons">more_vert</i>
            </mdl-button>
            <mdl-menu :for="`menu${index}`" class="mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect">
              <mdl-menu-item>编辑</mdl-menu-item>
              <mdl-menu-item>收藏</mdl-menu-item>
              <mdl-menu-item>删除</mdl-menu-item>
              <mdl-menu-item>设为私密</mdl-menu-item>
            </mdl-menu>
          </div>
        </div>
      </div>
    </div>
    <!--loading tip part-->
    <div class="wp100 tac absolute top20">
      <div class="mdl-spinner mdl-js-spinner" :class="{'is-active':!allImgLoaded}"></div>
    </div>
    <!--footer part-->
    <!--<footer class="mdl-mini-footer">-->
    <!--<div class="mdl-mini-footer__left-section">-->
    <!--<div>TimeLine</div>-->
    <!--</div>-->
    <!--<div class="mdl-mini-footer__right-section">-->
    <!--<ul class="mdl-mini-footer__link-list">-->
    <!--<li><a href="#">Help</a></li>-->
    <!--<li><a href="#">Privacy & Terms</a></li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</footer>-->
    <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add-item-btn" @click="toAddItem">
      <i class="material-icons">add</i>
    </button>
    <mdl-snackbar display-on="failLoadSnackbar"></mdl-snackbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        catList: [],
        dataList: [],
        allImgLoaded: false,
        imgLoadCount: 0,  //图片加载的计数器，当count等于图片数量时说明所有的图片都loaded
      }
    },
    watch: {
      imgLoadCount(newVal) {
        console.log(this.imgLoadCount);
        if (this.dataList.length === 0) {
          this.allImgLoaded = true;
          return;
        }
        this.allImgLoaded = newVal === this.dataList.length;
      },
      catList(newVal) {
        this.imgLoadCount = 0;
        this.dataList.splice(0);
        this.dataList = JSON.parse(JSON.stringify(newVal));
      },
    },
    mounted() {
      this.catList = this.$root.calender || [];
    },
    methods: {
      toAddItem() {
        this.$router.push('addItem');
      },
      handleImgLoaded() {
        this.imgLoadCount++;
      },
    },
  }
</script>
<style scoped>
  .pb40-trans {
    padding-bottom: 40px;
  }

  .bar {
    display: inline-block;
    position: relative;
  }

  .add-item-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2;
  }

  /*overwrite style*/
  .meta {
    display: flex;
    justify-content: space-between;
  }

  .meta > * {
    display: flex;
    flex-direction: column;
  }

  .meta > *:first-child {
    margin-right: 16px;
  }

  .mdl-card__supporting-text {
    overflow: initial;
  }

  .mdl-mini-footer {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  @media (max-width: 479px) {
    .mdl-cell {
      width: calc(100% - 32px);
    }

    .pb40-trans {
      padding-bottom: 50px;
    }

    .mdl-mini-footer {
      padding: 12px 16px;
    }
  }

  @media (max-width: 839px) and (min-width: 480px) {
    .mdl-cell {
      width: calc(50% - 32px);
    }
  }

  @media (min-width: 840px) {
    .mdl-cell {
      width: calc(33.3333333333% - 32px);
    }
  }
</style>
