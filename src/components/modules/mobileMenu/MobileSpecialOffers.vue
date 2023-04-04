<template>
    <div class="special-offers">
        <div class="special-offers__title">
            Hity promocji
        </div>
        <div class="special-offers__boxes">
            <div class="special-offers_boxes__box">
                <SpecialOfferBox :discount="17" />
            </div>
            <div class="special-offers_boxes__box">
                <SpecialOfferBox :discount="24" />
            </div>
            <div class="special-offers_boxes__box">
                <SpecialOfferBox :discount="50" />
            </div>
            <div class="special-offers_boxes__box">
                <SpecialOfferBox :discount="54" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SpecialOfferBox from './SpecialOfferBox.vue';

</script>
<style lang="scss">
.special-offers {
    overflow-x: auto;
    max-width: 100%;

    &__title {
        font-size: 20px;
        font-weight: 600;
        margin-left: 16px;
    }

    &__boxes {
        display: flex;
        overflow-x: auto;

        &__box {
            margin: 20px;
        }
    }
}
</style>