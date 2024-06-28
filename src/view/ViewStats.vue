<template>
    <main>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of Notes</td>
                    <td>{{ noteStore.totalNotesCount }}</td>
                </tr>
                <tr>
                    <td>Number of Characters (of all notes)</td>
                    <td>{{ noteStore.totalCharacters }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes';

const noteStore = useStoreNotes()


</script>