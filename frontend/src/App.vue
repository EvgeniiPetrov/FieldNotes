<script setup lang="ts">
import { ref }  from 'vue'
const appTitle = ref("FieldNotes:")
const subTitle = ref("Журнал технических замечаний")
const noteTitle = ref("")
const noteDescription = ref("")

function clearInput() {
  noteDescription.value = ""
  noteTitle.value = ""
}

</script>


<template>
  <div>
    <div>
      <h1>{{ appTitle }}</h1>
      <h2>{{ subTitle }}</h2>
    </div>
    <form class="mainForm">
      <label for="idNoteTitle">Наименование замечания:</label>
      <input id="idNoteTitle" v-model="noteTitle" type="text" placeholder="Добавьте наименование замечания">
      <label for="idNoteDescription">Описание замечания: </label>
      <textarea id="idNoteDescription" v-model="noteDescription" placeholder="Введите полное описание замечания"></textarea>
      <div >
        <button class="buttons" type="button">Добавить</button>
        <button @click="clearInput()" class="buttons" type="button">Отменить</button>
      </div>
    </form>
  </div>

</template>

<style scoped>
  .mainForm{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .buttons{
    margin: 10px;
  }

  input, textarea{
    width: 200px;
  }

</style>
