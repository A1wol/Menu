<template>
    <div class="mobile-menu">
        <div class="mobile-menu__closing-button" @click="$emit('closeMenu')">
            <SvgIcon type="mdi" :path="mdiClose" :size="34" style="color:white"></SvgIcon>
        </div>
        <div class="mobile-menu__carousel">
            <MobileMenuCarousel :menuItems="menuItems" :itemTitle="categoryItemTitle"
                @onCarouselSelect="getCategoryItems($event)" @back="getBackToPreviousList" />
        </div>
        <MobileMenuList :transitionName="transitionName" :itemSections="itemSections" :visibility="areCategoryItemsVisible"
            :items="categoryItems" @categoryClicked="openSubcategoryList($event)"
            @passItemSections="passItemSections($event)" />
        <MobileMenuList :transitionName="transitionName" :itemSections="itemSections"
            :visibility="areSubcategoryItemsVisible" :items="categoryItems"
            @categoryClicked="openSubcategorySubcategoryList($event)" @passItemSections="passItemSections($event)" />
        <MobileMenuList :transitionName="transitionName" :itemSections="itemSections"
            :visibility="areSubcategorySubcategoriesVisible" :items="categoryItems"
            @passItemSections="passItemSections($event)"
            @categoryClicked="openSubcategoriesSubcategorySubcategoryList($event)" />
        <MobileMenuList :transitionName="transitionName" :itemSections="itemSections"
            :visibility="areSubcategoriesSubcotegorySubcategoryVisible" :items="categoryItems"
            @passItemSections="passItemSections($event)" />
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { mdiClose } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';
import MobileMenuCarousel from './MobileMenuCarousel.vue';
import MobileMenuList from './MobileMenuList.vue';

defineProps({
    menuItems: Object
})
defineEmits(['closeMenu'])

const transitionName = ref<string>()
const itemSections = ref<Array<[]>>()

const currentCategory = ref<object>()
const currentSubcategory = ref<object>()
const currentSubcategorySubcategory = ref<object>()
const currentSubcategoriesSubcategorySubcategory = ref<object>()
const categoryItems = ref<Array<[]>>()
const categoryItemTitle = ref<string>('')

const areCategoryItemsVisible = ref<boolean>(true)
const areSubcategoryItemsVisible = ref<boolean>(false)
const areSubcategorySubcategoriesVisible = ref<boolean>(false)
const areSubcategoriesSubcotegorySubcategoryVisible = ref<boolean>(false)

function getBackToPreviousList() {
    transitionName.value = 'back'
    if (areSubcategoryItemsVisible.value) {
        getCategoryItems(currentCategory.value)
        categoryItemTitle.value = ''
    } else if (areSubcategorySubcategoriesVisible.value) {
        openSubcategoryList(currentSubcategory.value)
    } else if (areSubcategoriesSubcotegorySubcategoryVisible.value) {
        openSubcategorySubcategoryList(currentSubcategorySubcategory.value)
    }
}
function resetCategoryListVisibility() {
    areCategoryItemsVisible.value = false
    areSubcategoryItemsVisible.value = false
    areSubcategorySubcategoriesVisible.value = false
    areSubcategoriesSubcotegorySubcategoryVisible.value = false
}
function passItemSections(sections: Array<[]>) {
    itemSections.value = sections
    transitionName.value = 'next'
}
function getCategoryItemList(selectedCategory: object) {
    resetCategoryListVisibility()
    if (selectedCategory.menu === undefined) {
        categoryItems.value = selectedCategory.subcategories
    } else if (selectedCategory.subcategories === undefined) {
        categoryItems.value = selectedCategory.menu
    }
}

function getCategoryItems(selectedCategory: object) {
    resetCategoryListVisibility()
    currentCategory.value = selectedCategory
    getCategoryItemList(selectedCategory)
    areCategoryItemsVisible.value = true
}
function openSubcategoryList(selectedSubcategory: object) {
    resetCategoryListVisibility()
    currentSubcategory.value = selectedSubcategory
    getCategoryItemList(selectedSubcategory)
    areSubcategoryItemsVisible.value = true
    categoryItemTitle.value = selectedSubcategory.name
}
function openSubcategorySubcategoryList(selectedSubcategory: object) {
    resetCategoryListVisibility()
    currentSubcategorySubcategory.value = selectedSubcategory
    getCategoryItemList(selectedSubcategory)
    areSubcategorySubcategoriesVisible.value = true
    categoryItemTitle.value = selectedSubcategory.name
}
function openSubcategoriesSubcategorySubcategoryList(selectedSubcategory: object) {
    resetCategoryListVisibility()
    currentSubcategoriesSubcategorySubcategory.value = selectedSubcategory
    getCategoryItemList(selectedSubcategory)
    areSubcategoriesSubcotegorySubcategoryVisible.value = true
    categoryItemTitle.value = selectedSubcategory.name
}
</script>
<style lang="scss">
.mobile-menu {
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    cursor: pointer;

    &__closing-button {
        position: absolute;
        right: 10px;
        top: 10px;
    }

}
</style>
