import { element, by, ElementFinder } from 'protractor';

export class ParticipationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-participation div table .btn-danger'));
    title = element.all(by.css('jhi-participation div h2#page-heading span')).first();

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

export class ParticipationUpdatePage {
    pageTitle = element(by.id('jhi-participation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    acceptedInput = element(by.id('field_accepted'));
    userSelect = element(by.id('field_user'));
    roleSelect = element(by.id('field_role'));
    conferenceSelect = element(by.id('field_conference'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getAcceptedInput() {
        return this.acceptedInput;
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

    async roleSelectLastOption() {
        await this.roleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async roleSelectOption(option) {
        await this.roleSelect.sendKeys(option);
    }

    getRoleSelect(): ElementFinder {
        return this.roleSelect;
    }

    async getRoleSelectedOption() {
        return this.roleSelect.element(by.css('option:checked')).getText();
    }

    async conferenceSelectLastOption() {
        await this.conferenceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async conferenceSelectOption(option) {
        await this.conferenceSelect.sendKeys(option);
    }

    getConferenceSelect(): ElementFinder {
        return this.conferenceSelect;
    }

    async getConferenceSelectedOption() {
        return this.conferenceSelect.element(by.css('option:checked')).getText();
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

export class ParticipationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-participation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-participation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
