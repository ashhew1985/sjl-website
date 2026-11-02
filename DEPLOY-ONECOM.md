# Steven Johnson Limited — one.com deployment

## Architecture
- Source of truth: this GitHub repository (ashhew1985/sjl-website).
- Production hosting: one.com web hosting for stevenjohnsonltd.co.uk.
- GitHub Pages: development/preview only, not production business hosting.
- DNS: retain at one.com; do **not** point to GitHub Pages for production.

## Initial deployment
1. In GitHub, choose **Code > Download ZIP**. Extract it locally.
2. In the one.com control panel, open **File Manager** for stevenjohnsonltd.co.uk.
3. Back up any current website in the web-root folder before changing it. Check current email/DNS configuration.
4. Upload **the contents** of the extracted website folder (not the folder itself) to one.com's web root (typically `httpd.www`).
5. Confirm `index.html`, `icp-idno.html`, `our-team.html`, `services.html`, `contact.html` and `assets/` are at web-root level.
6. If an old `index.php` or another index file exists, back it up/remove it once approved so it cannot override the new `index.html`.
7. Confirm the domain serves the uploaded site, HTTPS works, and both root and www variants resolve correctly.
8. Test menu links, all pages, mobile layout, photographs, and the contact form end-to-end (FormSubmit may require activation/verification of info@stevejohnsonltd.co.uk).
9. Keep a known-good backup until the new site has been checked.

## Ongoing changes
- Edit and commit files in GitHub.
- For each release, download the updated files or ZIP from GitHub and replace the corresponding files on one.com using File Manager or SFTP.
- Later, optionally automate deployment via GitHub Actions + one.com SFTP/SSH, using encrypted GitHub secrets; never commit hosting passwords.
- GitHub Pages custom-domain/CNAME setup is **not** part of this one.com hosting approach.

## Notes
- IMPORTANT: Confirm the correct email address with Steve; current contact form and mailto links use info@stevejohnsonltd.co.uk (without 'n'). The website domain is stevenjohnsonltd.co.uk (with 'n'). Do not change form routing until the intended receiving mailbox is confirmed.
- The current contact form posts to https://formsubmit.co/info@stevejohnsonltd.co.uk and uses its AJAX endpoint. Test delivery; hosting alone does not guarantee email receipt.
- Some images are loaded from Wikimedia URLs; those are external dependencies and may need local hosting if availability is an issue.
- Do not change MX, SPF, DKIM, or DMARC DNS entries when transferring the website.
- GitHub Pages' terms restrict its use as free commercial website hosting; use one.com as production hosting for SJL.
