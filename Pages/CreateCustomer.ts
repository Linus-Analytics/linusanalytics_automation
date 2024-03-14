import testData from '../testData';
import { Locator, Page, expect } from '@playwright/test';

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
    private phonenumber: Locator;
    private saveBtn: Locator;
    private selectedCountry: Locator;
    private selectedState: Locator;
    private selectedCity: Locator;
    private customerText: Locator;
    private searchBox: Locator;
    private threeDotsMenu: Locator;
    private archive: Locator;
    private active: Locator;
    private restore: Locator;
    private delete: Locator;
    private confirmDelete: Locator;

    constructor(page: Page) {
        this.page = page;
        const { customerCountry, customerState, customerCity } = testData.customerData;

        this.customerIcon = page.locator('//p[contains(text(),"Customers")]/parent::div[@role="button"]');
        this.addCustomer = page.locator("//*[contains(text(),'Add Customer')]");
        this.customerNameInput = page.locator("//input[@name='name']");
        this.street1Input = page.locator("//input[@name='streetAddress1']");
        this.street2Input = page.locator("//input[@name='streetAddress2']");
        this.zipCodeInput = page.locator("//input[@name='zipCode']");
        this.phonenumber = page.locator("//input[@name='phoneNumber']");
        this.country = page.locator("//html/body/div[2]/div[3]/div/div[1]/div/div[4]/div/div[1]/div/div/div/input");
        this.state = page.locator("//html/body/div[2]/div[3]/div/div[1]/div/div[4]/div/div[2]/div/div/div/input");
        this.city = page.locator("//html/body/div[2]/div[3]/div/div[1]/div/div[4]/div/div[3]/div/div/div/input");
        this.saveBtn = page.locator("//*[contains(text(),'Save')]");
        this.selectedCountry = page.locator(`//li[@data-value="${customerCountry}"]`);
        this.selectedState = page.locator(`//li[@data-value="${customerState}"]`);
        this.selectedCity = page.locator(`//li[@data-value="${customerCity}"]`);
        this.customerText = page.locator("//*[contains(text(),'Add Customer')]");
        this.searchBox = page.locator(`//h4[@aria-label="${this.fieldValue}"]`);;
        this.threeDotsMenu = page.locator('//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"]');
        this.archive = page.locator("//*[contains(text(),'Archive')]");
        this.active = page.locator("//*[contains(text(),'Active')]");
        this.restore = page.locator("//*[contains(text(),'Restore')]");
        this.delete = page.locator("//*[contains(text(),'Delete')]");
        this.confirmDelete = page.locator("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth css-1o05m8h']");
    }


    async customerNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/customers/");
            await this.page.waitForTimeout(10000);
            if (await this.customerText.isVisible()) {
                console.log("User successfully navigated to customer tab");
                return true; // Return true if the customer tab is visible
            } else {
                console.log("User failed to navigate to customer tab");
                return false; // Return false if the customer tab is not visible
            }
        } catch (error) {
            console.error("Error during customer navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddCustomer(): Promise<boolean> {
        try {
            if (await this.addCustomer.isVisible()) {
                this.addCustomer.click();
                await this.page.waitForTimeout(1000);
                console.log("Add customer button clicked......!");
                return true; // Return true if the button is clicked successfully
            } else {
                console.log("Add customer button not found......!");
                return false; // Return false if the button is not found
            }
        } catch (error) {
            console.error("Error while clicking Add customer button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async enterCustomerDetails(customerName: string, customerAddress: string, customerAddress2: string, customerCountry: string, customerState: string, customerCity: string, customerZipCode: string, customerPhoneNumber: string): Promise<boolean> {
        try {
            await this.customerNameInput.fill(customerName);
            await this.street1Input.fill(customerAddress);
            await this.street2Input.fill(customerAddress2);
            await this.country.fill(customerCountry);
            await this.state.fill(customerState);
            await this.city.fill(customerCity);
            await this.zipCodeInput.fill(customerZipCode);
            await this.phonenumber.fill(customerPhoneNumber);
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error entering customer details:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async clickOnSaveBtn(): Promise<boolean> {
        try {
            if (await this.saveBtn.isVisible()) {
                console.log("Save button is visible and clickable......!");
                await this.saveBtn.click();
                console.log("Save button clicked......!");
                return true; // Return true if the save button is visible and clicked
            } else {
                console.log("Save button not found......!");
                return false; // Return false if the save button is not found
            }
        } catch (error) {
            console.error("Error while clicking on Save button:", error);
            return false; // Return false if any error occurs during the process
        }
    }


    async checkCustomer(page: Page, customerNameValue: string): Promise<boolean> {
        try {

            const customerList = await page.$$('//h4');

            if (customerList.length > 0) {
                for (const element of customerList) {
                    const customerListText = await element.textContent();
                    if (customerListText) { // Check if customerListText is not null
                        console.log("Customer Name =========== " + customerListText);

                        if (customerListText.trim().toLowerCase() === customerNameValue.trim().toLowerCase()) {
                            console.log("Customer Created ----------------> " + customerNameValue);
                            return true; // Return true when customer is found
                        }
                    }
                }
                console.log("Customer Not Found In List ----------------> " + customerNameValue);
                return false; // Return false if customer is not found
            } else {
                console.log("Customer Data Not Found ----------------> " + customerNameValue);
                return false; // Return false if customer list is empty
            }
        } catch (error) {
            console.error("Error while checking customer:", error);
            return false; // Return false if any error occurs during the process
        }
    }



    // async getCustomerName() {

    //     const value = await this.customerNameInput.getAttribute('value')
    //     if (value !== null) {
    //         this.fieldValue = value;
    //         console.log("value is ---------- " + this.fieldValue);
    //     } else {
    //         console.log("value is null");
    //         this.fieldValue = undefined;
    //     }
    //     return this.fieldValue;
    // }




    // async userCreated() {
    //     if (await this.searchBox.isVisible(), { timeout: 5000 }) {
    //         console.log("User successfully created and navigate back to the customer tab");
    //     } else {
    //         console.log("Unable to search customer");
    //     }
    // }

    // async clickCustomerIcon() {
    //     if (await this.customerIcon.isVisible()) {
    //         console.log("User clicked on the customer icon");
    //     } else {
    //         console.log("Customer icon is not found");
    //     }
    // }



    // async selectCity() {
    //     if (await this.city.isVisible()) {
    //         console.log("City field is visible......!");
    //         await this.city.click();
    //         await this.selectedCity.click();
    //         console.log("City field data filled successfully......!");
    //     } else {
    //         console.log("City field not found......!");
    //     }
    // }

    // async selectCountry() {
    //     if (await this.country.isVisible()) {
    //         console.log("Country field is visible......!");
    //         await this.country.click();
    //         await this.selectedCountry.click();
    //         console.log("Country field data filled successfully......!");
    //     } else {
    //         console.log("Country field not found......!");
    //     }
    // }

    // async selectState() {
    //     if (await this.state.isVisible()) {
    //         console.log("State field is visible......!");
    //         await this.state.click();
    //         await this.selectedState.click();
    //         console.log("State field data filled successfully......!");
    //     } else {
    //         console.log("State field not found......!");
    //     }
    // }





    // async searchCustomer(data: string) {
    //     console.log("Field Value is ---------- " + this.fieldValue);
    //     console.log("Data Value is ---------- " + data);

    //     if (data == undefined && this.fieldValue != undefined) {
    //         console.log("Field Value is ---------- " + this.fieldValue);

    //         if (await this.searchBox.isVisible()) {
    //             console.log("Search box is found and editable......!");
    //             await this.searchBox.click();
    //             await this.searchBox.fill(this.fieldValue);
    //             console.log("Field Value is entered in the searchbox......!");
    //         } else {
    //             console.log("Search box is not found......!");
    //         }
    //     } else {
    //         console.log("Data Value is ---------- " + data);

    //         if (await this.searchBox.isVisible()) {
    //             console.log("Search box is found and editable......!");
    //             await this.searchBox.click();
    //             await this.searchBox.fill(data);
    //             console.log("Data is entered in the searchbox......!");
    //         } else {
    //             console.log("Search box is not found......!");
    //         }
    //     }
    // }

    // async goToSearchedUser(data: string) {
    //     console.log("Field Value is ---------- " + this.fieldValue);
    //     console.log("Data Value is ---------- " + data);

    //     if (this.fieldValue != undefined) {
    //         let val = await this.searchedUser.getAttribute('aria-label');
    //         console.log("Val is ---------- " + val);
    //         console.log("Field Value is ---------- " + this.fieldValue);

    //         if (this.fieldValue == val) {
    //             await this.searchedUser.isVisible();
    //             console.log("User available......!");
    //             await this.searchedUser.click();
    //             console.log("User clicked......!");
    //         } else {
    //             console.log("User not found");
    //         }
    // //     } else {
    //         let val = await this.searchedDataUser.getAttribute('aria-label');
    //         console.log("Val is ---------- " + val);
    //         console.log("Data Value is ---------- " + data);

    //         if (data == val) {
    //             await this.searchedDataUser.isVisible();
    //             console.log("User available......!");
    //             await this.searchedDataUser.click();
    //             console.log("User clicked......!");
    //         } else {
    //             console.log("User not found");
    //         }
    //     }
    // }

    // async archiveUser() {
    //     if (await this.threeDotsMenu.isVisible()) {
    //         console.log("Three dots menu icon found");
    //         await this.threeDotsMenu.click();
    //         console.log("Three dots menu icon clicked");

    //         if (await this.archive.isVisible({ timeout: 3000 })) {
    //             console.log("Archive button is visible");
    //             await this.archive.click();
    //             console.log("Archive button item is clicked");
    //             await this.archive.isVisible();// Status Check is change Active to Archive or not.
    //             console.log("User status changed to archive user");
    //         } else {
    //             console.log("Archive button not found in three dots menu");
    //         }
    //     } else {
    //         console.log("Three dots menu icon not found");
    //     }
    // }

    // async activeUser() {
    //     if (await this.threeDotsMenu.isVisible()) {
    //         console.log("Three dots menu icon found");
    //         await this.threeDotsMenu.click();
    //         console.log("Three dots menu icon clicked");

    //         if (await this.restore.isVisible({ timeout: 3000 })) {
    //             console.log("Restore button is visible");
    //             await this.restore.click();
    //             console.log("Restore button is clicked");
    //             await this.active.isVisible({ timeout: 3000 });
    //             console.log("User status changed to active user");
    //         } else {
    //             console.log("Restore button not found in three dots menu");
    //         }
    //     } else {
    //         console.log("Three dots menu icon not found");
    //     }
    // }

    //     async deleteUser() {
    //         if (await this.threeDotsMenu.isVisible({ timeout: 5000 })) {
    //             console.log("Three dots menu icon found");
    //             await this.threeDotsMenu.click();
    //             console.log("Three dots menu icon clicked");

    //             if (await this.archive.isVisible({ timeout: 5000 })) {
    //                 console.log("Archive button item is visible");
    //                 await this.archive.click();
    //                 console.log("Archive button item is clicked");
    //                 await this.archive.isVisible();// Status Check is change Active to Archive or not.
    //                 console.log("User status changed to archive user");

    //                 if (await this.threeDotsMenu.isVisible({ timeout: 5000 })) {
    //                     console.log("Three dots menu icon found");
    //                     await this.threeDotsMenu.click();
    //                     console.log("Three dots menu icon clicked");

    //                     if (await this.delete.isVisible({ timeout: 5000 })) {
    //                         console.log("Delete button is visible");
    //                         await this.delete.click();
    //                         console.log("Delete button is clicked");

    //                         if (await this.confirmDelete.isVisible({ timeout: 5000 })) {
    //                             console.log("Confirm delete button is visible");
    //                             await this.confirmDelete.click();
    //                             console.log("Confirm delete button is clicked");

    //                             if (await this.searchBox.isVisible({ timeout: 5000 })) {
    //                                 console.log("User successfully deleted and navigate back to the customer tab");
    //                             } else {
    //                                 console.log("User failed to navigate");
    //                             }
    //                         } else {
    //                             console.log("Confirm delete button not found");
    //                         }
    //                     } else {
    //                         console.log("Delete button not found");
    //                     }
    //                 } else {
    //                     console.log("Three dots menu icon not found");
    //                 }
    //             } else {
    //                 console.log("Archive button not found in three dots menu");
    //             }
    //         } else {
    //             console.log("Three dots menu icon not found");
    //         }
    //     }
}

export default CreateCustomer;
