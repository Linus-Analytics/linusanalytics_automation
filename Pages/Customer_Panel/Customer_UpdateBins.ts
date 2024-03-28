
import { Page } from 'playwright';

class UpdateBin {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async updateBinCapacity(newCapacity: string) {
        try {
            // Wait for the manage element to appear within 5 seconds
            const manageBinButton = await this.page.waitForSelector('xpath=//*[contains(text(),"Manage")]/child::span', { timeout: 5000 });

            if (manageBinButton) {
                // Click on the "Manage" button
                await manageBinButton.click();

                // Wait for the input field for max capacity to be clickable
                const maxCapacityInput = await this.page.waitForSelector('xpath=//*[@aria-label="Max Capacity"]', { timeout: 5000 });

                if (maxCapacityInput) {
                    // Get the old capacity value
                    const oldCapacity = await maxCapacityInput.textContent();

                    // Fill the new capacity value
                    await maxCapacityInput.fill(newCapacity);

                    // Click on the "Update" button
                    await this.page.click('xpath=//*[@aria-label="Update"]');

                    // Check if the capacity value has been updated
                    if (oldCapacity !== newCapacity) {
                        console.log("Maximum capacity of the bin has been updated");
                    } else {
                        console.log("Something went wrong while updating maximum capacity of the bin");
                    }
                } else {
                    console.log('Max Capacity input field not found');
                }
            } else {
                console.log('Manage bin button is not found on the bin details page');
            }
        } catch (error) {
            console.error("Error during updating", error);
        }
    }


    // async updateBinCapacity(newCapacity: string) {

    //     try {

    //         // Wait for the manage element to appear within 5 seconds
    //         const managebin = await this.page.waitForSelector('xpath=//*[contains(text(),"Manage")]/child::span', { timeout: 5000 });


    //         if (managebin) {

    //             await managebin.click();

    //             await this.page.getByLabel('Max Capacity').click();
    //             const oldCapacity = await this.page.getByLabel('Max Capacity').textContent();
    //             await this.page.getByLabel('Max Capacity').fill(newCapacity);

    //             await this.page.getByRole('button', { name: 'Update' }).click();

    //             if (oldCapacity != newCapacity) {
    //                 console.log("Maximum capacity of the bin has been updated");
    //             } else {
    //                 console.log("Something want wrong while updating maximum capacity of the bin");
    //             }


    //         } else {
    //             console.log('Manage bin button is not found on the bin details page');
    //         }

    //     } catch (error) {
    //         console.error("Error during updating", error);

    //     }
    // }

    async addthreshold(newthreshold: string) {
        try {
            // Wait for the manage element to appear within 5 seconds
            const managebin = await this.page.waitForSelector('xpath=//*[contains(text(),"Manage")]/child::span', { timeout: 5000 });

            if (managebin) {
                // Click on the "Manage" button
                await managebin.click();

                // Wait for the checkbox to be clickable and then click on it
                await this.page.getByLabel('Notify users when at capacity').click();

                // Get the old threshold value
                const oldthreshold = await this.page.getByLabel('Capacity Threshold', { exact: true }).innerText();

                // Fill the new threshold value
                await this.page.getByLabel('Capacity Threshold', { exact: true }).fill(newthreshold);

                // Click on the user dropdown and wait for the element to be clickable
                await this.page.getByRole('combobox', { name: 'Select User' }).click();
                const userOption = await this.page.waitForSelector('xpath=//ul/li/p', { timeout: 5000 });

                if (userOption) {
                    // Click on the user option
                    await userOption.click();
                } else {
                    console.log('User option not found');
                }

                // Click on the "Update" button
                await this.page.getByRole('button', { name: 'Update' }).click();

                // Check if the threshold value has been updated
                if (oldthreshold !== newthreshold) {
                    console.log("Threshold value of the bin has been updated");
                } else {
                    console.log("Something went wrong while updating threshold value of the bin");
                }
            } else {
                console.log('Manage bin button is not found on the bin details page');
            }
        } catch (error) {
            console.error("Error during updating threshold", error);
        }
    }

}
export default UpdateBin;