<script setup lang="ts">
import { ref, computed, type ComputedRef }  from 'vue'

type Note = {
  id: string,
  noteTitle: string,
  noteDescription: string,
}
const appTitle = ref("FieldNotes")
const subTitle = ref("Журнал технических замечаний")
const noteTitle = ref("")
const noteDescription = ref("")
const notes = ref<Note[]>([])
const isTitleValid: ComputedRef<boolean> =
  computed(()=> noteTitle.value.trim().length > 0)
const isDescriptionValid: ComputedRef<boolean> =
  computed(() => noteDescription.value.trim().length > 0)
const isNoteTitleTouched = ref(false)
const isNoteDescriptionTouched = ref(false)

function removeNote(id: string){
  notes.value = notes.value.filter(note => note.id !== id)
}

function clearInput() {
  noteTitle.value = ""
  noteDescription.value = ""
  isNoteTitleTouched.value = false
  isNoteDescriptionTouched.value = false
}

function addValueToNotes(noteTitle: string, noteDescription: string) {
  if (!isDescriptionValid.value || !isTitleValid.value) {
      return
    }
    const id: string = crypto.randomUUID()
    const note: Note = {
    id: id,
    noteTitle: noteTitle,
    noteDescription: noteDescription}
    notes.value.push(note)
    clearInput()

}
</script>

<template>
  <div class="mainWindow">
    <div class="headerRow">
      <div>
        <h1 class="header-h1-style">{{ appTitle }}</h1>
      </div>
      <div>
        <h3 class="header-h3-style">{{ subTitle }}</h3>
      </div>
    </div>
    <form class="mainForm" @submit.prevent>
        <label for="idNoteTitle" class="input-labels">Наименование замечания:</label>
        <input
          id="idNoteTitle"
          v-model="noteTitle" type="text"
          @input = "isNoteTitleTouched = true"
          placeholder="Добавьте наименование замечания">
      <div class="validation-slot">
        <p v-if="!isTitleValid
        && isNoteTitleTouched">
          Название замечания не должно быть пустым или состоять только из пробелов.</p>
      </div>
      <label for="idNoteDescription" class="input-labels">Описание замечания: </label>
        <textarea
          id="idNoteDescription"
          v-model="noteDescription"
          @input="isNoteDescriptionTouched=true"

          placeholder="Введите полное описание замечания"></textarea>
        <div class="validation-slot">
          <p
            v-if="!isDescriptionValid
          && isNoteDescriptionTouched">
            Описание не должно быть пустым или состоять только из пробелов. </p>
        </div>
      <div class="bottom-button">
        <button @click="clearInput()" class="buttons" type="button">Отменить</button>
        <button
          @click="addValueToNotes(noteTitle, noteDescription)"
          class="buttons"
          type="button"
        :disabled = "!isTitleValid || !isDescriptionValid">
          Добавить</button>
      </div>
    </form>
  </div>

  <br>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Полное описание</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="value in notes" :key="value.id">
          <td>{{value.noteTitle}}</td>
          <td>{{value.noteDescription}}</td>
          <td><button @click = "removeNote(value.id)">Удалить замечание</button></td>
      </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>
  .mainWindow{
    max-width: 500px;
    display: flex;
    flex-direction: column;
    font-family: SansSerif,serif;
    background-color: aliceblue;
    border-radius: 20px;
    justify-content: center;
    padding: 10px;
  }

  .mainForm{
    display: flex;
    padding: 10px;
    flex-direction: column;
    max-width: 420px;
  }

  .headerRow{
    display: flex;
    flex-direction: column;
    border-bottom: solid #000000;
  }

  .buttons{
    margin-inline: 0px;
    border-radius: 5px;
  }

  input{
    box-sizing: border-box;
    border-radius: 5px;
  }
  textarea{
    box-sizing: border-box;
    resize: vertical;
    min-height: 200px;
    border-radius: 5px;
  }
  .validation-slot{
    min-height: 2em;
  }
  .validation-slot p{
    margin: 0;
    margin-block-end: 0;
    font-size: smaller;
  }
  .header-h1-style{
    font-family: SansSerif,serif;
    margin-block-end: 0;
  }
  .header-h3-style{
    font-family: SansSerif,serif;
    margin-block-start: 0;
  }
  .input-labels{
    margin-bottom: 0.5em;
  }
  .bottom-button{
    display: flex;
    justify-content: flex-end;
    gap: 10px
  }

</style>
