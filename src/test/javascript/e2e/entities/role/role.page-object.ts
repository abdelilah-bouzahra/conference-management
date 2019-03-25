import { element, by, ElementFinder } from 'protractor';

export class RoleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-role div table .btn-danger'));
    title = element.all(by.css('jhi-role div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleUpdatePage {
    pageTitle = element(by.id('jhi-role-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    roleNameSelect = element(by.id('field_roleName'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setRoleNameSelect(roleName) {
        await this.roleNameSelect.sendKeys(roleName);
    }

    async getRoleNameSelect() {
        return this.roleNameSelect.element(by.css('option:checked')).getText();
    }

    async roleNameSelectLastOption() {
        await this.roleNameSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class RoleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-role-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-role'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
