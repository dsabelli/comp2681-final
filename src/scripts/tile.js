// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the contentCard HTML content
    const htmlComponent = "../components/tile.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    // Define the custom element
    class TileElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [styleSheet];

        // Clone the template content
        const clone = template.content.cloneNode(true);

        // Append the clone to the shadow root
        shadowRoot.appendChild(clone);

        // Listen for attribute changes
        this.addEventListener("attributeChanged", (event) => {
          if (event.attributeName === "bg-url") {
            this.updateBackgroundImage(event.target.getAttribute("bg-url"));
          }
        });
      }

      connectedCallback() {
        // Initial check for bg-url attribute
        this.updateBackgroundImage(this.getAttribute("bg-url"));
      }

      updateBackgroundImage(url) {
        if (!url) return; // Ensure there's a valid URL

        // Assuming your card has a specific class where you want to apply the background
        const card = this.shadowRoot.querySelector(".card");
        if (card) {
          card.style.backgroundImage = `url(${url})`;
        }
      }
    }

    // Define the custom element
    customElements.define("app-tile", TileElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
