describe("Authentication", () => {
  it("should log in with valid credentials", () => {
    cy.visit("/");

    cy.get('input[name="email"]').type("olga.goryszewska@gmail.com");
    cy.get('input[name="password"]').type("Test123456");

    cy.get("form").submit();

    cy.url().should("include", "/dashboard");

    cy.get(".user-avatar").should("exist");
  });

  it("should show error message for invalid credentials", () => {
    cy.visit("http://127.0.0.1:5500/index.html");

    cy.get('input[name="email"]').type("olga.goryszewska@gmail.com");
    cy.get('input[name="password"]').type("Test123456");

    cy.get("form").submit();

    cy.get(".error-message").should("be.visible");
  });

  it("should log out successfully", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.get('input[name="email"]').type("olga.goryszewska@gmail.com");
    cy.get('input[name="password"]').type("Test123456");
    cy.get("form").submit();

    cy.url().should("include", "/dashboard");

    cy.get(".logout-button").click();

    cy.url().should("include", "http://127.0.0.1:5500/index.html");

    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get("form").should("be.visible");
  });
});
