import { element, by, ElementFinder } from 'protractor';

export class RoomComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-room div table .btn-danger'));
    title = element.all(by.css('jhi-room div h2#page-heading span')).first();

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

export class RoomUpdatePage {
    pageTitle = element(by.id('jhi-room-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numberRoomInput = element(by.id('field_numberRoom'));
    numberFloorInput = element(by.id('field_numberFloor'));
    roomTypeSelect = element(by.id('field_roomType'));
    roomStateSelect = element(by.id('field_roomState'));
    hotelSelect = element(by.id('field_hotel'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumberRoomInput(numberRoom) {
        await this.numberRoomInput.sendKeys(numberRoom);
    }

    async getNumberRoomInput() {
        return this.numberRoomInput.getAttribute('value');
    }

    async setNumberFloorInput(numberFloor) {
        await this.numberFloorInput.sendKeys(numberFloor);
    }

    async getNumberFloorInput() {
        return this.numberFloorInput.getAttribute('value');
    }

    async setRoomTypeSelect(roomType) {
        await this.roomTypeSelect.sendKeys(roomType);
    }

    async getRoomTypeSelect() {
        return this.roomTypeSelect.element(by.css('option:checked')).getText();
    }

    async roomTypeSelectLastOption() {
        await this.roomTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setRoomStateSelect(roomState) {
        await this.roomStateSelect.sendKeys(roomState);
    }

    async getRoomStateSelect() {
        return this.roomStateSelect.element(by.css('option:checked')).getText();
    }

    async roomStateSelectLastOption() {
        await this.roomStateSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async hotelSelectLastOption() {
        await this.hotelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async hotelSelectOption(option) {
        await this.hotelSelect.sendKeys(option);
    }

    getHotelSelect(): ElementFinder {
        return this.hotelSelect;
    }

    async getHotelSelectedOption() {
        return this.hotelSelect.element(by.css('option:checked')).getText();
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

export class RoomDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-room-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-room'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
