/* Steven Johnson Limited | website contact form
 * FormSubmit.co receives the enquiry and forwards it to the business mailbox.
 * A one-time mailbox activation is required before delivery can begin.
 * No phone numbers, no analytics and no persistent browser storage.
 */
(() => {
  "use strict";
  const form = document.getElementById("sjl-contact-form");
  if (!form) return;
  const sendButton = document.getElementById("contact-send");
  const status = document.getElementById("contact-status");
  const endpoint = form.dataset.endpoint;
  const businessEmail = "info@stevenjohnsonltd.co.uk";

  const report = (message, isError) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = isError ? "error" : "success";
    status.setAttribute("role", isError ? "alert" : "status");
  };

  form.addEventListener("submit", async (event) => {
    if (!window.fetch || !endpoint) return; // Native HTML form remains a fallback.
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    if (String(formData.get("_honey") || "").trim()) return;

    const topic = String(formData.get("enquiry_type") || "General enquiry");
    formData.set("_subject", "SJL website enquiry — " + topic);
    const body = Object.fromEntries(formData.entries());
    sendButton.disabled = true;
    sendButton.setAttribute("aria-busy", "true");
    sendButton.textContent = "Sending enquiry…";
    if (status) { status.textContent = ""; status.removeAttribute("data-state"); }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify(body),
        signal: controller.signal
      });
      if (!response.ok) throw new Error("Form endpoint returned " + response.status);
      const result = await response.json();
      if (result?.success === false || result?.success === "false") {
        throw new Error(result?.message || "Submission was not accepted");
      }
      form.reset();
      report("Thank you — your enquiry has been accepted by our form service. Once the SJL inbox has been activated, it will be delivered to our team.", false);
    } catch (error) {
      report(error?.name === "AbortError" ? "The form service did not respond. Please try again or email " + businessEmail + " directly." : "Your message could not be confirmed as sent. Please check for a FormSubmit activation email, or email " + businessEmail + " directly.", true);
    } finally {
      clearTimeout(timeout);
      sendButton.disabled = false;
      sendButton.removeAttribute("aria-busy");
      sendButton.textContent = "Send enquiry →";
    }
  });
})();
