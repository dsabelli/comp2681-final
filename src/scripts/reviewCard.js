// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the contentCard HTML content
    const htmlComponent = "../components/review-card.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    // Define the custom element
    class ReviewCardElement extends HTMLElement {
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
          if (event.attributeName === "src-url") {
            this.updateImageSource(event.target.getAttribute("src-url"));
          }
        });
      }

      connectedCallback() {
        // Initial check for src-url attribute
        this.updateImageSource(this.getAttribute("src-url"));
      }

      updateImageSource(url) {
        if (!url) return; // Ensure there's a valid URL

        // Target the img tag with the class 'card-img'
        const imgElement = this.shadowRoot.querySelector(".card-img");

        if (imgElement) {
          imgElement.src = url; // Update the src attribute of the img element
        }
      }
    }

    // Define the custom element
    customElements.define("app-review-card", ReviewCardElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
