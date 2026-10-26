/* SJL Contact — client-side email composer.
   GitHub Pages cannot receive POST submissions without an external service.
   This form prepares a mailto draft; the visitor chooses whether to send. */
(() => {
  "use strict";
  const form = document.getElementById("sjl-contact-form");
  if (!form) return;
  const sendButton = document.getElementById("contact-send");
  const copyButton = document.getElementById("contact-copy");
  const status = document.getElementById("contact-status");
  const recipient = form.dataset.recipient || "";
  if (!recipient || !recipient.includes("@")) return;

  if (sendButton) sendButton.disabled = false;
  if (copyButton) copyButton.disabled = false;

  function value(name) {
    const input = form.elements.namedItem(name);
    return input && typeof input.value === "string" ? input.value.trim() : "";
  }

  function draft() {
    const topic = value("enquiry_type") || "General enquiry";
    const subject = "SJL website enquiry — " + topic;
    const message = [
      "Hello Steve,",
      "",
      "I'd like to discuss the following with Steven Johnson Limited.",
      "",
      "Name: " + value("name"),
      "Company: " + (value("company") || "Not provided"),
      "Email: " + value("email"),
      "Telephone: " + (value("phone") || "Not provided"),
      "Area of interest: " + topic,
      "",
      "How can SJL help?",
      value("message"),
      "",
      "Kind regards,",
      value("name")
    ].join("\n");
    return { subject, message };
  }

  function report(text) {
    if (status) status.textContent = text;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const prepared = draft();
    const href = "mailto:" + recipient + "?subject=" +
      encodeURIComponent(prepared.subject) + "&body=" +
      encodeURIComponent(prepared.message);
    report("Your email application should open with a prepared draft. Please review it and press Send in your email application — nothing has been sent automatically.");
    window.location.href = href;
  });

  copyButton?.addEventListener("click", async () => {
    if (!value("name") && !value("message")) {
      report("Enter your name or enquiry details first, then select Copy enquiry.");
      return;
    }
    const prepared = draft();
    const textToCopy = "To: " + recipient + "\nSubject: " +
      prepared.subject + "\n\n" + prepared.message;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("No clipboard API");
      await navigator.clipboard.writeText(textToCopy);
      report("Enquiry copied. Open your email app, paste the message and send it to " + recipient + ".");
    } catch (_) {
      window.prompt("Copy the enquiry below, then email " + recipient + ":", textToCopy);
      report("If prompted, copy the enquiry and send it from your email application.");
    }
  });
})();
