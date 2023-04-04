<template>
    <div class="header-top">
        <div class="header-top__bigLogo">
            <img :src="siteLogo" alt="site Logo" />
        </div>
        <div class="header-top__input">
            <div class="header-top__input__icon" @click="isMobileMenuVisible = true">
                <SvgIcon type="mdi" :path="mdiMenu" :size="34" style="color: red"></SvgIcon>
                <div>MENU</div>
            </div>
            <Transition name="mobile-menu">
                <div v-if="isMobileMenuVisible" class="header-bottom__mobile-menu">
                    <MobileMenu :menuItems="menuItems" @closeMenu="isMobileMenuVisible = false" />
                </div>
            </Transition>
            <div class="header-top__input__divider"></div>
            <MenuInput :type="'text'" :placeholder="'Wpisz nazwę lub cechę produktu...'" />
        </div>
        <div class="header-top__actions">
            <div class="header-top__actions__smallLogo">
                <img :src="siteLogo" alt="site Logo" />
            </div>
            <div class="header-top__actions__options">
                <HeaderTopOption :path="mdiAccountOutline" :title="'Zaloguj się'" />
                <HeaderTopOption :path="mdiHeartOutline" :title="'Ulubione'" />
                <HeaderTopOption :path="mdiMapMarkerRadiusOutline" :title="'Znajdz salon'" />
                <div class="header-top__actions__options__basket">
                    <HeaderTopOption :path="mdiBasketOutline" :title="'Koszyk'" />
                    <div class="header-top__actions__options__basket__basket-chip">
                        2
                    </div>
                </div>
            </div>
            <div class="header-top__actions__options__select">
                <select>
                    <option v-for="language in languageOptions" :value="language.value" :key="language.value">
                        {{ language.text }}
                    </option>
                </select>
            </div>
        </div>
        <MenuModal :showModal="isModalVisible" :modalText="'Mobile menu API Error'" @closeModal="isModalVisible = false" />
    </div>
</template>
<script setup lang="ts">
import siteLogo from '@/assets/fish-logo.jpg'
import { mdiAccountOutline, mdiBasketOutline, mdiHeartOutline, mdiMapMarkerRadiusOutline, mdiMenu } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';
import { onMounted, ref } from 'vue';
import HeaderTopOption from './HeaderTopOption.vue';
import MenuInput from '../../../ui/MenuInput.vue';
import MobileMenu from '../../mobileMenu/MobileMenu.vue';
import Axios from 'axios';
import { TMenu } from '@/helpers/types';
import MenuModal from '@/components/partials/MenuModal.vue';

const isMobileMenuVisible = ref<boolean>(false)
const menuItems = ref<object>()
const isModalVisible = ref<boolean>(false)
const languageOptions = ref([
    { text: 'PL', value: 'pol' },
    { text: 'EN', value: 'eng' },
    { text: 'GE', value: 'ger' }
])
async function getMenuMobileItems() {
    try {
        const response = await Axios.get<TMenu>('https://run.mocky.io/v3/b0f35d05-7fcf-40b9-b1a7-84350aba0432')
        menuItems.value = response.data.mobile_menu
    } catch (error) {
        console.error(error)
        isModalVisible.value = true
    }
}

onMounted(() => {
    getMenuMobileItems()
})
</script>
<style scoped lang="scss">
.header-top {
    display: flex;
    justify-content: flex-start;
    overflow-x: hidden;
    margin-bottom: 10px;

    &__bigLogo {
        margin-left: 85px;

        img {
            max-width: 180px;
        }
    }

    &__input {
        padding-left: 30px;
        padding-right: 20px;
        width: 33%;
        height: 65px;
        margin-left: 110px;

        &__icon {
            display: none;
        }

        &__divider {
            display: none;
        }
    }

    &__actions {
        display: flex;
        position: absolute;
        top: 10px;
        right: 40px;

        &__smallLogo {
            display: none;
        }

        &__options {
            @include flexCenter(row, space-between);
            height: 100%;
            width: 320px;

            &__basket {
                position: relative;
                @include flexCenter(row, center);
                align-items: center;

                &__basket-chip {
                    position: absolute;
                    right: 0;
                    top: 0;
                    @include flexCenter(row, center);
                    align-items: center;
                    border-radius: 50%;
                    background-color: $error-color;
                    width: 20px;
                    height: 20px;
                    color: white;
                }
            }

            &__select {
                @include flexCenter(row, center);
                align-items: flex-start;
                position: relative;
                margin-left: 20px;

                &::after {
                    width: 0;
                    top: 6px;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid $error-color;
                    position: absolute;
                    content: "";
                }

                select {
                    font-size: 16px;
                    background-color: transparent;
                    border: 0;
                    width: 50px;
                    position: relative;
                    color: gray;
                    appearance: none;
                    background: none;
                }
            }
        }
    }
}

@media(max-width: 1300px) {
    .header-top {
        justify-content: space-around;

        &__bigLogo {
            margin-left: 40px;
        }

        &__input {
            padding-left: 0px;
            margin-left: 40px;
        }

        &__actions {
            position: static;
        }
    }
}

@media (max-width: 800px) {
    .header-top {
        flex-direction: column-reverse;

        &__bigLogo {
            display: none;
        }

        &__input {
            @include flexCenter(row, space-between);
            width: 100%;
            padding-right: 0px;
            background-color: rgb(231, 231, 231);
            margin-left: 0;

            &__icon {
                @include flexCenter(column, center);
                align-items: center;
                font-size: 10px;
                color: grey;
                margin-left: 20px;
            }

            &__divider {
                display: flex;
                margin: 5px 20px 5px 20px;
                border: 1px solid rgb(180, 180, 180);
            }
        }

        &__actions {
            justify-content: space-between;
            font-size: 10px;
            margin-bottom: 20px;
            right: 0;

            &__smallLogo {
                @include flexCenter(row, center);
                align-items: center;
                margin-right: 10px;

                img {
                    width: 100px;
                }
            }

            &__options {
                &__select {
                    display: none;
                }

            }
        }
    }
}

@media (max-width: 400px) {
    .header-top {
        &__input {
            font-size: 12px;
            height: 55px;
        }

        &__actions {
            font-size: 8px;
        }
    }
}
</style>
