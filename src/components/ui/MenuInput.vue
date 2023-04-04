<template>
    <div class="menu-input">
        <input :type="type" :placeholder="placeholder" />
        <div class="menu-input__icon">
            <svg-icon type="mdi" :path="mdiMagnify" :size="30" class="menu-input__icon__svg"></svg-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify } from '@mdi/js'
defineProps({
    type: String,
    placeholder: String
})
</script>
<style scoped lang="scss">
.menu-input {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;

    &__icon {
        position: absolute;
        top: 30%;
        right: 10px;

        &__svg {
            color: gray;
        }
    }
}

@media(max-width: 400px) {
    .menu-input {
        &__icon {
            top: 25%;
        }
    }
}
</style>
