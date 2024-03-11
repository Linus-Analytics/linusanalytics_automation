import { Page } from 'playwright';

class CreateBin {
    private page: Page;
    private binicon: string;
    private addbin: string;
    private binclridinput: string;
    private binnameinput: string;
    private maxcapacity: string; // You can specify the type of maxcapacity and capacitythreshold if needed
    private capacitythreshold: string;
    private savebtn: string;

    constructor(page: Page) {
        this.page = page;
        this.binicon = "//img[@alt='Bins-icon']";
        this.addbin = "//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-4i0zct']";
        this.binclridinput = "//input[@name='color']";
        this.binnameinput = "//input[@name='name']";
        this.maxcapacity = '';
        this.capacitythreshold = '';
        this.savebtn = "//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-k2bprm']";
    }

    async BinCreate(binclrid: string, name: string) {
        await this.page.locator(this.binclridinput).fill(binclrid);
        await this.page.locator(this.binnameinput).fill(name);
    }

    async clickbinicon() {
        await this.page.locator(this.binicon).click();
    }

    async clickaddbin() {
        await this.page.locator(this.addbin).click();
    }

    async clickonbinsavebtn() {
        await this.page.locator(this.savebtn).click();
    }
}

export default CreateBin;
