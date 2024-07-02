<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef">
      <template #buttons>
        <button class="button is-link" :disabled="!newNote" @click="addNote">Add New Note</button>
      </template>
    </AddEditNote>
    <progress
      v-if="storeNotes.loadingBar"
      class="progress is-large is-success"
      max="100"
    ></progress>
    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />

      <div
        v-if="!storeNotes.notes.length"
        class="is-size4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        No notes here yet...
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useWatchCharacters } from '@/use/useWatchCharacters'

import { useStoreNotes } from '@/stores/storeNotes'

const newNote = ref('')
const addEditNoteRef = ref(null)

const storeNotes = useStoreNotes()

const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''
  addEditNoteRef.value.focusTextArea()
}

useWatchCharacters(newNote)
</script>
