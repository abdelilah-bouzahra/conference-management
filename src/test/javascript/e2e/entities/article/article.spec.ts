/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ArticleComponentsPage, ArticleDeleteDialog, ArticleUpdatePage } from './article.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Article e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let articleUpdatePage: ArticleUpdatePage;
    let articleComponentsPage: ArticleComponentsPage;
    let articleDeleteDialog: ArticleDeleteDialog;
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

    it('should load Articles', async () => {
        await navBarPage.goToEntity('article');
        articleComponentsPage = new ArticleComponentsPage();
        await browser.wait(ec.visibilityOf(articleComponentsPage.title), 5000);
        expect(await articleComponentsPage.getTitle()).to.eq('conferenceManagementApp.article.home.title');
    });

    it('should load create Article page', async () => {
        await articleComponentsPage.clickOnCreateButton();
        articleUpdatePage = new ArticleUpdatePage();
        expect(await articleUpdatePage.getPageTitle()).to.eq('conferenceManagementApp.article.home.createOrEditLabel');
        await articleUpdatePage.cancel();
    });

    it('should create and save Articles', async () => {
        const nbButtonsBeforeCreate = await articleComponentsPage.countDeleteButtons();

        await articleComponentsPage.clickOnCreateButton();
        await promise.all([
            articleUpdatePage.setTitleInput('title'),
            articleUpdatePage.setSummaryInput('summary'),
            articleUpdatePage.setFileInput(absolutePath),
            // articleUpdatePage.userSelectLastOption(),
            // articleUpdatePage.domainSelectLastOption(),
            articleUpdatePage.conferenceSelectLastOption()
        ]);
        expect(await articleUpdatePage.getTitleInput()).to.eq('title');
        expect(await articleUpdatePage.getSummaryInput()).to.eq('summary');
        expect(await articleUpdatePage.getFileInput()).to.endsWith(fileNameToUpload);
        const selectedAccepted = articleUpdatePage.getAcceptedInput();
        if (await selectedAccepted.isSelected()) {
            await articleUpdatePage.getAcceptedInput().click();
            expect(await articleUpdatePage.getAcceptedInput().isSelected()).to.be.false;
        } else {
            await articleUpdatePage.getAcceptedInput().click();
            expect(await articleUpdatePage.getAcceptedInput().isSelected()).to.be.true;
        }
        await articleUpdatePage.save();
        expect(await articleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await articleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Article', async () => {
        const nbButtonsBeforeDelete = await articleComponentsPage.countDeleteButtons();
        await articleComponentsPage.clickOnLastDeleteButton();

        articleDeleteDialog = new ArticleDeleteDialog();
        expect(await articleDeleteDialog.getDialogTitle()).to.eq('conferenceManagementApp.article.delete.question');
        await articleDeleteDialog.clickOnConfirmButton();

        expect(await articleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
