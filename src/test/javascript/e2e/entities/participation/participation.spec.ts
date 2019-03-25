/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParticipationComponentsPage, ParticipationDeleteDialog, ParticipationUpdatePage } from './participation.page-object';

const expect = chai.expect;

describe('Participation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let participationUpdatePage: ParticipationUpdatePage;
    let participationComponentsPage: ParticipationComponentsPage;
    let participationDeleteDialog: ParticipationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Participations', async () => {
        await navBarPage.goToEntity('participation');
        participationComponentsPage = new ParticipationComponentsPage();
        await browser.wait(ec.visibilityOf(participationComponentsPage.title), 5000);
        expect(await participationComponentsPage.getTitle()).to.eq('conferenceManagementApp.participation.home.title');
    });

    it('should load create Participation page', async () => {
        await participationComponentsPage.clickOnCreateButton();
        participationUpdatePage = new ParticipationUpdatePage();
        expect(await participationUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.participation.home.createOrEditLabel');
        await participationUpdatePage.cancel();
    });

    it('should create and save Participations', async () => {
        const nbButtonsBeforeCreate = await participationComponentsPage.countDeleteButtons();

        await participationComponentsPage.clickOnCreateButton();
        await promise.all([
            participationUpdatePage.userSelectLastOption(),
            participationUpdatePage.roleSelectLastOption(),
            participationUpdatePage.conferenceSelectLastOption()
        ]);
        const selectedAccepted = participationUpdatePage.getAcceptedInput();
        if (await selectedAccepted.isSelected()) {
            await participationUpdatePage.getAcceptedInput().click();
            expect(await participationUpdatePage.getAcceptedInput().isSelected()).to.be.false;
        } else {
            await participationUpdatePage.getAcceptedInput().click();
            expect(await participationUpdatePage.getAcceptedInput().isSelected()).to.be.true;
        }
        await participationUpdatePage.save();
        expect(await participationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await participationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Participation', async () => {
        const nbButtonsBeforeDelete = await participationComponentsPage.countDeleteButtons();
        await participationComponentsPage.clickOnLastDeleteButton();

        participationDeleteDialog = new ParticipationDeleteDialog();
        expect(await participationDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.participation.delete.question');
        await participationDeleteDialog.clickOnConfirmButton();

        expect(await participationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
