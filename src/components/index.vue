<template>
  <div>
    <div class="mdl-grid portfolio-max-width pb40-trans" v-masonry transition-duration="0.3s" item-selector=".item-img">
      <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card item-img" v-masonry-tile
           v-for="(item,index) in getImgs()" :key="item['.key']">
        <div class="mdl-card__media">
          <img class="article-image hide" :src="item.url" border="0" alt="cute-cat" @load="handleImgLoaded(index)"
               :class="{'show':imgLoadList[index]}">
          <img src="http://7xr4g8.com1.z0.glb.clouddn.com/38" alt="default img" class="article-image hide"
               :class="{'show':!imgLoadList[index]}">
        </div>
        <div class="mdl-card__title" v-show="item&&item.comment">
          <h2 class="mdl-card__title-text">{{item.comment}}--{{index}}</h2>
        </div>
        <div class="mdl-card__supporting-text meta meta--fill">
          <div>
            <strong>{{item.info}}</strong>
            <span class="mt5">2 days ago</span>
          </div>
          <div class="bar tar">
            <mdl-button :id="`menu${item['.key']}`" icon class="hp100">
              <i class="material-icons">more_vert</i>
            </mdl-button>
            <mdl-menu :for="`menu${item['.key']}`" class="mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect">
              <mdl-menu-item>编辑</mdl-menu-item>
              <mdl-menu-item>收藏</mdl-menu-item>
              <mdl-menu-item>删除</mdl-menu-item>
              <mdl-menu-item>设为私密</mdl-menu-item>
            </mdl-menu>
          </div>
        </div>
      </div>
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
    <!--<button class="mdl-button mdl-js-button mdl-button&#45;&#45;fab mdl-js-ripple-effect mdl-button&#45;&#45;colored add-item-btn" @click="toAddItem">-->
    <!--<i class="material-icons">add</i>-->
    <!--</button>-->
    <mdl-snackbar display-on="failLoadSnackbar"></mdl-snackbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        catList: [],
        imgLoadList: [],
      }
    },
    methods: {
      getImgs() {
        if (navigator.onLine) {
          this.saveImgsToCache();
          return this.$root.calender || [];
        } else {
          return JSON.parse(localStorage.getItem('imgs'));
        }
      },
      saveImgsToCache() {
        this.$root.$firebaseRefs.calender.orderByChild('created_at').once('value', (calender) => {
          let cachedCalenders = [];
          calender.forEach((calenderObj) => {
            let cachedCalender = calenderObj.val();
            cachedCalender['.key'] = calenderObj.key;
            cachedCalenders.push(cachedCalender)
          });
          localStorage.setItem('imgs', JSON.stringify(cachedCalenders))
        })
      },
      toAddItem() {
        this.$bus.$emit('currentPage', 'addItem');
        this.$router.push('addItem');
      },
      handleImgLoaded(index) {
        this.imgLoadList.splice(index, 0, 1);
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
