import { element, by, ElementFinder } from 'protractor';

export class ConferenceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-conference div table .btn-danger'));
    title = element.all(by.css('jhi-conference div h2#page-heading span')).first();

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

export class ConferenceUpdatePage {
    pageTitle = element(by.id('jhi-conference-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    photoInput = element(by.id('file_photo'));
    addressInput = element(by.id('field_address'));
    startDateInput = element(by.id('field_startDate'));
    endDateInput = element(by.id('field_endDate'));
    acceptedInput = element(by.id('field_accepted'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPhotoInput(photo) {
        await this.photoInput.sendKeys(photo);
    }

    async getPhotoInput() {
        return this.photoInput.getAttribute('value');
    }

    async setAddressInput(address) {
        await this.addressInput.sendKeys(address);
    }

    async getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
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

export class ConferenceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-conference-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-conference'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
