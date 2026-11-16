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
  <div>
    <form>
      <label>Наименование замечания:</label>
      <input minlength="35" v-model="noteTitle" type="text" placeholder="Добавьте наименование замечания">
    </form>
    <form>
      <label>Описание замечания: </label>
      <textarea v-model="noteDescription" placeholder="Введите полное описание замечания"></textarea>
    </form>
    <form>
      <button>Добавить</button>
      <button>Отменить</button>
    </form>
  </div>
</template>

<style scoped></style>
