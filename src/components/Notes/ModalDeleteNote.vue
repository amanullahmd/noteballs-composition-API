<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="clickOutsideTarget">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note? {{ noteId }} 
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-danger" @click="deleteNote">Delete</button>
          <button @click="closeModal" class="button">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
const storeNotes = useStoreNotes()

const emits = defineEmits(['update:modelValue'])

const clickOutsideTarget = ref(null)

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    requered: true
  }
})

const closeModal = () => {
  emits('update:modelValue', false)
}

onClickOutside(clickOutsideTarget, closeModal)

const handleKeyboard = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(()=> {
    document.removeEventListener('keyup', handleKeyboard)
})

const deleteNote = () => {
  storeNotes.deleteNote(props.noteId)
}
</script>
