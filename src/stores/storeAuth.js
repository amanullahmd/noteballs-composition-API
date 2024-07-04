import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      try {
        const storeNotes = useStoreNotes()
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user.id = user.uid
            this.user.email = user.email
            this.router.push({ name: 'home' })
            storeNotes.init()
          } else {
            this.user = {}
            this.router.replace({ name: 'auth' })
            storeNotes.clearNotes()
          }
        })
      } catch (error) {
        console.error('Error signing out user: ', error.message)
      }
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })
    },
    userLogin(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })
    },
    userSignOUt() {
      signOut(auth)
        .then(() => {
          //console.log('user has been sign out!')
        })
        .catch((error) => {
          //console.log(error.message)
        })
    }
  }
})
