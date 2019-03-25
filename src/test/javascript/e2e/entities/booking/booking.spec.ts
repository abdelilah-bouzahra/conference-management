/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BookingComponentsPage, BookingDeleteDialog, BookingUpdatePage } from './booking.page-object';

const expect = chai.expect;

describe('Booking e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bookingUpdatePage: BookingUpdatePage;
    let bookingComponentsPage: BookingComponentsPage;
    let bookingDeleteDialog: BookingDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Bookings', async () => {
        await navBarPage.goToEntity('booking');
        bookingComponentsPage = new BookingComponentsPage();
        await browser.wait(ec.visibilityOf(bookingComponentsPage.title), 5000);
        expect(await bookingComponentsPage.getTitle()).to.eq('conferenceManagementApp.booking.home.title');
    });

    it('should load create Booking page', async () => {
        await bookingComponentsPage.clickOnCreateButton();
        bookingUpdatePage = new BookingUpdatePage();
        expect(await bookingUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.booking.home.createOrEditLabel');
        await bookingUpdatePage.cancel();
    });

    it('should create and save Bookings', async () => {
        const nbButtonsBeforeCreate = await bookingComponentsPage.countDeleteButtons();

        await bookingComponentsPage.clickOnCreateButton();
        await promise.all([
            bookingUpdatePage.setBookingDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            bookingUpdatePage.setArrivedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            bookingUpdatePage.setDepartureDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            bookingUpdatePage.setNumberPersonInput('5'),
            bookingUpdatePage.roomSelectLastOption(),
            bookingUpdatePage.userSelectLastOption(),
            bookingUpdatePage.invoiceSelectLastOption()
        ]);
        expect(await bookingUpdatePage.getBookingDateInput()).to.contain('2001-01-01T02:30');
        expect(await bookingUpdatePage.getArrivedDateInput()).to.contain('2001-01-01T02:30');
        expect(await bookingUpdatePage.getDepartureDateInput()).to.contain('2001-01-01T02:30');
        expect(await bookingUpdatePage.getNumberPersonInput()).to.eq('5');
        await bookingUpdatePage.save();
        expect(await bookingUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await bookingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Booking', async () => {
        const nbButtonsBeforeDelete = await bookingComponentsPage.countDeleteButtons();
        await bookingComponentsPage.clickOnLastDeleteButton();

        bookingDeleteDialog = new BookingDeleteDialog();
        expect(await bookingDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.booking.delete.question');
        await bookingDeleteDialog.clickOnConfirmButton();

        expect(await bookingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
