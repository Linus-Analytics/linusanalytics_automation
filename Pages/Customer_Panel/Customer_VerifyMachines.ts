import { Page } from 'playwright';
import { expect } from 'playwright/test';

class VerifyMachine {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async verifyMachineDetails(machineName: string): Promise<boolean> {
        try {
            await this.page.waitForTimeout(5000);

            // Remove the dashes and replace with spaces
            const adjustedMachineName = machineName.replace(/-/g, ' ');

            // Locate the heading element by its role with adjusted name
            const headingElement = this.page.getByRole('heading', { name: adjustedMachineName });

            // Verify if the heading element exists
            if (!headingElement)
                throw new Error(`Heading element with name '${machineName}' not found`);

            // Extract the text content of the heading element
            const headingText = await headingElement.textContent() as string;

            // Verify if the expected text is present in the heading element
            if (!headingText.includes(adjustedMachineName))
                throw new Error(`Heading text '${machineName}' not found`);

            // If all verifications passed, return true
            return true;
        } catch (error) {
            // If any error occurs during verification, log it and mark the test as failed
            console.error("Verification failed:", error);
            throw new Error("Verification failed: " + error); // Mark the test as failed
        }
    }

    async verifyMachineName(machineName: string): Promise<void> {
        try {
            // Wait for 3 seconds
            await this.page.waitForTimeout(3000);

            // Wait for the machine element to appear within 10 seconds
            const machineElement = await this.page.waitForSelector('xpath=//tr/td[1]/p[contains(text(),' + machineName + ')]', { timeout: 10000 });
            // Verify if the machine element exists
            if (!machineElement)
                throw new Error(`Machine element with name '${machineName}' not found within 10 seconds`);

            if (machineElement) {
                const machineText = await machineElement.textContent();

                if (machineText && machineText.trim().toLowerCase() === machineName.trim().toLowerCase()) {
                    console.log("Machine created by admin found in customer ----------------> " + machineName);
                    await machineElement.click();

                    // Assuming verifyMachineDetails returns a boolean
                    const machineDetailsVerified = await this.verifyMachineDetails(machineName);
                    if (!machineDetailsVerified) {
                        throw new Error("Failed to verify machine details.");
                    }
                } else {
                    console.log("Machine Text Does Not Match ----------------> " + machineName);
                    throw new Error("Machine text does not match: " + machineName);
                }
            } else {
                console.log("Machine Not Found In List ----------------> " + machineName);
                throw new Error("Machine not found in list: " + machineName);
            }
        } catch (error) {
            console.error("Error while checking machine:", error);
            // Mark the test as failed
            throw new Error("Error while checking machine: " + error);
        }
    }

    async machine_navigation() {

        try {

            await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();
            await this.page.getByRole('button', { name: 'Machines' }).click();
            console.log('User navigated to machine page');
            return true; // Navigation successful
        } catch (error) {
            console.error("Error during machine navigation:", error);
            // Mark the test as failed
            throw new Error("Error during machine navigation: " + error);
        }
    }


} export default VerifyMachine;
