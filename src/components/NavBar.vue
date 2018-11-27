<template>
    <div>
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    onClickLeft() {      
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>