<template>
    <div class="carousel" :style="{ backgroundImage: 'url(' + image + ')' }">
        <Transition name="fade">
            <div v-if="itemTitle === ''" class="carousel__items">
                <div class="carousel__items__item" v-for="item in menuItems" :key="item.id" @click="selectCategory(item)"
                    :style="{ borderBottom: selectedCategory === item ? '2px solid white' : '' }">
                    {{ item.name.toUpperCase() }}
                </div>
            </div>
            <div v-else class="carousel__item-details">
                <div class="carousel__item-details__arrow" @click="emit('back')">
                    <SvgIcon type="mdi" :path="mdiArrowLeft" :size="24" style="color: white"></SvgIcon>
                </div>
                <div class="carousel__item-details__title">
                    {{ props.itemTitle }}
                </div>
            </div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref, computed, defineEmits } from 'vue';
import { mdiArrowLeft } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
    menuItems: Object,
    itemTitle: String
})
const emit = defineEmits(['onCarouselSelect', 'back'])

const selectedCategory = ref<object>()

function selectCategory(item: object) {
    selectedCategory.value = item
    emit('onCarouselSelect', selectedCategory.value)
}
const image = computed(() => {
    let backgroundURL = '';
    switch (selectedCategory.value?.name) {
        case 'Kategorie':
            backgroundURL = require('@/assets/bedroom-image.webp');
            break;
        case 'Pomieszczenia':
            backgroundURL = require('@/assets/furniture-image.webp');
            break;
        case 'Inspiracje':
            backgroundURL = require('@/assets/kitchen-image.webp');
            break;
    }
    return backgroundURL
})
onMounted(() => {
    selectedCategory.value = Object.values(props.menuItems).find(el => el.name === 'Kategorie')
    emit('onCarouselSelect', selectedCategory.value)
})
</script>
<style scoped lang="scss">
.carousel {
    min-height: 200px;
    @include flexCenter(row, space-evenly);
    align-items: flex-end;
    background-size: cover;
    background-position-y: bottom;
    -webkit-box-shadow: inset 0px -15px 33px 14px rgba(0, 0, 0, 1);
    -moz-box-shadow: inset 0px -15px 33px 14px rgba(0, 0, 0, 1);
    box-shadow: inset 0px -15px 33px 14px rgba(0, 0, 0, 1);
    cursor: pointer;

    &__item-details {
        &__arrow {
            position: absolute;
            top: 160px;
            left: 10px;
        }

        &__title {
            @include flexCenter(row, center);
            font-size: 20px;
            color: white;
            z-index: 99;
            margin-bottom: 15px;
            text-transform: uppercase
        }
    }

    &__items {
        @include flexCenter(row, space-evenly);
        width: 100%;

        &__item {
            margin-bottom: 15px;
            padding-bottom: 5px;
            z-index: 99;
            font-size: 18px;
            color: white;
        }
    }

    &__image {
        height: 100px;
    }
}

@media(max-width: 400px) {
    .carousel {
        &__items {
            &__item {
                font-size: 14px;
            }
        }

        &__item-details {
            &__title {
                font-size: 16px;
            }
        }
    }
}
</style>