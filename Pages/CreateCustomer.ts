import testData from '../testData';
import { Locator, Page, BrowserContext } from '@playwright/test';

class CreateCustomer {
    private page: Page;
    private fieldValue: string | undefined;

    private customerIcon: Locator;
    private addCustomer: Locator;
    private customerNameInput: Locator;
    private street1Input: Locator;
    private street2Input: Locator;
    private zipCodeInput: Locator;
    private country: Locator;
    private state: Locator;
    private city: Locator;
    private saveBtn: Locator;
    private selectedCountry: Locator;
    private selectedState: Locator;
    private selectedCity: Locator;
    private customerText: Locator;
    private searchBox: Locator;
    private searchedUser: Locator;
    private searchedDataUser: Locator;
    private threeDotsMenu: Locator;
    private archive: Locator;
    private active: Locator;
    private restore: Locator;
    private delete: Locator;
    private confirmDelete: Locator;

    constructor(page: Page) {
        this.page = page;
        const { customerCity, customerCountry, customerState, data } = testData.customerData;

        this.customerIcon = page.locator('//p[contains(text(),"Customers")]/parent::div[@role="button"]');
        this.addCustomer = page.locator("//*[contains(text(),'Add Customer')]");
        this.customerNameInput = page.locator("//input[@name='name']");
        this.street1Input = page.locator("//input[@name='streetAddress1']");
        this.street2Input = page.locator("//input[@name='streetAddress2']");
        this.zipCodeInput = page.locator("//input[@name='zipCode']");
        this.country = page.locator("//div[@id='mui-component-select-country']");
        this.state = page.locator("//div[@id='mui-component-select-state']");
        this.city = page.locator("//*[contains(text(),'City')]");
        this.saveBtn = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-k2bprm']");
        this.selectedCountry = page.locator('//li[@data-value="${customerCountry}"]');
        this.selectedState = page.locator('//li[@data-value="${customerState}"]');
        this.selectedCity = page.locator('//li[@data-value="${customerCity}"]');
        this.customerText = page.locator("//*[contains(text(),'Add Customer')]");
        this.searchBox = page.locator(`//h4[@aria-label="${this.fieldValue}"]`);;
        this.searchedUser = page.locator("//h4[@aria-label='${this.fieldValue}']");
        this.searchedDataUser = page.locator(`//h4[@aria-label="${data}"]`);
        this.threeDotsMenu = page.locator('//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"]');
        this.archive = page.locator("//*[contains(text(),'Archive')]");
        this.active = page.locator("//*[contains(text(),'Active')]");
        this.restore = page.locator("//*[contains(text(),'Restore')]");
        this.delete = page.locator("//*[contains(text(),'Delete')]");
        this.confirmDelete = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth css-1o05m8h']");
    }

    async enterCustomerDetails(customerName: string, customerStreet1: string, customerStreet2: string, customerZipCode: string) {
        await this.customerNameInput.fill(customerName);
        await this.street1Input.fill(customerStreet1);
        await this.street2Input.fill(customerStreet2);
        await this.zipCodeInput.fill(customerZipCode);
    }

    async getCustomerName() {
        const value = await this.customerNameInput.getAttribute('value');
        if (value !== null) {
            this.fieldValue = value;
            console.log("value is ---------- " + this.fieldValue);
        } else {
            console.log("value is null");
            this.fieldValue = undefined;
        }
        return this.fieldValue;
    }

    async verificationGranted() {
        if (await this.customerText.isVisible()) {
            console.log("User successfully navigate to customer tab");
        } else {
            console.log("User failed to navigate");
        }
    }

    async userCreated() {
        if (await this.searchBox.isVisible()) {
            console.log("User successfully created and navigate back to the customer tab");
        } else {
            console.log("Unable to create customer");
        }
    }

    async clickCustomerIcon() {
        if (await this.customerIcon.isVisible()) {
            console.log("User clicked on the customer icon");
        } else {
            console.log("Customer icon is not found");
        }
    }

    async clickAddCustomer() {
        if (await this.addCustomer.isVisible()) {
            console.log("Add customer button is visible......!");
            await this.addCustomer.click();
            console.log("Add customer button clicked......!");
        } else {
            console.log("Add customer button not found......!");
        }
    }

    async selectCity() {
        if (await this.city.isVisible()) {
            console.log("City field is visible......!");
            await this.city.click();
            await this.selectedCity.click();
            console.log("City field data filled successfully......!");
        } else {
            console.log("City field not found......!");
        }
    }

    async selectCountry() {
        if (await this.country.isVisible()) {
            console.log("Country field is visible......!");
            await this.country.click();
            await this.selectedCountry.click();
            console.log("Country field data filled successfully......!");
        } else {
            console.log("Country field not found......!");
        }
    }

    async selectState() {
        if (await this.state.isVisible()) {
            console.log("State field is visible......!");
            await this.state.click();
            await this.selectedState.click();
            console.log("State field data filled successfully......!");
        } else {
            console.log("State field not found......!");
        }
    }

    async clickOnSaveBtn() {
        if (await this.saveBtn.isVisible()) {
            console.log("Save button is visible and clickable......!");
            await this.saveBtn.click();
            console.log("Save button clicked......!");
        } else {
            console.log("Save button not found......!");
        }
    }

    async customerNavigation() {
        await this.page.goto("https://staging-app.linusanalytics.com/admin/customers/");
        // await this.page.waitForTimeout(10000);
        await this.page.waitForLoadState('networkidle');



    }

    async searchCustomer(data: string) {
        console.log("Field Value is ---------- " + this.fieldValue);
        console.log("Data Value is ---------- " + data);

        if (data == undefined && this.fieldValue != undefined) {
            console.log("Field Value is ---------- " + this.fieldValue);

            if (await this.searchBox.isVisible()) {
                console.log("Search box is found and editable......!");
                await this.searchBox.click();
                await this.searchBox.fill(this.fieldValue);
                console.log("Field Value is entered in the searchbox......!");
            } else {
                console.log("Search box is not found......!");
            }
        } else {
            console.log("Data Value is ---------- " + data);

            if (await this.searchBox.isVisible()) {
                console.log("Search box is found and editable......!");
                await this.searchBox.click();
                await this.searchBox.fill(data);
                console.log("Data is entered in the searchbox......!");
            } else {
                console.log("Search box is not found......!");
            }
        }
    }

    async goToSearchedUser(data: string) {
        console.log("Field Value is ---------- " + this.fieldValue);
        console.log("Data Value is ---------- " + data);

        if (this.fieldValue != undefined) {
            let val = await this.searchedUser.getAttribute('aria-label');
            console.log("Val is ---------- " + val);
            console.log("Field Value is ---------- " + this.fieldValue);

            if (this.fieldValue == val) {
                await this.searchedUser.isVisible();
                console.log("User available......!");
                await this.searchedUser.click();
                console.log("User clicked......!");
            } else {
                console.log("User not found");
            }
        } else {
            let val = await this.searchedDataUser.getAttribute('aria-label');
            console.log("Val is ---------- " + val);
            console.log("Data Value is ---------- " + data);

            if (data == val) {
                await this.searchedDataUser.isVisible();
                console.log("User available......!");
                await this.searchedDataUser.click();
                console.log("User clicked......!");
            } else {
                console.log("User not found");
            }
        }
    }

    async archiveUser() {
        if (await this.threeDotsMenu.isVisible()) {
            console.log("Three dots menu icon found");
            await this.threeDotsMenu.click();
            console.log("Three dots menu icon clicked");

            if (await this.archive.isVisible({ timeout: 3000 })) {
                console.log("Archive button is visible");
                await this.archive.click();
                console.log("Archive button item is clicked");
                await this.archive.isVisible();// Status Check is change Active to Archive or not.
                console.log("User status changed to archive user");
            } else {
                console.log("Archive button not found in three dots menu");
            }
        } else {
            console.log("Three dots menu icon not found");
        }
    }

    async activeUser() {
        if (await this.threeDotsMenu.isVisible()) {
            console.log("Three dots menu icon found");
            await this.threeDotsMenu.click();
            console.log("Three dots menu icon clicked");

            if (await this.restore.isVisible({ timeout: 3000 })) {
                console.log("Restore button is visible");
                await this.restore.click();
                console.log("Restore button is clicked");
                await this.active.isVisible({ timeout: 3000 });
                console.log("User status changed to active user");
            } else {
                console.log("Restore button not found in three dots menu");
            }
        } else {
            console.log("Three dots menu icon not found");
        }
    }

    async deleteUser() {
        if (await this.threeDotsMenu.isVisible({ timeout: 5000 })) {
            console.log("Three dots menu icon found");
            await this.threeDotsMenu.click();
            console.log("Three dots menu icon clicked");

            if (await this.archive.isVisible({ timeout: 5000 })) {
                console.log("Archive button item is visible");
                await this.archive.click();
                console.log("Archive button item is clicked");
                await this.archive.isVisible();// Status Check is change Active to Archive or not.
                console.log("User status changed to archive user");

                if (await this.threeDotsMenu.isVisible({ timeout: 5000 })) {
                    console.log("Three dots menu icon found");
                    await this.threeDotsMenu.click();
                    console.log("Three dots menu icon clicked");

                    if (await this.delete.isVisible({ timeout: 5000 })) {
                        console.log("Delete button is visible");
                        await this.delete.click();
                        console.log("Delete button is clicked");

                        if (await this.confirmDelete.isVisible({ timeout: 5000 })) {
                            console.log("Confirm delete button is visible");
                            await this.confirmDelete.click();
                            console.log("Confirm delete button is clicked");

                            if (await this.searchBox.isVisible({ timeout: 5000 })) {
                                console.log("User successfully deleted and navigate back to the customer tab");
                            } else {
                                console.log("User failed to navigate");
                            }
                        } else {
                            console.log("Confirm delete button not found");
                        }
                    } else {
                        console.log("Delete button not found");
                    }
                } else {
                    console.log("Three dots menu icon not found");
                }
            } else {
                console.log("Archive button not found in three dots menu");
            }
        } else {
            console.log("Three dots menu icon not found");
        }
    }
}

export default CreateCustomer;
