<script setup lang="ts">
import { ref }  from 'vue'
const appTitle = ref("FieldNotes:")
const subTitle = ref("Журнал технических замечаний")
const noteTitle = ref("")
const noteDescription = ref("")

</script>


<template>
  <div>
    <h1>{{ appTitle }}</h1>
    <h2>{{ subTitle }}</h2>
  </div>
  <form>
    <div>
      <label id="idNoteTitle">Наименование замечания:</label>
      <input id="idNoteTitle" width="35" v-model="noteTitle" type="text" placeholder="Добавьте наименование замечания">
    </div>
    <div>
      <label id="idNoteDescription">Описание замечания: </label>
      <textarea id="idNoteDescription" v-model="noteDescription" placeholder="Введите полное описание замечания"></textarea>
    </div>
    <div>
      <button type="submit">Добавить</button>
      <button type="reset">Отменить</button>
    </div>
  </form>
</template>

<style scoped></style>
