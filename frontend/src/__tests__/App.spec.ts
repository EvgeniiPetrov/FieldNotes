// @vitest-environment jsdom
import {describe, expect, it} from 'vitest'
import App from '../App.vue'
import {mount} from "@vue/test-utils";

// const wrapper = mount(App)
// const btnAdd = wrapper.find('[data-testid = "addButton"]')
// const btnCancel = wrapper.find('[data-testid = "cancelButton"]')
// const NoteTitleInput = wrapper.find('[data-testid = "NoteTitleInput"]')
// const NoteDescriptionTextArea = wrapper.find('[data-testid = "NoteDescriptionTextArea"]')

describe('FieldNotes — форма и список замечаний', () => {
  it('Не позволяет добавить замечание с пустыми полями', () => {
    const wrapper = mount(App)
    const btnAdd = wrapper.find('[data-testid = "addButton"]')
    // expect(btnAdd.attributes('disabled'))
    expect(btnAdd.element.getAttribute('disabled')).toBe('')
  });
  it('Разрешает добавление при заполненных полях', async () => {
    const wrapper = mount(App)
    const btnAdd = wrapper.find('[data-testid = "addButton"]')
    const NoteTitleInput = wrapper.find('[data-testid = "NoteTitleInput"]')
    const NoteDescriptionTextArea = wrapper.find('[data-testid = "NoteDescriptionTextArea"]')
    await NoteTitleInput.setValue("test input")
    await NoteDescriptionTextArea.setValue("Test TextArea")
    // expect(btnAdd.attributes().disabled).toBeUndefined()
    expect(btnAdd.attributes().disabled).toBeUndefined()
  })
  it.todo('Показывает добавленное замечание в таблице')
  it.todo('Удаляет выбранное замечание, сохраняя остальные')
})
