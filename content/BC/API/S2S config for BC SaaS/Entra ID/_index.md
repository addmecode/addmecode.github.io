+++
date = '2026-10-06T00:00:00+02:00'
title = 'Entra ID'
weight = 10
+++

Microsoft Entra ID is Microsoft's identity service. For a Business Central S2S connection, it authenticates the integration's application and issues an access token. A **tenant** is an organization's directory containing users, applications and identity settings.

## Select the Business Central tenant

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com) and sign in.
2. Check the selected directory. If you have access to multiple directories, use the directory switcher to select the one associated with your Business Central environment.
3. Open **Entra ID** → **Overview**.
4. Copy **Tenant ID**. On an app registration's Overview, the same value is labelled **Directory (tenant) ID**.

| Value | What it identifies | Postman variable |
| --- | --- | --- |
| Tenant ID | The organization's Entra directory | `tenantId` |

The Tenant ID is not the environment name or the company ID. One tenant can have multiple BC environments, and each environment can have multiple companies.

![Tenant ID on the Microsoft Entra ID Overview page](/images/bc-s2s-entra-tenant-overview.png)

## Check who can configure the application

The person creating the app needs permission to register applications in this directory. Tenant settings can restrict this even when the person can sign in to Entra.

Granting admin consent is a separate operation requiring a suitable administrator role. If you can create the app but cannot grant consent, ask your Entra administrator to complete that step.

## Next step

[Create an App Registration]({{% relref "../App Registration/_index.md" %}}) in this tenant. It provides the identity and credentials that Postman will use to request a token.

## Links

- [Microsoft Learn — What is Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)
- [Microsoft Entra admin center](https://entra.microsoft.com)
