<script setup lang="ts">
import { ref }  from 'vue'
const appTitle = ref("FieldNotes:")
const subTitle = ref("Журнал технических замечаний")
const noteTitle = ref("")
const noteDescription = ref("")

</script>


<template>
  <div>
    <div>
      <h1>{{ appTitle }}</h1>
      <h2>{{ subTitle }}</h2>
    </div>
    <form class="mainForm">
      <div>
        <label for="idNoteTitle">Наименование замечания:</label>
        <input id="idNoteTitle" width="35" v-model="noteTitle" type="text" placeholder="Добавьте наименование замечания">
      </div>
      <div>
        <label for="idNoteDescription">Описание замечания: </label>
        <textarea id="idNoteDescription" v-model="noteDescription" placeholder="Введите полное описание замечания"></textarea>
      </div>
      <div>
        <button type="button">Добавить</button>
        <button type="button">Отменить</button>
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

</style>
