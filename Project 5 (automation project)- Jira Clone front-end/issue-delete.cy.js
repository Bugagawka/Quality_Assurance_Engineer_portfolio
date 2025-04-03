// describe("Test cases for deleting an issue", () => {
//   beforeEach(() => {
//     cy.visit("/");
//     cy.url()
//       .should("eq", `${Cypress.env("baseUrl")}project/board`)
//       .then((url) => {
//         //System will open issues board
//         cy.visit(url + "/board?modal-issue-details=true");
//         cy.contains("This is an issue of type: Task.").click();

//         //Assert that issue detail view modal is visible
//         cy.get('[data-testid="modal:issue-details"]').should("be.visible");
//       });
//   });
describe("Test cases for deleting an issue", () => {
  beforeEach(() => {
    cy.visit("/");

    // Ensure we're on the correct board page
    cy.url()
      .should("include", "/project/board")
      .then((url) => {
        // Open the issue board
        cy.visit(url + "/board?modal-issue-details=true");

        // Ensure the issue is visible before clicking
        cy.get('[data-testid="list-issue"]')
          .first()
          .should("exist")
          .should("be.visible")
          .click();

        // Assert that the issue details modal is visible
        cy.get('[data-testid="modal:issue-details"]').should("be.visible");
      });
  });

  it("Delete issue", () => {
    //Find the element which contains the "Delete" button and click it
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });

    //Assert that confirmation window is visible
    cy.get('[data-testid="modal:confirm"]').should("be.visible");

    //Find "Delete issue" button and click it
    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete issue")
      .click();

    //Assert that confirmation window is not visible
    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    //Assert that bug report has been deleted
    cy.reload();
    cy.get('[data-testid="list-issue"]').should(
      "not.have.text",
      "This is an issue of type: Task."
    );
  });

  //Delete the issue, but cancel it by clicking on "Cancel" button
  it.only('Delete issue, but cancel it by clicking on "Cancel" button', () => {
    //Find the element which contains the "Delete" button and click it
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });

    //Assert that Confirmation window is visible
    cy.get('[data-testid="modal:confirm"]').should("be.visible");

    //Find "Cancel" button and click it
    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Cancel")
      .click();

    //Assert that confirmation window is not visible
    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    //Close the bug report window
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]').first().click();
    });

    //Assert that bug report has not been deleted
    cy.reload();
    cy.get('[data-testid="list-issue"]')
      .first()
      .should("have.text", "This is an issue of type: Task.");
  });
});
