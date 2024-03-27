import { Page } from 'playwright';
import { expect } from 'playwright/test';

class CreateHopper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }
    async verifyHopperName(hopperName: string): Promise<void> {
        try {
            // Wait for 3 seconds
            await this.page.waitForTimeout(3000);

            // Wait for the hopper element to appear within 10 seconds
            const hopperElement = await this.page.waitForSelector('xpath=//tr/td[2]/p[contains(text(),' + hopperName + ')]', { timeout: 10000 });
            // Verify if the hopper element exists
            if (!hopperElement)
                throw new Error(`Hopper element with name '${hopperName}' not found within 10 seconds`);

            if (hopperElement) {
                const hopperText = await hopperElement.textContent();

                if (hopperText && hopperText.trim().toLowerCase() === hopperName.trim().toLowerCase()) {
                    console.log("Hopper created by admin found in customer  ----------------> " + hopperName);
                    await hopperElement.click();

                    // Assuming verifyHopperDetails returns a boolean
                    const hopperDetailsVerified = await this.verifyHopperDetails(hopperName);
                    if (!hopperDetailsVerified) {
                        throw new Error("Failed to verify hopper details.");
                    }
                } else {
                    console.log("Hopper Text Does Not Match ----------------> " + hopperName);
                    throw new Error("Hopper text does not match: " + hopperName);
                }
            } else {
                console.log("Hopper Not Found In List ----------------> " + hopperName);
                throw new Error("Hopper not found in list: " + hopperName);
            }
        } catch (error) {
            console.error("Error while checking Hopper:", error);
            // Mark the test as failed
            throw new Error("Error while checking Hopper: " + error);
        }
    }

    async verifyHopperDetails(hopperName: string): Promise<boolean> {
        try {
            await this.page.waitForTimeout(5000);

            // Remove the dashes and replace with spaces
            const adjustedHopperName = hopperName.replace(/-/g, ' ');

            // Locate the heading element by its role with adjusted name
            const headingElement = await this.page.getByRole('heading', { name: adjustedHopperName });

            // Verify if the heading element exists
            if (!headingElement)
                throw new Error(`Heading element with name '${hopperName}' not found`);

            // Extract the text content of the heading element
            const headingText = await headingElement.textContent() as string;

            // Verify if the expected text is present in the heading element
            if (!headingText.includes(adjustedHopperName))
                throw new Error(`Heading text '${hopperName}' not found`);

            // If all verifications passed, return true
            return true;
        } catch (error) {
            // If any error occurs during verification, log it and mark the test as failed
            console.error("Verification failed:", error);
            throw new Error("Verification failed: " + error); // Mark the test as failed
        }
    }

    async hopper_navigation(): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();
            await this.page.getByRole('button', { name: 'Hoppers' }).click();
            console.log('User navigated to hopper page');
            return true; // Navigation successful
        } catch (error) {
            console.error("Error during hopper navigation:", error);
            // Mark the test as failed
            throw new Error("Error during hopper navigation: " + error);
        }
    }

}
export default CreateHopper;
