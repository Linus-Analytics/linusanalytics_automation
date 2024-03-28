import { Page } from 'playwright';
import { expect } from 'playwright/test';

class VerifyBin {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async verifyBinDetails(binName: string): Promise<boolean> {
        try {
            await this.page.waitForTimeout(5000);

            // Remove the dashes and replace with spaces
            const adjustedBinName = binName.replace(/-/g, ' ');

            // Locate the heading element by its role with adjusted name
            const headingElement = this.page.getByRole('heading', { name: adjustedBinName });

            // Verify if the heading element exists
            if (!headingElement)
                throw new Error(`Heading element with name '${binName}' not found`);

            // Extract the text content of the heading element
            const headingText = await headingElement.textContent() as string;

            // Verify if the expected text is present in the heading element
            if (!headingText.includes(adjustedBinName))
                throw new Error(`Heading text '${binName}' not found`);

            // If all verifications passed, return true
            return true;
        } catch (error) {
            // If any error occurs during verification, log it and mark the test as failed
            console.error("Verification failed:", error);
            throw new Error("Verification failed: " + error); // Mark the test as failed
        }
    }

    async verifyBinName(binName: string): Promise<void> {
        try {
            // Wait for 3 seconds
            await this.page.waitForTimeout(3000);

            // Wait for the bin element to appear within 10 seconds
            const binElement = await this.page.waitForSelector('xpath=//tr/td[1]/p[contains(text(),' + binName + ')]', { timeout: 10000 });

            // Verify if the bin element exists
            if (!binElement) {
                console.log("Bin Not Found In List ----------------> " + binName);
                throw new Error("Bin not found in list: " + binName);
            }

            // Get the text content of the bin element
            const binText = await binElement.textContent();

            // Verify if the binText is not null or undefined
            if (binText === null || binText === undefined) {
                console.log("Bin Text is null or undefined for ----------------> " + binName);
                throw new Error("Bin text is null or undefined: " + binName);
            }

            // Check if the bin text matches the provided binName
            if (binText.trim().toLowerCase() === binName.trim().toLowerCase()) {
                console.log("Bin created by admin found in customer ----------------> " + binName);
                await binElement.click();

                // Assuming verifyBinDetails returns a boolean
                const binDetailsVerified = await this.verifyBinDetails(binName);
                if (!binDetailsVerified) {
                    throw new Error("Failed to verify bin details.");
                }
            } else {
                console.log("Bin Text Does Not Match ----------------> " + binName);
                throw new Error("Bin text does not match: " + binName);
            }
        } catch (error) {
            console.error("Error while checking bin:", error);
            // Mark the test as failed
            throw new Error("Error while checking bin: " + error);
        }
    }


    async bin_navigation() {

        try {

            await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();
            await this.page.getByRole('button', { name: 'Bins' }).click();
            console.log('User navigated to bin page');
            return true; // Navigation successful
        } catch (error) {
            console.error("Error during bin navigation:", error);
            // Mark the test as failed
            throw new Error("Error during bin navigation: " + error);
        }

    }



} export default VerifyBin;
