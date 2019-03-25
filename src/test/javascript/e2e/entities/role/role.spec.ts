/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RoleComponentsPage, RoleDeleteDialog, RoleUpdatePage } from './role.page-object';

const expect = chai.expect;

describe('Role e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let roleUpdatePage: RoleUpdatePage;
    let roleComponentsPage: RoleComponentsPage;
    let roleDeleteDialog: RoleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Roles', async () => {
        await navBarPage.goToEntity('role');
        roleComponentsPage = new RoleComponentsPage();
        await browser.wait(ec.visibilityOf(roleComponentsPage.title), 5000);
        expect(await roleComponentsPage.getTitle()).to.eq('conferenceManagementApp.role.home.title');
    });

    it('should load create Role page', async () => {
        await roleComponentsPage.clickOnCreateButton();
        roleUpdatePage = new RoleUpdatePage();
        expect(await roleUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.role.home.createOrEditLabel');
        await roleUpdatePage.cancel();
    });

    it('should create and save Roles', async () => {
        const nbButtonsBeforeCreate = await roleComponentsPage.countDeleteButtons();

        await roleComponentsPage.clickOnCreateButton();
        await promise.all([roleUpdatePage.roleNameSelectLastOption()]);
        await roleUpdatePage.save();
        expect(await roleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await roleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Role', async () => {
        const nbButtonsBeforeDelete = await roleComponentsPage.countDeleteButtons();
        await roleComponentsPage.clickOnLastDeleteButton();

        roleDeleteDialog = new RoleDeleteDialog();
        expect(await roleDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.role.delete.question');
        await roleDeleteDialog.clickOnConfirmButton();

        expect(await roleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
