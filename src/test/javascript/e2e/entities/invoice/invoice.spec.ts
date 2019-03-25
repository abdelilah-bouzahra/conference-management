/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InvoiceComponentsPage, InvoiceDeleteDialog, InvoiceUpdatePage } from './invoice.page-object';

const expect = chai.expect;

describe('Invoice e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let invoiceUpdatePage: InvoiceUpdatePage;
    let invoiceComponentsPage: InvoiceComponentsPage;
    let invoiceDeleteDialog: InvoiceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Invoices', async () => {
        await navBarPage.goToEntity('invoice');
        invoiceComponentsPage = new InvoiceComponentsPage();
        await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 5000);
        expect(await invoiceComponentsPage.getTitle()).to.eq('conferenceManagementApp.invoice.home.title');
    });

    it('should load create Invoice page', async () => {
        await invoiceComponentsPage.clickOnCreateButton();
        invoiceUpdatePage = new InvoiceUpdatePage();
        expect(await invoiceUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.invoice.home.createOrEditLabel');
        await invoiceUpdatePage.cancel();
    });

    it('should create and save Invoices', async () => {
        const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

        await invoiceComponentsPage.clickOnCreateButton();
        await promise.all([
            invoiceUpdatePage.setDateInvoiceInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            invoiceUpdatePage.setSumInput('5')
        ]);
        expect(await invoiceUpdatePage.getDateInvoiceInput()).to.contain('2001-01-01T02:30');
        expect(await invoiceUpdatePage.getSumInput()).to.eq('5');
        await invoiceUpdatePage.save();
        expect(await invoiceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Invoice', async () => {
        const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
        await invoiceComponentsPage.clickOnLastDeleteButton();

        invoiceDeleteDialog = new InvoiceDeleteDialog();
        expect(await invoiceDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.invoice.delete.question');
        await invoiceDeleteDialog.clickOnConfirmButton();

        expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
