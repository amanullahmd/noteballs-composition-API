import { defineStore } from 'pinia'
export const useStoreNotes = defineStore('StoreNotes', {
  state: () => {
    return {
      notes: [
        {
          id: 'id1',
          content:
            ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.'
        },
        {
          id: 'id2',
          content: ' Lorem ipsum dolor sit amet, consectetur woo!'
        }
      ]
    }
  },
  actions: {
    addNote(newNotesContent) {
      let id = new Date().getTime().toString()

      let note = {
        id,
        content: newNotesContent
      }
      this.notes.unshift(note)
    },
    deleteNote(deleteNoteId) {
      this.notes = this.notes.filter((note) => note.id !== deleteNoteId)
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (noteId) => {
        const note = state.notes.find(note => note.id === noteId)
        return note ? note.content : null
      }
    }
  }
})
