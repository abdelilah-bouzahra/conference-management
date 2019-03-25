/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NoteComponentsPage, NoteDeleteDialog, NoteUpdatePage } from './note.page-object';

const expect = chai.expect;

describe('Note e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let noteUpdatePage: NoteUpdatePage;
    let noteComponentsPage: NoteComponentsPage;
    let noteDeleteDialog: NoteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Notes', async () => {
        await navBarPage.goToEntity('note');
        noteComponentsPage = new NoteComponentsPage();
        await browser.wait(ec.visibilityOf(noteComponentsPage.title), 5000);
        expect(await noteComponentsPage.getTitle()).to.eq('conferenceManagementApp.note.home.title');
    });

    it('should load create Note page', async () => {
        await noteComponentsPage.clickOnCreateButton();
        noteUpdatePage = new NoteUpdatePage();
        expect(await noteUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.note.home.createOrEditLabel');
        await noteUpdatePage.cancel();
    });

    it('should create and save Notes', async () => {
        const nbButtonsBeforeCreate = await noteComponentsPage.countDeleteButtons();

        await noteComponentsPage.clickOnCreateButton();
        await promise.all([
            noteUpdatePage.setNoteInput('5'),
            noteUpdatePage.userSelectLastOption(),
            noteUpdatePage.articleSelectLastOption()
        ]);
        expect(await noteUpdatePage.getNoteInput()).to.eq('5');
        await noteUpdatePage.save();
        expect(await noteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await noteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Note', async () => {
        const nbButtonsBeforeDelete = await noteComponentsPage.countDeleteButtons();
        await noteComponentsPage.clickOnLastDeleteButton();

        noteDeleteDialog = new NoteDeleteDialog();
        expect(await noteDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.note.delete.question');
        await noteDeleteDialog.clickOnConfirmButton();

        expect(await noteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
