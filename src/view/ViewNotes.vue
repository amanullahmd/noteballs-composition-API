<template>
  <div class="notes">
    <div class="my-2">
      <div class="field card">
        <div class="control">
          <textarea
            class="textarea"
            v-model="newNote"
            ref="newNoteRef"
            placeholder="Add new note"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :disabled="!newNote" @click="addNote">Add New Note</button>
      </div>
    </div>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const newNote = ref('')
const newNoteRef = ref(null)

const storeNotes = useStoreNotes()

const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''
  newNoteRef.value.focus()
}
</script>
