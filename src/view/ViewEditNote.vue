<template>
  <div class="edit-note">
    <AddEditNote v-model="noteContent" placeholder="Edit Note" ref="addEditNoteRef">
      <template #buttons>
        <button :disabled="!noteContent" class="button is-link has-background-link">Save Note</button>
        <RouterLink :to="{name: 'home'}" class="button is-link has-background-dark ml-2">Cancel</RouterLink to="/">
      </template>
    </AddEditNote>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

const route = useRoute()
const noteContent = ref('')
const noteStore = useStoreNotes()

noteContent.value = noteStore.getNoteContent(route.params.id)

</script>
