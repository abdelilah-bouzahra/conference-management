/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConferenceComponentsPage, ConferenceDeleteDialog, ConferenceUpdatePage } from './conference.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Conference e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let conferenceUpdatePage: ConferenceUpdatePage;
    let conferenceComponentsPage: ConferenceComponentsPage;
    let conferenceDeleteDialog: ConferenceDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Conferences', async () => {
        await navBarPage.goToEntity('conference');
        conferenceComponentsPage = new ConferenceComponentsPage();
        await browser.wait(ec.visibilityOf(conferenceComponentsPage.title), 5000);
        expect(await conferenceComponentsPage.getTitle()).to.eq('conferenceManagementApp.conference.home.title');
    });

    it('should load create Conference page', async () => {
        await conferenceComponentsPage.clickOnCreateButton();
        conferenceUpdatePage = new ConferenceUpdatePage();
        expect(await conferenceUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.conference.home.createOrEditLabel');
        await conferenceUpdatePage.cancel();
    });

    it('should create and save Conferences', async () => {
        const nbButtonsBeforeCreate = await conferenceComponentsPage.countDeleteButtons();

        await conferenceComponentsPage.clickOnCreateButton();
        await promise.all([
            conferenceUpdatePage.setTitleInput('title'),
            conferenceUpdatePage.setDescriptionInput('description'),
            conferenceUpdatePage.setPhotoInput(absolutePath),
            conferenceUpdatePage.setAddressInput('address'),
            conferenceUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            conferenceUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            conferenceUpdatePage.userSelectLastOption()
        ]);
        expect(await conferenceUpdatePage.getTitleInput()).to.eq('title');
        expect(await conferenceUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await conferenceUpdatePage.getPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await conferenceUpdatePage.getAddressInput()).to.eq('address');
        expect(await conferenceUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
        expect(await conferenceUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
        const selectedAccepted = conferenceUpdatePage.getAcceptedInput();
        if (await selectedAccepted.isSelected()) {
            await conferenceUpdatePage.getAcceptedInput().click();
            expect(await conferenceUpdatePage.getAcceptedInput().isSelected()).to.be.false;
        } else {
            await conferenceUpdatePage.getAcceptedInput().click();
            expect(await conferenceUpdatePage.getAcceptedInput().isSelected()).to.be.true;
        }
        await conferenceUpdatePage.save();
        expect(await conferenceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await conferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Conference', async () => {
        const nbButtonsBeforeDelete = await conferenceComponentsPage.countDeleteButtons();
        await conferenceComponentsPage.clickOnLastDeleteButton();

        conferenceDeleteDialog = new ConferenceDeleteDialog();
        expect(await conferenceDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.conference.delete.question');
        await conferenceDeleteDialog.clickOnConfirmButton();

        expect(await conferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
