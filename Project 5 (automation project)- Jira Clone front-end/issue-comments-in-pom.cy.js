
import IssueComments from "../../pages/IssueComments"

describe('Issue comments creating, editing, and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('include', '/project/board').then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });
    it('Should add, edit, and delete a comment successfully', () => {
        const initialComment = 'TEST_COMMENT';
        const editedComment = 'TEST_COMMENT_EDITED';

        // Add comment
        IssueComments.addComment(initialComment);
        IssueComments.verifyCommentExists(initialComment);

        // Edit comment
        IssueComments.editComment(editedComment);
        IssueComments.verifyEditedCommentExists(editedComment);

        // Delete comment
        IssueComments.deleteComment();
        IssueComments.verifyCommentDeleted();
    });
});