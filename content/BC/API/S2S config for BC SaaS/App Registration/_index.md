+++
date = '2026-10-06T00:00:00+02:00'
title = 'App Registration'
weight = 20
+++

An app registration defines an application's identity in Microsoft Entra ID. For S2S, the application uses its own credentials rather than a user's login.

## Register the application

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com) in the [tenant associated with BC]({{% relref "../Entra ID/_index.md" %}}).
2. Open **Entra ID** → **App registrations** → **New registration**.
3. Fill in the fields:

| Field | Value |
| --- | --- |
| Name | A descriptive name, for example `BC API - Postman Sandbox` |
| Supported account types | **Accounts in this organizational directory only** — Single tenant |
| Redirect URI | Leave empty |

4. Select **Register**.

![New single-tenant application registration for Business Central](/images/bc-s2s-app-new-registration.png)

## Copy the application identifiers

On the application's **Overview**, copy:

| Field | What it identifies | Postman variable |
| --- | --- | --- |
| Application (client) ID | The application; also entered in BC as Client ID | `clientId` |
| Directory (tenant) ID | The Entra directory issuing the token | `tenantId` |

These IDs are not secrets. **Object ID** is a different identifier and is not used as the Client ID in this setup.

![Client ID and tenant ID on the app registration Overview page](/images/bc-s2s-app-overview.png)

## Add Business Central API permission

1. Open **API permissions** → **Add a permission**.
2. Select **Dynamics 365 Business Central** under **Microsoft APIs**. If it is not listed there, search under **APIs my organization uses**.
3. Choose **Application permissions**, not Delegated permissions.
4. Select `API.ReadWrite.All` and choose **Add permissions**.
5. Select **Grant admin consent for your organization** and confirm using an account authorized to grant consent. The button includes your organization's name.
6. Check that the permission has status **Granted for your organization**.

| Setting | Why it is used |
| --- | --- |
| Application permissions | The integration runs as an application, without a signed-in user |
| `API.ReadWrite.All` | Allows application access to BC APIs and web services, subject to BC permissions |
| Admin consent | Approves the application permission for the organization |

`Automation.ReadWrite.All` is for Business Central automation APIs. It is not needed for the standard `api/v2.0` test in this guide.

![Business Central API application permission with admin consent granted](/images/bc-s2s-app-api-permissions.png)


## Create a temporary client secret

1. Open **Certificates & secrets** → **Client secrets** → **New client secret**.
2. Enter a description, for example `Postman sandbox test`.
3. Choose a short expiry appropriate for the test, using **Custom** if needed and allowed by your tenant's policy.
4. Select **Add**.
5. Immediately copy the secret's **Value** to a local Postman variable named `clientSecret`.

Copy **Value**, not **Secret ID**. The value is displayed only once; if you lose it, create a new secret. The secret proves that the client controls this application's identity.

Keep the value local in Postman and do not share or export it with the environment or collection. For production, prefer a certificate or a supported workload identity federation setup.

![Creating a temporary client secret for the sandbox test](/images/bc-s2s-app-client-secret.png)

## Next step

[Add the application in Business Central]({{% relref "../Microsoft Entra Applications in BC/_index.md" %}}) using its Application (client) ID. Entra's API permission does not replace BC permission sets.

## Links

- [Microsoft Learn — Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [Microsoft Learn — Using service-to-service authentication in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication)
- [Microsoft Learn — OAuth 2.0 client credentials flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
