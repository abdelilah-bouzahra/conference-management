import { element, by, ElementFinder } from 'protractor';

export class HotelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-hotel div table .btn-danger'));
    title = element.all(by.css('jhi-hotel div h2#page-heading span')).first();

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

export class HotelUpdatePage {
    pageTitle = element(by.id('jhi-hotel-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    addressInput = element(by.id('field_address'));
    numberFloorsInput = element(by.id('field_numberFloors'));
    numberRoomsInput = element(by.id('field_numberRooms'));
    citySelect = element(by.id('field_city'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setAddressInput(address) {
        await this.addressInput.sendKeys(address);
    }

    async getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    async setNumberFloorsInput(numberFloors) {
        await this.numberFloorsInput.sendKeys(numberFloors);
    }

    async getNumberFloorsInput() {
        return this.numberFloorsInput.getAttribute('value');
    }

    async setNumberRoomsInput(numberRooms) {
        await this.numberRoomsInput.sendKeys(numberRooms);
    }

    async getNumberRoomsInput() {
        return this.numberRoomsInput.getAttribute('value');
    }

    async citySelectLastOption() {
        await this.citySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async citySelectOption(option) {
        await this.citySelect.sendKeys(option);
    }

    getCitySelect(): ElementFinder {
        return this.citySelect;
    }

    async getCitySelectedOption() {
        return this.citySelect.element(by.css('option:checked')).getText();
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

export class HotelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-hotel-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-hotel'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
