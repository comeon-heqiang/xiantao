<template>
    <div>
        <div class="no-data">
            <span>
                {{text}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style scoped lang="scss">
.no-data{
    margin-top: 30px;
    text-align: center;
    border-top: 1px solid #ccc;
    span{
        display: inline-block;
        background: #fafafa;
        color: #969696;
        transform: translateY(-50%);
        padding: 0 10px;
    }
}
</style>