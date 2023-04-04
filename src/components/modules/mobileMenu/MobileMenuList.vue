<template>
    <Transition :name="props.transitionName === 'back' ? 'back' : 'next'">
        <div v-if="props.visibility" class="menu-list">
            <div class="menu-list__item" v-for="item in items" :key="item.id" @click="passClickedCategory(item)">
                <div class="menu-list__item__title">
                    {{ item.name }}
                </div>
                <div v-if="doObjectOrArrayExistsAndNotNull(item.menu) || doObjectOrArrayExistsAndNotNull(item.subcategories)"
                    class="menu-list__item__arrow">
                    <SvgIcon type="mdi" :path="mdiArrowRight" :size="24"></SvgIcon>
                </div>
            </div>
            <div v-for="item in itemSections" :key="item.id" class="menu-list__section">
                {{ item.name }}
            </div>
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiArrowRight } from '@mdi/js'
import { doObjectOrArrayExistsAndNotNull } from '@/helpers/helpers';
const props = defineProps({
    items: Array,
    visibility: Boolean,
    itemSections: Array,
    transitionName: String
})
const emit = defineEmits(['categoryClicked', 'passItemSections'])
function passClickedCategory(item: object) {
    if (doObjectOrArrayExistsAndNotNull(item.menu) || (doObjectOrArrayExistsAndNotNull(item.subcategories) && item.subcategories.length !== 0)) {
        emit('categoryClicked', item)
        emit('passItemSections', item.sections)
    }
}
</script>
<style lang="scss">
.menu-list {
    padding: 24px;
    font-size: 18px;
    text-transform: uppercase;
    @include flexCenter(column, flex-start);

    &__item {
        @include flexCenter(row, space-between);
        padding: 5px;
        align-items: center;
        border-bottom: 2px solid $border-color;
        height: 35px;

        &:hover {
            background-color: $border-color;
        }

        &__arrow {
            border-left: 2px solid $border-color;
            height: 100%;
            display: flex;
            align-items: center
        }
    }

    &__section {
        @include flexCenter(row, space-between);
        padding: 5px;
        align-items: center;
        border-bottom: 2px solid $border-color;
        height: 30px;
    }
}

@media (max-width: 800px) {
    .menu-list {
        &__item {
            &:hover {
                background-color: transparent
            }
        }
    }
}

@media (max-width: 400px) {
    .menu-list {
        font-size: 14px;

        &__item {
            height: 30px;
        }
    }
}
</style>