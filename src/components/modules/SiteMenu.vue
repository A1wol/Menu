<template>
    <div class="site-menu">
        <div class="site-menu__top">
            <HeaderUpperPart />
        </div>
        <div class="site-menu__bottom">
            <HeaderBottomPart />
        </div>
        <div class="site-menu__special-offers">
            <MobileSpecialOffers />
        </div>
    </div>
</template>
<script setup lang="ts">
import HeaderBottomPart from '../modules/header/bottom/HeaderBottomPart.vue';
import HeaderUpperPart from '../modules/header/top/HeaderTopPart.vue'
import MobileSpecialOffers from './mobileMenu/MobileSpecialOffers.vue';
</script>
<style lang="scss">
.site-menu {
    &__special-offers {
        display: none;
    }
}

@media (max-width: 800px) {
    .site-menu {
        &__bottom {
            display: none;
        }

        &__special-offers {
            position: absolute;
            bottom: 10px;
            display: flex;
        }
    }
}
</style>
