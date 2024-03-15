import { Locator, Page } from 'playwright/test';
import testData from '../testData';


interface ScaleData {
    Id: string;
}


class CreateScale {
    private page: Page;
    private fieldValue: string | null | undefined
    private scaleIcon: Locator;
    private customername: Locator;
    private facilityname: Locator;
    private addScale: Locator;
    private scaleIdInput: Locator;
    private scaleNameInput: Locator;
    private scaleText: Locator;
    private saveBtn: Locator;
    selectCustomerName! : Locator;
    selectFacilityName! : Locator

    constructor(page: Page) {
        this.page = page;

        this.scaleIcon = page.locator("//img[@alt='Scales-icon']");
        this.addScale = page.locator("//*[contains(text(),'Add Scale')]");
        this.scaleIdInput = page.locator("//input[@Name='ID']");
        this.scaleNameInput = page.locator("//input[@name='name']");
        this.scaleText = page.locator("//*[contains(text(),'Add Scales')]");
        this.saveBtn = page.locator("//*[contains(text(),'Save')]");
        this.customername = page.locator("//input[@id='customer']"); // /div/button/img[@src='/_next/static/media/select_arrow.b1f6ceaf.svg']
        this.facilityname = page.locator("//input[@id='facilities']");
       
    }

 
    async scaleNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/scales/");
            // await this.page.waitForTimeout(10000);
            if (await this.page.waitForSelector('//nav/div/div/div/div/p[contains(text(),"Scales")]', { state: 'visible' })) {
                console.log("User navigates to Scales tab");
                return true; // Return true if the Scales tab is visible
            } else {
                console.log("User failed to navigate to Scales tab");
                return false; // Return false if the Scales tab is not visible
            }
        } catch (error) {
            console.error("Error during Scales navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddScale(): Promise<boolean> {
        try {
            await this.addScale.click();
            console.log("Add Scale button clicked......!");
            return true; // Return true if the button is clicked successfully
        } catch (error) {
            console.error("Error while clicking on Add Scale button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async enterScaleDetails(scaleId: string, scaleNameValue:string ) {
        await this.scaleIdInput.fill(scaleId);
        await this.scaleNameInput.fill(scaleNameValue);
    }

    async clickScaleCustomer(customerName: string, page: Page) {
        await this.customername.click();
        this.selectCustomerName = page.locator(`//ul[@id="customer-listbox"]/li/p[contains(text(),"${customerName}")]`);
        await this.selectCustomerName.click();

    }

    async clickScaleFacility(facilityName: string, page: Page) {
        await this.facilityname.click();
        this.selectFacilityName = page.locator(`//ul[@id="facilities-listbox"]/li/div/div/div/p[1][contains(text(),"${facilityName}")]`);
        await this.selectFacilityName.click();  
    }


    async clickonScaleSavebtn() {
        await this.saveBtn.click();
        console.log("Bin Created Successfully")
    }




























    // async ScaleCreate(scaleId: string, scaleName: string) {
    //     await this.scaleIdInput.fill(scaleId);
    //     await this.scaleNameInput.fill(scaleName);
    // }

    // async getScaleName() {
    //     this.fieldValue = await this.scaleNameInput.getAttribute('value');
    //     console.log("value is ---------- " + this.fieldValue);
    //     return this.fieldValue;
    // }

    // async verificationGranted() {
    //     if (await this.scaleText.isVisible({ timeout: 3000 })) {
    //         await this.scaleText.click();
    //         console.log("Scale successfully navigate to Scale tab");
    //     } else {
    //         console.log("Failed to navigate");
    //     }
    // }

    // async clickScaleIcon() {
    //     if (await this.scaleIcon.isVisible({ timeout: 3000 })) {
    //         console.log("User clicked on the Scale icon");
    //     } else {
    //         console.log("Scale icon is not found");
    //     }
    // }

    // async clickOnScaleSavebtn() {
    //     if (await this.saveBtn.isVisible({ timeout: 3000 })) {
    //         console.log("Save button is visible and clickable......!");
    //         await this.saveBtn.click();
    //         console.log("Save button clicked......!");
    //     } else {
    //         console.log("Save button not found......!");
    //     }
    // }

 




    // async searchScale(Id: string) {
    //     console.log("Field Value is ---------- " + this.fieldValue);
    //     console.log("ID Value is ---------- " + Id);

    //     if (Id == undefined && this.fieldValue != undefined) {
    //         console.log("Field Value is ---------- " + this.fieldValue);

    //         if (await this.searchBox.isVisible({ timeout: 3000 })) {
    //             console.log("Search box is found and editable......!");
    //             await this.searchBox.click();
    //             await this.searchBox.fill(this.fieldValue);
    //             console.log("Field Value is entered in the searchbox......!");
    //         } else {
    //             console.log("Search box is not found......!");
    //         }
    //     } else {
    //         console.log("ID Value is ---------- " + Id);

    //         if (await this.searchBox.isVisible({ timeout: 3000 })) {
    //             console.log("Search box is found and editable......!");
    //             await this.searchBox.click();
    //             await this.searchBox.fill(Id);
    //             console.log("Data is entered in the searchbox......!");
    //         } else {
    //             console.log("Search box is not found......!");
    //         }
    //     }
    // }

    // async goToSearchedScale(Id: string) {
    //     console.log("Field Value is ---------- " + this.fieldValue);
    //     console.log("Data Value is ---------- " + Id);

    //     if (Id == undefined && this.fieldValue != undefined) {
    //         console.log("Field Value is ---------- " + this.fieldValue);

    //         if (await this.searchBox.isVisible({ timeout: 3000 })) {
    //             console.log("Search box is found and editable......!");
    //             await this.searchBox.click();
    //             await this.searchBox.fill(this.fieldValue);
    //             console.log("Field Value is entered in the searchbox......!");
    //         } else {
    //             console.log("Search box is not found......!");
    //         }
    //     } else {
    //         console.log("Data Value is ---------- " + Id);

    //         if (await this.searchBox.isVisible({ timeout: 3000 })) {
    //             console.log("Search box is found and editable......!");
    //             await this.searchBox.click();
    //             await this.searchBox.fill(Id);
    //             console.log("Data is entered in the searchbox......!");
    //         } else {
    //             console.log("Search box is not found......!");
    //         }
    //     }
    // }

    // async archiveScale() {
    //     if (await this.threeDotsMenu.isVisible({ timeout: 3000 })) {
    //         console.log("Three dots menu icon found");
    //         await this.threeDotsMenu.click();
    //         console.log("Three dots menu icon clicked");

    //         if (await this.archive.isVisible({ timeout: 3000 })) {
    //             console.log("Archive button is visible");
    //             await this.archive.click();
    //             console.log("Archive button item is clicked");
    //             await this.archive.isVisible();
    //             console.log("User status changed to archive user");
    //         } else {
    //             console.log("Archive button not found in three dots menu");
    //         }
    //     } else {
    //         console.log("Three dots menu icon not found");
    //     }
    // }

    // async activeScale() {
    //     if (await this.threeDotsMenu.isVisible({ timeout: 3000 })) {
    //         console.log("Three dots menu icon found");
    //         await this.threeDotsMenu.click();
    //         console.log("Three dots menu icon clicked");

    //         if (await this.restore.isVisible({ timeout: 3000 })) {
    //             console.log("Restore button is visible");
    //             await this.restore.click();
    //             console.log("Restore button is clicked");
    //             await this.active.isVisible();
    //             console.log("User status changed to active scale");
    //         } else {
    //             console.log("Restore button not found in three dots menu");
    //         }
    //     } else {
    //         console.log("Three dots menu icon not found");
    //     }
    // }

    // async deleteScale() {
    //     if (await this.threeDotsMenu.isVisible({ timeout: 5000 })) {
    //         console.log("Three dots menu icon found");
    //         await this.threeDotsMenu.click();
    //         console.log("Three dots menu icon clicked");

    //         if (await this.archive.isVisible({ timeout: 5000 })) {
    //             console.log("Archive button item is visible");
    //             await this.archive.click();
    //             console.log("Archive button item is clicked");
    //             await this.archive.isVisible();
    //             console.log("User status changed to archive user");

    //             if (await this.threeDotsMenu.isVisible({ timeout: 5000 })) {
    //                 console.log("Three dots nenu icon found");
    //                 await this.threeDotsMenu.click();
    //                 console.log("Three dots menu icon clicked");

    //                 if (await this.delete.isVisible({ timeout: 5000 })) {
    //                     console.log("Delete button is visible");
    //                     await this.delete.click();
    //                     console.log("Delete button is clicked");

    //                     if (await this.confirmDelete.isVisible({ timeout: 5000 })) {
    //                         console.log("Confirm delete button is visible");
    //                         await this.confirmDelete.click();
    //                         console.log("Confirm delete button is visible");

    //                         if (await this.searchBox.isVisible({ timeout: 5000 })) {
    //                             console.log("Scale successfully deleted and navigate back to the Scale tab");
    //                         } else {
    //                             console.log("User failed to navigate");
    //                         }
    //                     } else {
    //                         console.log("Confirm delete button not found");
    //                     }
    //                 } else {
    //                     console.log("Delete button not found");
    //                 }
    //             } else {
    //                 console.log("Three dots menu icon not found");
    //             }
    //         } else {
    //             console.log("Archive button not found in three dots menu");
    //         }
    //     } else {
    //         console.log("Three dots menu icon not found");
    //     }
    // }
}

export default CreateScale;
