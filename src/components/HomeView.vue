<template>
  <div>
    <div class="mdl-grid portfolio-max-width" id="itemContainer">
      <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card" v-for="(item,index) in dataList"
           :style="finalStyleList[index]" v-if="dataList&&dataList.length" :id="`item${index}`">
        <div class="mdl-card__media">
          <img class="article-image" :src="item.url" border="0" alt="" @load="picLoad(item.url)">
        </div>
        <div class="mdl-card__title" v-if="item&&item.comment">
          <h2 class="mdl-card__title-text">{{item.comment}}--{{index}}</h2>
        </div>
        <div class="mdl-card__supporting-text meta meta--fill">
          <div>
            <strong>{{item.info}}</strong>
            <span class="mt5">2 days ago</span>
          </div>
          <div class="bar tar">
            <mdl-button :id="`menu${item.id}`" icon class="hp100">
              <i class="material-icons">more_vert</i>
            </mdl-button>
            <mdl-menu :for="`menu${item.id}`" class="mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect">
              <mdl-menu-item>编辑</mdl-menu-item>
              <mdl-menu-item>收藏</mdl-menu-item>
              <mdl-menu-item>删除</mdl-menu-item>
              <mdl-menu-item>设为私密</mdl-menu-item>
            </mdl-menu>
          </div>
        </div>
      </div>
      <div class="wp100 tac" v-if="isLoading">
        <div class="mdl-spinner mdl-js-spinner is-active"></div>
      </div>
      <div class="wp100 tac" v-if="hasDataList">
        <span>seems like you have wrote nothing, try to add your first record!</span>
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
          <i class="material-icons">mood</i>
        </button>
      </div>
    </div>
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
    <mdl-snackbar display-on="failLoadSnackbar"></mdl-snackbar>
  </div>
</template>
<script>
  import fly from 'flyio'

  export default {
    data() {
      return {
        dataList: [],
        isLoading: false,
        hasDataList: false,
        containerWidth: 0,
        itemWidth: 0,
        columnCount: 0,  //计算一行能放几列
        currentLine: 0,  //当前行数
        styleList: [],  //元素样式列表
        translateYList: [],  //每个元素translateY的值的列表
        finalStyleList: [],
        imgLoadCount: 0,  //图片加载的计数器，当count为10时开始计算位置
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getData();
      },
      getData() {
        this.isLoading = true;
        fly.get('https://www.easy-mock.com/mock/5a0e7bd7009ca23980212e06/mockRewardHistory/getMockCatList').then(res => {
          this.isLoading = false;
          this.dataList = res.data.data.pictures;
          if (!this.dataList || this.dataList.length === 0) {
            this.hasDataList = true;
          }
          this.$nextTick(() => {
            this.getElementsWidth();
          });
          console.log(this.dataList);
        }, res => {
          this.$root.$emit('failLoadSnackbar', {
            message: 'Error loading',
            timeout: 2000
          });
          this.isLoading = false;
        })
      },
      getElementsWidth() {
        this.containerWidth = document.getElementById('itemContainer').clientWidth;
        if (this.containerWidth >= 480 && this.containerWidth < 839) {
          this.itemWidth = this.containerWidth / 2 - 16;
        } else if (this.containerWidth >= 840) {
          this.itemWidth = this.containerWidth / 3 - 16;
        } else {
          this.itemWidth = this.containerWidth - 16;
        }
        this.columnCount = Math.round((this.containerWidth - 16) / this.itemWidth);
      },
      getTranslateX(index) {
        let copyIndex = Number(index) + 1;
        let calcRemainder = copyIndex % this.columnCount;
        let offsetColumn = calcRemainder - 1 === -1 ? this.columnCount - 1 : calcRemainder - 1;
        let translateX;
        translateX = this.itemWidth * offsetColumn;
        if (calcRemainder !== 1) {
          if (calcRemainder === 0) {
            translateX += 16 * (this.columnCount - 1);
          } else {
            translateX += 16 * (calcRemainder - 1);
          }
        }
        return translateX;
      },
      getTranslateY(index) {
        if (index < this.columnCount) {
          return 0;
        }
        let prevIndex = index - this.columnCount;
        let itemId = `item${prevIndex}`;
        let translateY;
        let ele = document.getElementById(itemId);
        translateY = ele.offsetHeight + 16 + this.translateYList[prevIndex];
        return translateY;
      },
      getItemStyle() {
        for (let index in this.dataList) {
          this.currentLine = Math.floor(index / this.columnCount);
          let translateX = this.getTranslateX(index);
          let translateY = this.getTranslateY(index);
          this.translateYList.push(translateY);
          this.styleList.push({transform: `translate(${translateX}px,${translateY}px)`});
        }
        this.finalStyleList = this.styleList;
      },
      picLoad() {
        this.imgLoadCount++;
        if (this.imgLoadCount > 9) {
          this.imgLoadCount = 0;
          this.getItemStyle();
        }
      },
    },
  }
</script>
<style scoped>
  .bar {
    display: inline-block;
    position: relative;
  }

  .mdl-grid {
    position: relative;
    align-items: start !important;
  }

  .mdl-card {
    position: absolute;
  }
</style>
