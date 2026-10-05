+++
date = '2026-10-05T00:00:00+02:00'
title = 'SMTP Email with Mailtrap'
+++

I use the free [Mailtrap Email Sandbox](https://mailtrap.io/) to test emails from Business Central SaaS. Messages arrive in the Mailtrap sandbox instead of the recipient's real inbox. No domain verification is needed for this setup.

## Get SMTP credentials from Mailtrap

1. Create a free Mailtrap account and sign in.
2. Open **Sandboxes** under **Email Testing**, then select **My Sandbox** or create your own sandbox.
3. Open **Integration** and select **SMTP**.
4. Copy **Host**, **Port**, **Username** and **Password**. Each sandbox has its own credentials.

![Mailtrap SMTP](/images/mailtrap-smtp.png)

## Set up the account in Business Central

1. Open **Email Accounts**.
2. Choose **New**, then **Add an email account**.
3. Select **SMTP** and fill in the fields:

| Field | Value |
| --- | --- |
| Account Name | Name of the configuration in BC, e.g. `Mailtrap` |
| Sender Type | `Specific User` |
| Email Address | Any valid email address, for example `bc-test@example.com`; the mailbox does not need to exist |
| SMTP Server | `sandbox.smtp.mailtrap.io` — Host from Mailtrap |
| SMTP Server Port | `587` - Port from Mailtrap |
| Authentication | `Basic` |
| User Name | Username from Mailtrap |
| Password | Password from Mailtrap |
| Secure Connection | Enabled |

Use the sandbox SMTP username and password, not your Mailtrap account login.

4. Finish the wizard. Set the account as **Default** if it should handle scenarios without an assigned account. To use it for a specific process, assign the relevant scenario on **Email Scenario Assignment**.

![BC Mailtrap SMTP account settings](/images/bc-mailtrap-smtp-account.png)

## Send a test email

1. On **Email Accounts**, select the Mailtrap account and choose **Send Test Email**.
2. Enter any valid recipient address, for example `recipient@example.com`, and send the message. The mailbox does not need to exist — Mailtrap's sandbox SMTP server captures every message regardless of the recipient address.
3. Open the same sandbox in Mailtrap. The message should appear after a few seconds, with its body and attachments available for inspection.

If sending fails, check the host, port and sandbox credentials. For failed queued messages, open **Email Outbox** in BC and inspect the error.

## Links

- [Mailtrap — Sandbox SMTP integration](https://docs.mailtrap.io/email-sandbox/setup/sandbox-smtp-integration)
- [Microsoft Learn — Set up email in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/admin-how-setup-email)
