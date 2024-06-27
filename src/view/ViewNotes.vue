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

    <Note v-for="note in notes" :key="note.id" :note="note" @deleteNote="handlerDeleteNote" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
const newNote = ref('')
const newNoteRef = ref(null)

const notes = ref([
  {
    id: 'id1',
    content:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.'
  },
  {
    id: 'id2',
    content: ' Lorem ipsum dolor sit amet, consectetur woo!'
  }
])

const addNote = () => {
  let id = new Date().getTime().toString()

  let note = {
    id,
    content: newNote.value
  }

  notes.value.unshift(note)
  newNote.value = ''
  newNoteRef.value.focus()
}

const handlerDeleteNote = (noteId)=> {
    notes.value = notes.value.filter(note => note.id !== noteId);
}

</script>
