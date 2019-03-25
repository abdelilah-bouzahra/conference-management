/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DomainComponentsPage, DomainDeleteDialog, DomainUpdatePage } from './domain.page-object';

const expect = chai.expect;

describe('Domain e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let domainUpdatePage: DomainUpdatePage;
    let domainComponentsPage: DomainComponentsPage;
    let domainDeleteDialog: DomainDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Domains', async () => {
        await navBarPage.goToEntity('domain');
        domainComponentsPage = new DomainComponentsPage();
        await browser.wait(ec.visibilityOf(domainComponentsPage.title), 5000);
        expect(await domainComponentsPage.getTitle()).to.eq('conferenceManagementApp.domain.home.title');
    });

    it('should load create Domain page', async () => {
        await domainComponentsPage.clickOnCreateButton();
        domainUpdatePage = new DomainUpdatePage();
        expect(await domainUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.domain.home.createOrEditLabel');
        await domainUpdatePage.cancel();
    });

    it('should create and save Domains', async () => {
        const nbButtonsBeforeCreate = await domainComponentsPage.countDeleteButtons();

        await domainComponentsPage.clickOnCreateButton();
        await promise.all([
            domainUpdatePage.setNameInput('name')
            // domainUpdatePage.userSelectLastOption(),
        ]);
        expect(await domainUpdatePage.getNameInput()).to.eq('name');
        await domainUpdatePage.save();
        expect(await domainUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await domainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Domain', async () => {
        const nbButtonsBeforeDelete = await domainComponentsPage.countDeleteButtons();
        await domainComponentsPage.clickOnLastDeleteButton();

        domainDeleteDialog = new DomainDeleteDialog();
        expect(await domainDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.domain.delete.question');
        await domainDeleteDialog.clickOnConfirmButton();

        expect(await domainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
