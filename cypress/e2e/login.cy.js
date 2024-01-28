describe("Authentication", () => {
  it("should log in with valid credentials", () => {
    cy.visit("http://127.0.0.1:5500/index.html");

    cy.get('input[name="email"]').type("valid_email@example.com");
    cy.get('input[name="password"]').type("validpassword");

    cy.get("form").submit();

    cy.url().should("include", "/dashboard");

    cy.get(".user-avatar").should("exist");
  });

  it("should show error message for invalid credentials", () => {
    cy.visit("http://127.0.0.1:5500/index.html");

    cy.get('input[name="email"]').type("invalid_email@example.com");
    cy.get('input[name="password"]').type("invalidpassword");

    cy.get("form").submit();

    cy.get(".error-message").should("be.visible");
  });

  it("should log out successfully", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.get('input[name="email"]').type("valid_email@example.com");
    cy.get('input[name="password"]').type("validpassword");
    cy.get("form").submit();

    cy.url().should("include", "/dashboard");

    cy.get(".logout-button").click();

    cy.url().should("include", "http://127.0.0.1:5500/index.html");

    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get("form").should("be.visible");
  });
});
