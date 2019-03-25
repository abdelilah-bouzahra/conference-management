/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RoomComponentsPage, RoomDeleteDialog, RoomUpdatePage } from './room.page-object';

const expect = chai.expect;

describe('Room e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let roomUpdatePage: RoomUpdatePage;
    let roomComponentsPage: RoomComponentsPage;
    let roomDeleteDialog: RoomDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Rooms', async () => {
        await navBarPage.goToEntity('room');
        roomComponentsPage = new RoomComponentsPage();
        await browser.wait(ec.visibilityOf(roomComponentsPage.title), 5000);
        expect(await roomComponentsPage.getTitle()).to.eq('conferenceManagementApp.room.home.title');
    });

    it('should load create Room page', async () => {
        await roomComponentsPage.clickOnCreateButton();
        roomUpdatePage = new RoomUpdatePage();
        expect(await roomUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.room.home.createOrEditLabel');
        await roomUpdatePage.cancel();
    });

    it('should create and save Rooms', async () => {
        const nbButtonsBeforeCreate = await roomComponentsPage.countDeleteButtons();

        await roomComponentsPage.clickOnCreateButton();
        await promise.all([
            roomUpdatePage.setNumberRoomInput('5'),
            roomUpdatePage.setNumberFloorInput('5'),
            roomUpdatePage.roomTypeSelectLastOption(),
            roomUpdatePage.roomStateSelectLastOption(),
            roomUpdatePage.hotelSelectLastOption()
        ]);
        expect(await roomUpdatePage.getNumberRoomInput()).to.eq('5');
        expect(await roomUpdatePage.getNumberFloorInput()).to.eq('5');
        await roomUpdatePage.save();
        expect(await roomUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await roomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Room', async () => {
        const nbButtonsBeforeDelete = await roomComponentsPage.countDeleteButtons();
        await roomComponentsPage.clickOnLastDeleteButton();

        roomDeleteDialog = new RoomDeleteDialog();
        expect(await roomDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.room.delete.question');
        await roomDeleteDialog.clickOnConfirmButton();

        expect(await roomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
