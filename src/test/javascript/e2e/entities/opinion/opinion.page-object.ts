import { element, by, ElementFinder } from 'protractor';

export class OpinionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-opinion div table .btn-danger'));
    title = element.all(by.css('jhi-opinion div h2#page-heading span')).first();

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

export class OpinionUpdatePage {
    pageTitle = element(by.id('jhi-opinion-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bodyInput = element(by.id('field_body'));
    typeInput = element(by.id('field_type'));
    userSelect = element(by.id('field_user'));
    articleSelect = element(by.id('field_article'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBodyInput(body) {
        await this.bodyInput.sendKeys(body);
    }

    async getBodyInput() {
        return this.bodyInput.getAttribute('value');
    }

    getTypeInput() {
        return this.typeInput;
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

export class OpinionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-opinion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-opinion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
