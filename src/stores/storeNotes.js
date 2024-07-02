import { defineStore } from 'pinia'
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  addDoc
} from 'firebase/firestore'
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
      let date = new Date().getTime().toString()
      await addDoc(collection(db, 'notes'), {
        date,
        content: newNotesContent
      })
    },
    async deleteNote(deleteNoteId) {
      try {
        await deleteDoc(doc(db, 'notes', deleteNoteId))
      } catch (error) {
        console.error('Error deleting note: ', error)
      }
    },
    async updateNote(id, content) {
      await updateDoc(doc(db, 'notes', id), {
        content: content
      })
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
