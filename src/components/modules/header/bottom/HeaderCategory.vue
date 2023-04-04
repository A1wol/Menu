<template>
    <div class="header-category" @mouseover="changeContextMenuPosition()" @mouseleave="loadProperties()">
        <div class="header-category__title" :style="{ color: props.title?.toUpperCase() === 'PROMOCJE' ? 'red' : '' }"
            @mouseover="areCategoryDetailsVisible = true">
            {{ props.title?.toUpperCase() }}
        </div>
        <Transition name="context-menu">
            <div v-if="areCategoryDetailsVisible" ref="contextMenu" class="header-category__content"
                @mouseleave="resetVisiblity()">
                <div class="header-category__content__categories">
                    <div class="header-category__content__categories__category" v-for="category in menuCategories"
                        :key="category.id" :style="{ backgroundColor: category.expanded ? '#efefef' : '' }"
                        @click="openCategorySubcategories(category)">
                        <div>{{ category.name }}</div>
                        <div v-if="category.subcategories">
                            <SvgIcon type="mdi" :path="mdiArrowRightThin" :size="18"></SvgIcon>
                        </div>
                    </div>
                    <div class="header-category__content__divider"></div>
                    <div class="header-category__content__additional-categories">
                        <div>Katalogi</div>
                        <div>Nowości</div>
                        <div>Blog</div>
                    </div>
                </div>
                <Transition name="menu-category">
                    <div ref="subcategories" v-if="areCategorySubcategoriesVisible">
                        <div class="header-category__content__category-subcategories">
                            <div class="header-category__content__category-subcategories__subcategory"
                                v-for="subcategory in categorySubcategories" :key="subcategory.id"
                                :style="{ backgroundColor: subcategory.expanded ? '#efefef' : '' }"
                                @click="openSubcategorySubcategories(subcategory)">
                                <div>{{ subcategory.name }}</div>
                                <div v-if="subcategory.subcategories">
                                    <SvgIcon type="mdi" :path="mdiArrowRightThin" :size="18"></SvgIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
                <Transition name="menu-category">
                    <div v-if="areSubcategorySubcategoriesVisible">
                        <div class="header-category__content__subcategory-subcategories">
                            <div class="header-category__content__subcategory-subcategories__subcategory"
                                v-for="subcategory in subcategorySubcategories" :key="subcategory.id">
                                {{ subcategory.name }}
                            </div>
                        </div>
                    </div>
                </Transition>
                <div class="header-category__content__advert">
                    <img :src="saleImage">
                </div>
            </div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowRightThin } from '@mdi/js'
import saleImage from '@/assets/sale.webp'
import { doObjectOrArrayExistsAndNotNull } from '@/helpers/helpers'

const props = defineProps({
    title: String,
    menu: Array
})

const contextMenu = ref()
const subcategories = ref()

const menuCategories = ref<Array<[]>>([])

const areCategoryDetailsVisible = ref<boolean>(false)

const areCategorySubcategoriesVisible = ref<boolean>(false)
const areSubcategorySubcategoriesVisible = ref<boolean>(false)

const menuCategorySubctagories = ref<Array<[]>>();
const menuSubcategorySubcategories = ref<Array<[]>>();

const categorySubcategories = ref<Array<[]>>();
const subcategorySubcategories = ref<Array<[]>>();

function loadProperties() {
    menuCategories.value = []
    menuCategorySubctagories.value = []
    menuSubcategorySubcategories.value = []
    areCategoryDetailsVisible.value = false
    props.menu?.forEach((element: any) => {
        menuCategories.value?.push({ ...element, expanded: false });
        if (doObjectOrArrayExistsAndNotNull(element.subcategories)) {
            element.subcategories.forEach((subcategory: any) => {
                menuCategorySubctagories.value?.push({ ...subcategory, expanded: false })
                if (doObjectOrArrayExistsAndNotNull(subcategory.subcategories)) {
                    subcategory.subcategories.forEach((subcategorySubcategory: any) => {
                        menuSubcategorySubcategories.value?.push({ ...subcategorySubcategory, expanded: false })
                    })
                }
            })
        }
    });
}
function resetCategoryListExpandedProperty(categoryList: Array<[]>) {
    categoryList.forEach(el => { el.expanded = false })
}
function changeContextMenuPosition() {
    if (doObjectOrArrayExistsAndNotNull(contextMenu.value)) {
        const offScreenDistance = contextMenu.value.ownerDocument.body.clientWidth - (contextMenu.value.getBoundingClientRect().width + contextMenu.value.getBoundingClientRect().left)
        if (offScreenDistance < 0) {
            if (doObjectOrArrayExistsAndNotNull(subcategories.value)) {
                contextMenu.value.style.right += subcategories.value.getBoundingClientRect().width
            } else contextMenu.value.style.right = 0
        }
    }
}
function openCategorySubcategories(category: object) {
    resetCategoryListExpandedProperty(menuCategories.value)
    if (doObjectOrArrayExistsAndNotNull(categorySubcategories.value)) {
        resetCategoryListExpandedProperty(categorySubcategories.value)
    }
    if (doObjectOrArrayExistsAndNotNull(category.subcategories)) {
        areCategorySubcategoriesVisible.value = true
        category.expanded = true
        categorySubcategories.value = menuCategories.value.find((el) => el.expanded === true).subcategories
        areSubcategorySubcategoriesVisible.value = false
    }
}
function openSubcategorySubcategories(subcategory: object) {
    resetCategoryListExpandedProperty(categorySubcategories.value)
    if (doObjectOrArrayExistsAndNotNull(subcategory.subcategories)) {
        areSubcategorySubcategoriesVisible.value = true;
        subcategory.expanded = true
        subcategorySubcategories.value = categorySubcategories.value?.find((el) => el.expanded === true).subcategories
    }
}
function resetVisiblity() {
    areCategorySubcategoriesVisible.value = false;
    areSubcategorySubcategoriesVisible.value = false;
}
onMounted(() => {
    loadProperties()
})
</script>
<style scoped lang="scss">
.header-category {
    &__title {
        height: 100%;
        font-weight: 700;
        letter-spacing: 2px;
        font-size: 14px;
    }

    &__content {
        display: flex;
        position: absolute;
        padding: 20px;
        cursor: pointer;
        -webkit-box-shadow: 8px 30px 27px -12px rgba(66, 68, 90, 1);
        -moz-box-shadow: 8px 30px 27px -12px rgba(66, 68, 90, 1);
        box-shadow: 8px 30px 27px -12px rgba(66, 68, 90, 1);
        border-radius: 12px;
        color: rgb(63, 63, 63);

        &__categories {
            display: flex;
            flex-direction: column;
            padding: 12px;
            max-height: 400px;
            overflow-y: auto;
            overflow-x: hidden;

            &__category {
                display: flex;
                justify-content: space-between;
                padding: 5px;

                &:hover {
                    background-color: $border-color;
                }
            }
        }

        &__category-subcategories {
            display: flex;
            flex-direction: column;
            padding: 12px;
            max-height: 400px;
            overflow-y: auto;

            &__subcategory {
                display: flex;
                justify-content: space-between;
                padding: 5px;

                &:hover {
                    background-color: $border-color;
                }
            }
        }

        &__subcategory-subcategories {
            display: flex;
            flex-direction: column;
            padding: 12px;
            max-height: 400px;
            overflow-y: auto;

            &__subcategory {
                display: flex;
                justify-content: space-between;
                padding: 5px;

                &:hover {
                    background-color: $border-color;
                }
            }
        }

        &__divider {
            width: 100%;
            border: 1px solid grey;
            margin: 10px 0 10px 0;
        }

        &__additional-categories {
            display: flex;
            flex-direction: column;

            div {
                padding: 5px;
            }
        }

        &__advert {
            img {
                max-width: 200px;
            }
        }
    }
}

@media (max-width: 800px) {
    .header-category {
        &__content {
            &__advert {
                display: none;
            }
        }
    }
}
</style>