<template>
  <div class="card is-active">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns has-text-grey-light mt-2">
          <small class="column"> {{ formattedDate }} </small>
          <small class="column has-text-right">
            {{ charactersLength }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="{ name: 'editNote', params: { id: note.id } }" class="card-footer-item"
        >Edit</RouterLink
      >
      <a href="#" class="card-footer-item" @click.prevent="modals.deleteModal = true">Delete</a>
    </footer>
    <ModalDeleteNote v-model="modals.deleteModal" v-if="modals.deleteModal" :noteId="note.id" />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useDateFormat } from '@vueuse/core'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'

const modals = reactive({
  deleteModal: false
})

const props = defineProps({
  note: {
    type: Object,
    require: true
  }
})

const formattedDate = computed(() => {
  let date = new Date(parseInt(props.note.date))
  const formatted = useDateFormat(date, 'DD-MM-YYYY HH:mm')
  return formatted.value
})

const charactersLength = computed(() => {
  let description = props.note.content.length > 1 ? 'characters' : 'character'
  return `${props.note.content.length} ${description}`
})
</script>
