import { auto } from "auto-playwright";
import { test, expect } from "@playwright/test";

import { OpenAI } from 'openai';

// Instantiate OpenAI client with API key
const openai = new OpenAI({ apiKey: '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' });


test("executes query, action and assertion", async ({ page }) => {
    await page.goto("www.facebook.com");

    // `auto` can query data
    // In this case, the result is plain-text contents of the header
    const headerText = await auto(
        "get the header text",
        { page, test },
    );

    // `auto` can perform actions
    // In this case, auto will find and fill in the search text input
    await auto(
        `type "${headerText}" in the search box`,
        { page, test },
    );

    // `auto` can assert the state of the website
    // In this case, the result is a boolean outcome
    const searchInputHasHeaderText = await auto(
        `is the contents of the search box equal to "${headerText}"?`,
        { page, test },
    );

    expect(searchInputHasHeaderText).toBe(true);
});