import IngredientCard from "../../src/components/IngredientCard.vue";

describe("<IngredientCard />", () => {
  const imageSelector = "[data-cy=ingredient-image]";
  const nameSelector = "[data-cy=ingredient-name]";
  const questionSelector = "[data-cy=ingredient-question]";
  const plusSelector = "[data-cy=ingredient-plus]";

  beforeEach(() => {
    // API Intercepts
    cy.intercept(
      "GET",
      "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
      { fixture: "images/apple.jpg" }
    );
    // Mount Component
    cy.mount(IngredientCard, {
      propsData: {
        name: "apple",
        image: "apple.jpg",
        id: 9003,
      },
    });
  });

  it("renders", () => {
    // Key components are displayed to the user
    cy.get(imageSelector);
    cy.get(nameSelector);
    cy.get(questionSelector);
    cy.get(plusSelector);
  });

  it("has correct information displayed when ingredient information is present", () => {
    // Image is displayed correctly in the card
    cy.get(imageSelector)
      .should("be.visible")
      .should(
        "have.attr",
        "src",
        "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
      );
    // Name is displayed for the user
    cy.get(nameSelector).should("have.text", "apple");
  });
});
