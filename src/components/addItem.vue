<template>
  <div>
    <form>
      <!--<div class="mt45 mdl-layout&#45;&#45;large-screen-only"></div>-->
      <div class="mdl-grid justify-content-center">
        <div class="mdl-cell mdl-cell--8-col tac">
          <div class="card-image__picture">
            <img :src="this.uploadImgUrl" class="wp100" @load="handleImgLoad"/>
          </div>
          <div class="mdl-spinner mdl-js-spinner is-active" v-show="!imgLoaded"></div>
        </div>
        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <textarea class="mdl-textfield__input" rows="1" id="username" v-model="content"></textarea>
            <label for="username" class="mdl-textfield__label">Describe me</label>
          </div>
          <div class="actions">
            <a @click="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
              POST A CAT
            </a>
          </div>
        </div>
      </div>
    </form>
    <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add-item-btn" @click="refreshImg">
      <i class="material-icons">refresh</i>
    </button>
  </div>
</template>
<script>
  import parse from 'xml-parser'
  import postCat from '../mixins/postCat'

  export default {
    mixins: [postCat],
    data() {
      return {
        uploadImgUrl: '',  //上传的图片地址
        content: '',  //描述
        imgLoaded: false,
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        let num = this.getRandomNum(1, 840);
        this.uploadImgUrl = `http://7xr4g8.com1.z0.glb.clouddn.com/${num}`;
      },
      handleImgLoad() {
        this.imgLoaded = true;
      },
      refreshImg() {
        this.uploadImgUrl = '';
        this.imgLoaded = false;
        this.getData();
      },
      getRandomNum(start, end) {
        let gap = end - start + 1;
        return Math.floor(Math.random() * gap + start);
      },
    },
  }
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }

  .add-item-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2;
  }
</style>
