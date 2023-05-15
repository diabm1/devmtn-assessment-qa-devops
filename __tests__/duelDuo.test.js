const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

/*
    Check that clicking the Draw button displays the div with id = “choices”

    Check that clicking an “Add to Duo” button displays the div with id = “player-duo”

    Check that when a bot is “Removed from Duo”, that it goes back to “choices”
*/

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("clicking the Draw button displays the div with id = 'choices'", async () => {
    await driver.get("http://localhost:8000");
    let drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();
    // wait until the choicesDiv contains child divs (i.e., the bot cards)
    await driver.wait(until.elementLocated(By.css("#choices .bot-card")), 1000);
  });  
    
  test("clicking an 'Add to Duo' button displays the div with id = 'player-duo'", async () => {
    await driver.get("http://localhost:8000");
    let drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();
    // wait until the choicesDiv contains child divs and then click the first "Add to Duo" button
    let addButton = await driver.wait(until.elementLocated(By.css("#choices .bot-card .bot-btn")), 1000);
    await addButton.click();
    // wait until the playerDuoDiv contains child divs (i.e., the bot cards)
    await driver.wait(until.elementLocated(By.css("#player-duo .bot-card")), 1000);
  });

  test("when a bot is 'Removed from Duo', it goes back to 'choices'", async () => {
    await driver.get("http://localhost:8000");
    let drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();
    // wait until the choicesDiv contains child divs and then click the first "Add to Duo" button
    let addButton = await driver.wait(until.elementLocated(By.css("#choices .bot-card .bot-btn")), 1000);
    await addButton.click();
    // wait until the playerDuoDiv contains child divs and then click the first "Remove from Duo" button
    let removeButton = await driver.wait(until.elementLocated(By.css("#player-duo .bot-card .bot-btn")), 1000);
    await removeButton.click();
    // wait until the choicesDiv contains child divs (i.e., the bot cards)
    await driver.wait(until.elementLocated(By.css("#choices .bot-card")), 1000);
  });
  
});
