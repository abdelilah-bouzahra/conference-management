/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HotelComponentsPage, HotelDeleteDialog, HotelUpdatePage } from './hotel.page-object';

const expect = chai.expect;

describe('Hotel e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let hotelUpdatePage: HotelUpdatePage;
    let hotelComponentsPage: HotelComponentsPage;
    let hotelDeleteDialog: HotelDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Hotels', async () => {
        await navBarPage.goToEntity('hotel');
        hotelComponentsPage = new HotelComponentsPage();
        await browser.wait(ec.visibilityOf(hotelComponentsPage.title), 5000);
        expect(await hotelComponentsPage.getTitle()).to.eq('conferenceManagementApp.hotel.home.title');
    });

    it('should load create Hotel page', async () => {
        await hotelComponentsPage.clickOnCreateButton();
        hotelUpdatePage = new HotelUpdatePage();
        expect(await hotelUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.hotel.home.createOrEditLabel');
        await hotelUpdatePage.cancel();
    });

    it('should create and save Hotels', async () => {
        const nbButtonsBeforeCreate = await hotelComponentsPage.countDeleteButtons();

        await hotelComponentsPage.clickOnCreateButton();
        await promise.all([
            hotelUpdatePage.setNameInput('name'),
            hotelUpdatePage.setAddressInput('address'),
            hotelUpdatePage.setNumberFloorsInput('5'),
            hotelUpdatePage.setNumberRoomsInput('5'),
            hotelUpdatePage.citySelectLastOption()
        ]);
        expect(await hotelUpdatePage.getNameInput()).to.eq('name');
        expect(await hotelUpdatePage.getAddressInput()).to.eq('address');
        expect(await hotelUpdatePage.getNumberFloorsInput()).to.eq('5');
        expect(await hotelUpdatePage.getNumberRoomsInput()).to.eq('5');
        await hotelUpdatePage.save();
        expect(await hotelUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await hotelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Hotel', async () => {
        const nbButtonsBeforeDelete = await hotelComponentsPage.countDeleteButtons();
        await hotelComponentsPage.clickOnLastDeleteButton();

        hotelDeleteDialog = new HotelDeleteDialog();
        expect(await hotelDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.hotel.delete.question');
        await hotelDeleteDialog.clickOnConfirmButton();

        expect(await hotelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
