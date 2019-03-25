import { element, by, ElementFinder } from 'protractor';

export class BookingComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-booking div table .btn-danger'));
    title = element.all(by.css('jhi-booking div h2#page-heading span')).first();

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

export class BookingUpdatePage {
    pageTitle = element(by.id('jhi-booking-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bookingDateInput = element(by.id('field_bookingDate'));
    arrivedDateInput = element(by.id('field_arrivedDate'));
    departureDateInput = element(by.id('field_departureDate'));
    numberPersonInput = element(by.id('field_numberPerson'));
    roomSelect = element(by.id('field_room'));
    userSelect = element(by.id('field_user'));
    invoiceSelect = element(by.id('field_invoice'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBookingDateInput(bookingDate) {
        await this.bookingDateInput.sendKeys(bookingDate);
    }

    async getBookingDateInput() {
        return this.bookingDateInput.getAttribute('value');
    }

    async setArrivedDateInput(arrivedDate) {
        await this.arrivedDateInput.sendKeys(arrivedDate);
    }

    async getArrivedDateInput() {
        return this.arrivedDateInput.getAttribute('value');
    }

    async setDepartureDateInput(departureDate) {
        await this.departureDateInput.sendKeys(departureDate);
    }

    async getDepartureDateInput() {
        return this.departureDateInput.getAttribute('value');
    }

    async setNumberPersonInput(numberPerson) {
        await this.numberPersonInput.sendKeys(numberPerson);
    }

    async getNumberPersonInput() {
        return this.numberPersonInput.getAttribute('value');
    }

    async roomSelectLastOption() {
        await this.roomSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async roomSelectOption(option) {
        await this.roomSelect.sendKeys(option);
    }

    getRoomSelect(): ElementFinder {
        return this.roomSelect;
    }

    async getRoomSelectedOption() {
        return this.roomSelect.element(by.css('option:checked')).getText();
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

    async invoiceSelectLastOption() {
        await this.invoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async invoiceSelectOption(option) {
        await this.invoiceSelect.sendKeys(option);
    }

    getInvoiceSelect(): ElementFinder {
        return this.invoiceSelect;
    }

    async getInvoiceSelectedOption() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
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

export class BookingDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-booking-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-booking'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
