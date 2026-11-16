<script setup lang="ts">
import { ref }  from 'vue'
const appTitle = ref("FieldNotes:")
const subTitle = ref("Журнал технических замечаний")
const noteTitle = ref("")
const noteDescription = ref("")

</script>


<template>
  <div>
    <th></th>
    <tbody>
    <tr>
      <td>
        <h1>{{ appTitle }}</h1>
      </td>
      <td>
        <h2>{{ subTitle }}</h2>
      </td>
    </tr>
    <tr>
      <td>
        <p>Наименование замечания:</p>
      </td>
      <td>
        <input minlength="30%" v-model="noteTitle" type="text" placeholder="Добавьте наименование замечания">
      </td>
    </tr>
    <tr>
      <td>
        <p>Описание замечания: </p>
      </td>
      <td>
        <textarea v-model="noteDescription" placeholder="Введите полное описание замечания"></textarea>
      </td>
    </tr>
    <tr>
      <td><button>Добавить</button></td>
      <td><button>Отменить</button></td>
    </tr>
    </tbody>

  </div>
</template>

<style scoped></style>
