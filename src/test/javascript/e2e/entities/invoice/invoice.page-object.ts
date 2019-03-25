import { element, by, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-invoice div table .btn-danger'));
    title = element.all(by.css('jhi-invoice div h2#page-heading span')).first();

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

export class InvoiceUpdatePage {
    pageTitle = element(by.id('jhi-invoice-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInvoiceInput = element(by.id('field_dateInvoice'));
    sumInput = element(by.id('field_sum'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateInvoiceInput(dateInvoice) {
        await this.dateInvoiceInput.sendKeys(dateInvoice);
    }

    async getDateInvoiceInput() {
        return this.dateInvoiceInput.getAttribute('value');
    }

    async setSumInput(sum) {
        await this.sumInput.sendKeys(sum);
    }

    async getSumInput() {
        return this.sumInput.getAttribute('value');
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

export class InvoiceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-invoice-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-invoice'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
