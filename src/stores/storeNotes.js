import { defineStore } from 'pinia'
import { collection, getDocs, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { db } from '@/js/firebase'

export const useStoreNotes = defineStore('StoreNotes', {
  state: () => {
    return {
      notes: [],
      loadingBar: false
    }
  },
  actions: {
    async getNotes() {
      this.loadingBar = true
      const q = query(collection(db, 'notes'), orderBy('date', 'desc'))
      onSnapshot(q, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            date: doc.data().date,
            content: doc.data().content
          }
          notes.push(note)
        })

        this.notes = notes
        this.loadingBar = false
      })
    },
    async addNote(newNotesContent) {
      let id = new Date().getTime().toString()

      await setDoc(doc(db, 'notes', id), {
        content: newNotesContent
      })
    },
    deleteNote(deleteNoteId) {
      this.notes = this.notes.filter((note) => note.id !== deleteNoteId)
    },
    updateNote(id, content) {
      const index = this.notes.findIndex((note) => note.id === id)
      this.notes[index].content = content
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (noteId) => {
        const note = state.notes.find((note) => note.id === noteId)
        return note ? note.content : null
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharacters: (state) => {
      let totalCharacters = 0
      state.notes.forEach((note) => (totalCharacters += note.content.length))
      return totalCharacters
    }
  }
})
