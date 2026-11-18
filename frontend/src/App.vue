<script setup lang="ts">
import { ref }  from 'vue'

type Note = {
  id: string,
  noteTitle: string,
  noteDescription: string,
}
const appTitle = ref("FieldNotes:")
const subTitle = ref("Журнал технических замечаний")
const noteTitle = ref("")
const noteDescription = ref("")
// const savingNote: Note ={id: "-1", noteTitle: "", noteDescription: ""}
const notes = ref<Note[]>([])

function clearInput() {
  noteTitle.value = ""
  noteDescription.value = ""
}

function addValueToNotes(noteTitle: string, noteDescription: string) {

  const id: string = crypto.randomUUID()
  const note: Note = {
    id: id,
    noteTitle: noteTitle,
    noteDescription: noteDescription
  }
  notes.value.push(note)
  clearInput()
}
</script>


<template>
  <div>
    <div class="headerRow">
      <h1>{{ appTitle }}</h1>
      <h2>{{ subTitle }}</h2>
    </div>
    <form class="mainForm" @submit.prevent>
        <label for="idNoteTitle">Наименование замечания:</label>
        <input id="idNoteTitle" v-model="noteTitle" type="text" placeholder="Добавьте наименование замечания">
        <label for="idNoteDescription">Описание замечания: </label>
      <textarea id="idNoteDescription" v-model="noteDescription" placeholder="Введите полное описание замечания"></textarea>

      <div >
        <button @click="addValueToNotes(noteTitle, noteDescription)" class="buttons" type="button">Добавить</button>
        <button @click="clearInput()" class="buttons" type="button">Отменить</button>
      </div>
    </form>
  </div>

  <br>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
        <tr v-for="value in notes" :key="value.id">
          <td>{{value.noteTitle}}</td>
          <td>{{value.noteDescription}}</td>
      </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>
  .mainForm{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .headerRow{
    display: flex;
    align-items: baseline;
    flex-direction: row;
    gap: 12px;
  }

  .buttons{
    margin: 10px;
  }

  input, textarea{
    width: 200px;
  }

</style>
