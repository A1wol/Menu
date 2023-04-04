<template>
    <div class="header-bottom">
        <div v-for="item in menuItems" :key="item.uniqid" class="header-bottom__category">
            <HeaderCategory :title="item.name" :menu="item.menu" />
        </div>
        <MenuModal :showModal="isModalVisible" :modalText="'Desktop menu API Error'" @closeModal="isModalVisible = false" />
    </div>
</template>
<script setup lang="ts">
import Axios from 'axios'
import { onMounted, ref } from 'vue';
import HeaderCategory from './HeaderCategory.vue';
import { TMenu } from '@/helpers/types';
import MenuModal from '@/components/partials/MenuModal.vue';

const menuItems = ref<object>()
const isModalVisible = ref<boolean>(false)
async function getmenuDesktopItems() {
    try {
        const response = await Axios.get<TMenu>('https://run.mocky.io/v3/b0f35d05-7fcf-40b9-b1a7-84350aba0432')
        menuItems.value = response.data.menu
    } catch (error) {
        console.error(error)
        isModalVisible.value = true
    }
}
onMounted(() => {
    getmenuDesktopItems()
})
</script>
<style scoped lang="scss">
.header-bottom {
    display: flex;
    width: 100%;
    padding-left: 100px;
    background-color: $title-background;
    min-height: 50px;
    @include flexCenter(row, flex-start);
    align-items: center;

    &__category {
        min-height: 50px;
        @include flexCenter(row, center);
        margin-right: 25px;
        padding: 0 5px 0 5px;
        align-items: center;

        &:hover {
            background-color: white;
        }
    }
}

@media (max-width: 1300px) {
    .header-bottom {
        padding-left: 0;
        @include flexCenter(row, space-around);

        &__category {
            margin-right: 0;
        }
    }
}
</style>