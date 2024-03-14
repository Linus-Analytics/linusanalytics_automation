import testData from '../testData';
import { Locator, Page, BrowserContext } from '@playwright/test';


class CreateMachine {
    private page: Page;
    private fieldValue: string | undefined;

    private machineIcon: Locator;
    private addMachine: Locator;
    private machineNameInput: Locator;
    private saveBtn: Locator;
    private machineText: Locator;
    private searchBox: Locator;
    private searchedUser: Locator;
    // private searchedDataUser: Locator;
    private threeDotsMenu: Locator;
    private archive: Locator;
    private active: Locator;
    private restore: Locator;
    private delete: Locator;
    private confirmDelete: Locator;

    constructor(page: Page) {
        this.page = page;
        this.machineIcon = page.locator('//p[contains(text(),"Machines")]/parent::div[@role="button"]');
        this.addMachine = page.locator("//*[contains(text(),'Add Machine')]");
        this.machineNameInput = page.locator("//input[@name='name']");
        this.saveBtn = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-k2bprm']");
        this.machineText = page.locator("//*[contains(text(),'Add Customer')]");
        this.searchBox = page.locator(`//h4[@aria-label="${this.fieldValue}"]`);;
        this.searchedUser = page.locator("//h4[@aria-label='${this.fieldValue}']");
        //  this.searchedDataUser = page.locator(`//h4[@aria-label="${data}"]`);
        this.threeDotsMenu = page.locator('//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"]');
        this.archive = page.locator("//*[contains(text(),'Archive')]");
        this.active = page.locator("//*[contains(text(),'Active')]");
        this.restore = page.locator("//*[contains(text(),'Restore')]");
        this.delete = page.locator("//*[contains(text(),'Delete')]");
        this.confirmDelete = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth css-1o05m8h']");
    }

}
