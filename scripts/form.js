// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the form HTML content
    const htmlComponent = "../components/form.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    (function () {
      emailjs.init({
        publicKey: import.meta.env.VITE_EMAILJS_API_KEY,
      });
    })();

    // Define the custom element
    class FormElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });

        // Assuming styleSheet and template are already defined elsewhere
        shadowRoot.adoptedStyleSheets = [styleSheet];
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Correctly add event listeners to all elements with the class ".input"
        const inputs = shadowRoot.querySelectorAll(".input,select");
        inputs.forEach((input) => {
          input.addEventListener("blur", function (event) {
            const value = event.target.value.trim(); // Get the trimmed value of the input

            // Check if valid input
            if (event.target.checkValidity()) {
              event.target.classList.remove("input-error"); // Remove error state
              event.target.classList.add("input-success"); // Add success state
            } else {
              event.target.classList.remove("input-success"); // Remove success state
              event.target.classList.add("input-error"); // Add error state
            }
          });
        });

        // Add event listener to submit email using emailjs template
        shadowRoot
          .querySelector("#contact-form")
          .addEventListener("submit", function (event) {
            event.preventDefault();
            emailjs.sendForm("service_mmlaf1r", "template_79xcu8k", this).then(
              () => {
                window.alert("SUCCESS!");
              },
              (error) => {
                window.alert("FAILED...", error);
              }
            );
          });
      }
    }

    // Define the custom element
    customElements.define("app-form", FormElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
