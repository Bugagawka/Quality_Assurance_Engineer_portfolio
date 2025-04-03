


class IssueComments{

    getIssueDetailsModal() {
        return cy.get('[data-testid="modal:issue-details"]')
    }


    addComment(commentText){
        this.getIssueDetailsModal().within(() =>{
            cy.contains('Add comment...').click()
            cy.get('textarea[placeholder="Add a comment..."]').type(commentText);
            cy.contains('button', 'Save').click().should('not.exist');
        })
    }

    verifyCommentExists(commentText) {
        this.getIssueDetailsModal().within(() =>{
            cy.contains('Add comment...').should('exist')
            cy.get('[data-testid="issue-comment"]').should('contain', commentText);
        })
    }

    editComment(newCommentText) {
        this.getIssueDetailsModal().within(() =>{
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
        })
    }

    verifyEditedCommentExists(newCommentText){
        this.getIssueDetailsModal().within(() =>{
            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        })
    }
    deleteComment() {
        this.getIssueDetailsModal().find('[data-testid="issue-comment"]').contains('Delete').click();
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click().should('not.exist');
    }
    verifyCommentDeleted() {
        this.getIssueDetailsModal().find('[data-testid="issue-comment"]')
            .should('not.exist');
    }
}

export default new IssueComments();