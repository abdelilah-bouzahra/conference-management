import { element, by, ElementFinder } from 'protractor';

export class NoteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-note div table .btn-danger'));
    title = element.all(by.css('jhi-note div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NoteUpdatePage {
    pageTitle = element(by.id('jhi-note-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    noteInput = element(by.id('field_note'));
    userSelect = element(by.id('field_user'));
    articleSelect = element(by.id('field_article'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async articleSelectLastOption() {
        await this.articleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async articleSelectOption(option) {
        await this.articleSelect.sendKeys(option);
    }

    getArticleSelect(): ElementFinder {
        return this.articleSelect;
    }

    async getArticleSelectedOption() {
        return this.articleSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class NoteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-note-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-note'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
