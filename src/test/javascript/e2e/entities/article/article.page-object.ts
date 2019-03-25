import { element, by, ElementFinder } from 'protractor';

export class ArticleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-article div table .btn-danger'));
    title = element.all(by.css('jhi-article div h2#page-heading span')).first();

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

export class ArticleUpdatePage {
    pageTitle = element(by.id('jhi-article-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    summaryInput = element(by.id('field_summary'));
    fileInput = element(by.id('file_file'));
    acceptedInput = element(by.id('field_accepted'));
    userSelect = element(by.id('field_user'));
    domainSelect = element(by.id('field_domain'));
    conferenceSelect = element(by.id('field_conference'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setSummaryInput(summary) {
        await this.summaryInput.sendKeys(summary);
    }

    async getSummaryInput() {
        return this.summaryInput.getAttribute('value');
    }

    async setFileInput(file) {
        await this.fileInput.sendKeys(file);
    }

    async getFileInput() {
        return this.fileInput.getAttribute('value');
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

    async domainSelectLastOption() {
        await this.domainSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async domainSelectOption(option) {
        await this.domainSelect.sendKeys(option);
    }

    getDomainSelect(): ElementFinder {
        return this.domainSelect;
    }

    async getDomainSelectedOption() {
        return this.domainSelect.element(by.css('option:checked')).getText();
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

export class ArticleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-article-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-article'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
