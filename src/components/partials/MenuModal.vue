<template>
    <div>
        <Transition name="fade">
            <div class="modal-overlay" v-if="showModal" @click="emit('closeModal')"></div>
        </Transition>
        <Transition name="fade">
            <div class="modal" role="dialog" v-if="showModal">
                <h1>API Error</h1>
                <h3>{{ props.modalText }}</h3>
                <div class="modal__description">Please refresh the page</div>
                <button @click="emit('closeModal')" class="button">Close</button>
            </div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
const props = defineProps({
    showModal: Boolean,
    modalText: String
})
const emit = defineEmits(['closeModal'])
</script>
<style scoped lang="scss">
.modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    width: fit-content;
    height: fit-content;
    padding: 20px;
    width: 30%;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;

    h1 {
        margin: 0 0 1rem;
        color: red;
    }

    &__description {
        margin-bottom: 15px;
    }

    button {
        color: #1a1a1a;
        font-size: 16px;
        border-radius: 6px;
        border: solid 1px #1a1a1a;
        cursor: pointer;
        background: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 50px;
    }

    button:hover {
        background: #f6f6f6;
    }

    &-overlay {
        content: '';
        position: absolute;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 998;
        background: #2c3e50;
        opacity: 0.6;
        cursor: pointer;
    }
}
</style>
