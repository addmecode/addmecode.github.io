+++
date = '2026-10-06T00:00:00+02:00'
title = 'S2S config for BC SaaS'
weight = 10
+++

I use service-to-service (S2S) authentication to connect an integration to Business Central SaaS without signing in a user. The integration authenticates as an application using the OAuth 2.0 **client credentials** flow. Postman lets me test the same flow before using it in a background service or another system.

## What each part does

| Part | What it is | Why it is needed |
| --- | --- | --- |
| Microsoft Entra ID | Microsoft's identity service, with a tenant representing an organization's directory | Authenticates the application and issues an access token for Business Central |
| App registration | A record defining the application's identity, credentials and requested API permissions | Provides the Client ID and credentials used to request a token |
| Microsoft Entra Applications in BC | A Business Central page linking a Client ID to permission sets | Defines what the authenticated application can do in that BC environment and company |
| Postman | An HTTP client for testing APIs | Requests a token from Entra and uses it to call the BC API |

App registration is an identity record, not a server that forwards requests to Business Central.

```text
1. Postman  -- Client ID + client secret --> Microsoft Entra ID
2. Entra    -- access token -------------> Postman
3. Postman  -- Bearer token + API request -> Business Central
4. BC       -- API response -------------> Postman
```

The client secret goes to Entra over HTTPS. Business Central receives the access token, not the secret.

## Before you start

Prepare:

- a Business Central SaaS sandbox and the name of its environment, for example `Sandbox`;
- access to the Entra tenant associated with that Business Central environment;
- permission to register an application and an administrator who can grant consent for its API permissions;
- a BC administrator who can manage **Microsoft Entra Applications** and assign permission sets;
- Postman, preferably the desktop app for this test;
- a test company and permission sets covering the API you want to call.

This example uses a single-tenant app and a temporary client secret. Use a separate app registration for production.

## Set up the connection

Follow these steps in order. Each guide contains the settings for that part of the connection.

| Step | Guide | Expected result |
| --- | --- | --- |
| 1 | [Select the Entra tenant]({{% relref "Entra ID/_index.md" %}}) | You know the correct Directory (tenant) ID |
| 2 | [Register the application]({{% relref "App Registration/_index.md" %}}) | You have a Client ID, a client secret and admin consent for application permission `API.ReadWrite.All` |
| 3 | [Allow the application in BC]({{% relref "Microsoft Entra Applications in BC/_index.md" %}}) | The same Client ID is enabled in the sandbox and has permission sets for the test company |
| 4 | [Configure Postman and request a token]({{% relref "Postman/_index.md" %}}) | Entra returns an `access_token` using `client_credentials` |
| 5 | [Read companies and test the API]({{% relref "Postman/_index.md" %}}#read-the-company-id) | BC returns `200 OK` for an API request covered by the application's permissions |

## Authentication and permissions are separate

Entra authenticates the application. Business Central validates the token and authorizes the application using its local permission sets.

Granting `API.ReadWrite.All` in Entra does not automatically grant full read/write access to BC data. A BC permission set can still limit the application to reading selected data in one company.

Adding the Client ID in BC does not create a permanent BC-to-Entra connection. The configuration is checked when the application sends an API request. A successful token request proves the Entra part works; a successful BC API request verifies the complete setup.

## Links

- [Microsoft Learn — Using service-to-service authentication in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication)
- [Microsoft Learn — OAuth 2.0 client credentials flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
