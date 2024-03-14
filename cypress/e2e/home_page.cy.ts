describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:5173");
  });

  it("should load the front page map", () => {
    const map = cy.get(".mapboxgl-map");
    map.should("exist");
  });
});
