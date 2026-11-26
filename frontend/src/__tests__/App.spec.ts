// @vitest-environment jsdom
import {describe, expect, it} from 'vitest'
import App from '../App.vue'
import {mount} from "@vue/test-utils";
import * as vm from "node:vm";

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
  it('Показывает добавленное замечание в таблице', async () => {
    const wrapper = mount(App)

    const btnAdd = wrapper.find('[data-testid = "addButton"]')
    const noteTitleInput= wrapper.find<HTMLInputElement>('[data-testid = "NoteTitleInput"]')
    const footerNotesTable = wrapper.find('[data-testid = "footerNotesTable"]')
    const noteDescriptionTextArea = wrapper.find<HTMLTextAreaElement>('[data-testid = "NoteDescriptionTextArea"]')

    await noteTitleInput.setValue("test input")
    expect(noteTitleInput.element.value).toBe('test input')

    await noteDescriptionTextArea.setValue("Test TextArea")
    expect(noteDescriptionTextArea.element.value).toBe("Test TextArea")
    await btnAdd.trigger('click')

    const resultInTable: number =footerNotesTable.findAll('tbody tr').length

    expect( resultInTable).toBe(1)

  })
  it.todo('Удаляет выбранное замечание, сохраняя остальные')
})
