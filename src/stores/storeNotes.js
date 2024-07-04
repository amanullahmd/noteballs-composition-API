import { defineStore } from 'pinia'
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let noteCollectionRef
let getNotesSnapshot

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      loadingBar: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()
      noteCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      this.getNotes()
    },
    async getNotes() {
      this.loadingBar = true
      const q = query(noteCollectionRef, orderBy('date', 'desc'))

      getNotesSnapshot = onSnapshot(q, (querySnapshot) => {
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
      }, error => {
        //console.log("Error msg: " + error.message);
      })
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() // unsubscrive from any active listener
    },
    async addNote(newNotesContent) {
      let date = new Date().getTime().toString()
      await addDoc(noteCollectionRef, {
        date,
        content: newNotesContent
      })
    },
    async deleteNote(deleteNoteId) {
      try {
        await deleteDoc(doc(noteCollectionRef, deleteNoteId))
      } catch (error) {
        console.error('Error deleting note: ', error)
      }
    },
    async updateNote(id, content) {
      await updateDoc(doc(noteCollectionRef, id), {
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
