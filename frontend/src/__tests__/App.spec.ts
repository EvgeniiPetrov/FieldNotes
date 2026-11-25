// @vitest-environment jsdom
import {describe, expect, it} from 'vitest'
import App from '../App.vue'
import {mount} from "@vue/test-utils";

const wrapper = mount(App)
const btnAdd = wrapper.find('[data-testid = "addButton"]')
const btnCancel = wrapper.find('[data-testid = "cancelButton"]')

describe('FieldNotes — форма и список замечаний', () => {
  it('Не позволяет добавить замечание с пустыми полями', () => {
    expect(btnAdd.attributes('disabled'))});
  it('Разрешает добавление при заполненных полях', () => {

  })
  it.todo('Показывает добавленное замечание в таблице')
  it.todo('Удаляет выбранное замечание, сохраняя остальные')
})
