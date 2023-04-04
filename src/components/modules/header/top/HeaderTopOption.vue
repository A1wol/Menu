<template>
    <div class="header-option">
        <div class="header-option__icon">
            <svg-icon type="mdi" :path="path" :size="34" class="header-option__icon__svg"></svg-icon>
        </div>
        <div class="header-option__title">
            {{ title }}
        </div>
    </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { defineProps } from 'vue';
defineProps({
    path: String,
    title: String
})
</script>
<style scoped lang="scss">
.header-option {
    @include flexCenter(column, center);
    align-items: center;
    font-size: 14px;

    &__icon {
        &__svg {
            color: gray;
        }
    }

    &__title {
        font-size: $base-font-size;
        color: grey;
        font-size: 13px;
        font-weight: 600;
    }
}

@media (max-width: 400px) {
    .header-option {
        &__title {
            font-size: 10px;
        }
    }
}
</style>