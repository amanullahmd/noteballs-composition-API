<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>
            {{ charactersLength }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="deleteNote">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()

const props = defineProps({
  note: {
    type: Object,
    require: true
  }
})

const charactersLength = computed(() => {
  let description = props.note.content.length > 1 ? 'characters' : 'character'
  return `${props.note.content.length} ${description}`
})

const deleteNote = () => {
  storeNotes.deleteNote(props.note.id)
}
</script>
