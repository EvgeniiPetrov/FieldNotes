<script setup lang="ts">
import { ref }  from 'vue'
const headerLine = ref("FieldNotes:")
const subHeaderLine = ref("Журнал технических замечаний")
const bugTitle = ref("")
const bugDescription = ref("")

</script>


<template>
  <tr>
    <td>
      <h1>{{headerLine}}</h1>
    </td>
    <td>
      <h2>{{subHeaderLine}}</h2>
    </td>
  </tr>
  <tr>
    <td>
      <p>Наименование замечания:</p>
    </td>
    <td>
      <input v-model="bugTitle" type="text" placeholder="Добавьте наименование замечания">
    </td>
  </tr>
  <tr>
    <td>
      <p>Описание замечания: </p>
    </td>
    <td>
      <textarea v-model="bugDescription" placeholder="Введите полное описание замечания"></textarea>
    </td>
  </tr>
  <tr>
    <td><button>Сохранить</button></td>
    <td><button>Отменить</button></td>
  </tr>


</template>

<style scoped></style>
