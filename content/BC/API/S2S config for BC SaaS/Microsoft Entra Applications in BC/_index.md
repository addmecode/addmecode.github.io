+++
date = '2026-10-06T00:00:00+02:00'
title = 'Microsoft Entra Applications in BC'
weight = 30
+++

The **Microsoft Entra Applications** page in Business Central connects an Entra application's Client ID to BC permission sets. Entra confirms the application's identity; this BC record controls what that application can access in the environment.

## Add the application to the sandbox

1. Open the Business Central SaaS sandbox you want to test.
2. Search for **Microsoft Entra Applications** using Tell Me (`Alt+Q`).
3. Select **New** and fill in the fields:

| Field | Value |
| --- | --- |
| Client ID | **Application (client) ID** from your [App Registration]({{% relref "../App Registration/_index.md" %}}) |
| Description | A descriptive name, for example `BC API - Postman Sandbox` |
| State | `Enabled` |

4. Save the record.

![Enabled Microsoft Entra application in Business Central](/images/bc-s2s-bc-application-card.png)

## Assign permission sets

1. On the application card, open the permission-set assignment section or action.
2. Add the permission sets required by the API being tested. For a custom API, use the dedicated integration permission set supplied with the extension, if available.
3. In the **Company** field, select the test company. An empty Company normally applies the assignment to all companies; use a specific company when the integration only needs that company's data.
4. Save the assignments.

There is no single permission set suitable for every API. For the standard [Postman test]({{% relref "../Postman/_index.md" %}}), ask the BC administrator to assign or prepare a dedicated set covering these operations:

| Test | Required access |
| --- | --- |
| List companies | Execute the companies API page and read the company data exposed by it |
| Read customers | Execute the customers API page and read Customer data in the test company |
| Runtime dependencies | Permissions required by the API implementation and any installed extensions that run during the request |

If a dedicated set does not exist, create it under **Permission Sets** → **New**, for example `BC API TEST`, and use **Permissions** to define the required object access. Object names and IDs must match the API implementation installed in your environment. Reading API data can require both execution of the API page and read access to its underlying tables.

Keep permissions limited to the operations you actually need. Applications cannot be assigned `SUPER`. If an API reports a missing object permission, inspect that dependency and update the dedicated set rather than adding unrelated broad permissions.

## Consent and connection testing

In this guide, admin consent is granted in Entra during app registration. You do not need to run **Grant Consent** in BC as well. The BC consent wizard is an alternative path with its own redirect URI requirements.

Adding this record does not open a persistent connection to Entra. BC checks the token and applies these permissions when it receives an API request. Configure the app in each BC environment where it needs access; the sandbox record does not authorize it in production.

## Next step

[Configure Postman]({{% relref "../Postman/_index.md" %}}), obtain an access token and make an API request. A successful token request alone does not verify the BC permission assignment.

## Links

- [Microsoft Learn — Set up the Microsoft Entra application in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication#task-2-set-up-the-microsoft-entra-application-in-business-central)
- [Microsoft Learn — Assign permissions to users and groups](https://learn.microsoft.com/en-us/dynamics365/business-central/ui-define-granular-permissions)
