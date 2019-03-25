/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OpinionComponentsPage, OpinionDeleteDialog, OpinionUpdatePage } from './opinion.page-object';

const expect = chai.expect;

describe('Opinion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let opinionUpdatePage: OpinionUpdatePage;
    let opinionComponentsPage: OpinionComponentsPage;
    let opinionDeleteDialog: OpinionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Opinions', async () => {
        await navBarPage.goToEntity('opinion');
        opinionComponentsPage = new OpinionComponentsPage();
        await browser.wait(ec.visibilityOf(opinionComponentsPage.title), 5000);
        expect(await opinionComponentsPage.getTitle()).to.eq('conferenceManagementApp.opinion.home.title');
    });

    it('should load create Opinion page', async () => {
        await opinionComponentsPage.clickOnCreateButton();
        opinionUpdatePage = new OpinionUpdatePage();
        expect(await opinionUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.opinion.home.createOrEditLabel');
        await opinionUpdatePage.cancel();
    });

    it('should create and save Opinions', async () => {
        const nbButtonsBeforeCreate = await opinionComponentsPage.countDeleteButtons();

        await opinionComponentsPage.clickOnCreateButton();
        await promise.all([
            opinionUpdatePage.setBodyInput('body'),
            opinionUpdatePage.userSelectLastOption(),
            opinionUpdatePage.articleSelectLastOption()
        ]);
        expect(await opinionUpdatePage.getBodyInput()).to.eq('body');
        const selectedType = opinionUpdatePage.getTypeInput();
        if (await selectedType.isSelected()) {
            await opinionUpdatePage.getTypeInput().click();
            expect(await opinionUpdatePage.getTypeInput().isSelected()).to.be.false;
        } else {
            await opinionUpdatePage.getTypeInput().click();
            expect(await opinionUpdatePage.getTypeInput().isSelected()).to.be.true;
        }
        await opinionUpdatePage.save();
        expect(await opinionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await opinionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Opinion', async () => {
        const nbButtonsBeforeDelete = await opinionComponentsPage.countDeleteButtons();
        await opinionComponentsPage.clickOnLastDeleteButton();

        opinionDeleteDialog = new OpinionDeleteDialog();
        expect(await opinionDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.opinion.delete.question');
        await opinionDeleteDialog.clickOnConfirmButton();

        expect(await opinionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
