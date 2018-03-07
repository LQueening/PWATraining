export const postCat = {
  methods: {
    postCat() {
      this.$root.$firebaseRefs.calender.push({
        'url': this.uploadImgUrl,
        'comment': this.content,
        'info': 'Posted by baba on Friday',
        'created_at': -1 * new Date().getTime()
      }).then(res => {
        this.$bus.$emit('currentPage', 'index');
        this.$router.push('index');
      }, fail => {
        console.log('fail');
      });
    },
  }
};
