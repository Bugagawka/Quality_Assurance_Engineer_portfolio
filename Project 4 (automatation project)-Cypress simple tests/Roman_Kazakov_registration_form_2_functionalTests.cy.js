beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

/*
Assignement 4: add content to the following tests
*/

//Using Faker to create random valid data for tests
const { faker } = require("@faker-js/faker");
module.exports = {
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
};

//Using function to make code more readable
let password = "MyOnly1Password";

function inputMandatoryData(username) {
  cy.get("#username").type(username);
  cy.get("#email").type(faker.internet.email());
  cy.get('[name="name"]').type("Roman");
  cy.get('[name="lastName"]').type(faker.person.lastName());
  cy.get('[data-testid="phoneNumberTestId"]').type("123456789");
  cy.get("#password").type(password);
  cy.get("#confirm").type(password);
  cy.get("h2").contains("Password").click();
  cy.get(".submit_button").should("be.enabled");
  cy.get(".submit_button").click();
  cy.get("#success_message").should("be.visible");
}

describe("Functional tests", () => {
  it("User can use only same both first and validation passwords", () => {
    // Add test steps for filling in only mandatory fields
    cy.get("#username").type("Something");
    cy.get("#email").type(faker.internet.email());
    cy.get('[name="name"]').type("Roman");
    cy.get('[name="lastName"]').type(faker.person.lastName());
    cy.get('[data-testid="phoneNumberTestId"]').type("123456789");
    // Type confirmation password which is different from first password
    cy.get("#password").type(password);
    cy.get("#confirm").type("MyOnly1Password2");
    // Assert that submit button is not enabled
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    // Assert that successful message is not visible
    cy.get("#success_message").should("not.be.visible");
    // Assert that error message is visible
    cy.get("#password_error_message").should("be.visible");

    // Change the test, so the passwords would match
    cy.get("#confirm").clear().type(password);
    cy.get("h2").contains("Password").click();
    // Add assertion, that error message is not visible anymore
    cy.get("#password_error_message").should("not.be.visible");
    // Add assertion, that submit button is now enabled
    cy.get(".submit_button").should("be.enabled");
  });

  it("User can submit form with all fields added", () => {
    // Add test steps for filling in ALL fields
    cy.get("#username").type("Something");
    cy.get("#email").type(faker.internet.email());
    cy.get('[name="name"]').type("Roman");
    cy.get('[name="lastName"]').type(faker.person.lastName());
    cy.get('[data-testid="phoneNumberTestId"]').type("123456789");
    cy.get('[name="fav_language"]').check("JavaScript");
    cy.get("[type='checkbox']").check("Car");
    cy.get("[name=cars]").select("Audi");
    cy.get("[name=animal]").select("dog");
    cy.get("#password").type(password);
    cy.get("#confirm").type(password);
    cy.get("h2").contains("Password").click();
    // Assert that submit button is enabled
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();
    // Assert that after submitting the form system show successful message
    cy.get("#success_message").should("be.visible");
  });

  it("User can submit form with valid data and only mandatory fields added", () => {
    // Add test steps for filling in ONLY mandatory fields
    inputMandatoryData("johnDoe");
    // Assert that submit button is enabled
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();
    // Assert that after submitting the form system shows successful message
    cy.get("#success_message").should("be.visible");
    // example, how to use function, which fills in all mandatory data
    // in order to see the content of the function, scroll to the end of the file
  });

  // Add at least 1 test for checking some mandatory field's absence
  it("User cannot submit data when username is absent", () => {
    inputMandatoryData("johnDoe");
    cy.get("#username").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#input_error_message").should("be.visible");
  });

  it("User cannot submit data when email is absent", () => {
    inputMandatoryData("johnDoe");
    cy.get("#email").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#input_error_message").should("be.visible");
  });

  it.only("Password confirmation does not match password", () => {
    inputMandatoryData("johnDoe");
    cy.get("#confirm").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#password_error_message").should("be.visible");
  });
});
