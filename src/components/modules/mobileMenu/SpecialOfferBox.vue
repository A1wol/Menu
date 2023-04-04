<template>
    <div class="offer-box">
        <div class="offer-box__content">
            <div class="offer-box__content__discount">
                {{ discount }} %
            </div>
            <div class="offer-box__content__heart">
                <SvgIcon type="mdi" :path="mdiHeartOutline" :size="34" style="color: grey"></SvgIcon>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeartOutline } from '@mdi/js';
import { defineProps } from 'vue';
defineProps({
    discount: Number
})
</script>
<style lang="scss">
.offer-box {
    height: 250px;
    width: 250px;
    border: 2px solid $border-color;
    -webkit-box-shadow: 8px 2px 11px 0px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px 2px 11px 0px rgba(66, 68, 90, 1);
    box-shadow: 8px 2px 11px 0px rgba(66, 68, 90, 1);
    display: flex;
    justify-content: space-between;
    margin: 20px;
    border-radius: 6px;

    &__content {
        padding: 12px;
        display: flex;
        justify-content: space-between;
        width: 100%;

        &__discount {
            border: 1px solid red;
            color: red;
            padding: 12px;
            height: 15px;
            width: 50px;
        }

        &__heart {
            height: 40px;
            display: flex;
            align-items: center;
        }
    }
}

@media (max-width: 400px) {
    .offer-box {
        height: 200px;
        width: 200px;
    }
}
</style>