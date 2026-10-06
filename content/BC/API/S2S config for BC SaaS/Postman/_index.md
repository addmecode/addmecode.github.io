+++
date = '2026-10-06T00:00:00+02:00'
title = 'Postman'
weight = 40
+++

Postman is an HTTP client for testing APIs. I use it to request an application access token from Microsoft Entra ID, then call the Business Central SaaS API with that token.

Before starting, complete the [App Registration]({{% relref "../App Registration/_index.md" %}}) and [Microsoft Entra Applications in BC]({{% relref "../Microsoft Entra Applications in BC/_index.md" %}}) setup. The examples use the standard BC API v2.0 and require permission to list companies and read customers.

## Create an environment and collection

1. Open the [Postman desktop app](https://www.postman.com/downloads/).
2. Create an environment named `BC API Sandbox` and add the variables below.
3. Select that environment as the active environment.
4. Create a collection named `BC S2S Test` to store the requests.

| Variable | Value | Sensitive |
| --- | --- | --- |
| `tenantId` | Directory (tenant) ID from Entra | No |
| `environment` | Exact BC environment name, for example `Sandbox` or `Dev` | No |
| `clientId` | Application (client) ID from the app registration | No |
| `clientSecret` | Client secret **Value** | Yes |
| `accessToken` | Leave empty; filled after requesting a token | Yes |
| `companyId` | Leave empty; filled after listing companies | No |

Use local values for `clientSecret` and `accessToken` and mark them sensitive. In current Postman versions, variable values are local by default unless you explicitly share them. Marking a variable sensitive masks its display; it does not replace keeping the value local. Do not share or export populated secret/token values. Postman Local Vault is another option for storing the client secret.

![Postman environment variables for the Business Central sandbox](/images/bc-s2s-postman-environment.png)

## Request an Entra access token

1. Add a request named `Get Entra access token` to the collection.
2. Set the method to **POST** and enter this URL:

```http
POST https://login.microsoftonline.com/{{tenantId}}/oauth2/v2.0/token
```

3. In **Authorization**, select **No Auth** for this request. Credentials are sent in the body.
4. In **Body**, select **x-www-form-urlencoded** and add:

| Key | Value |
| --- | --- |
| `grant_type` | `client_credentials` |
| `client_id` | `{{clientId}}` |
| `client_secret` | `{{clientSecret}}` |
| `scope` | `https://api.businesscentral.dynamics.com/.default` |

Postman sets `Content-Type: application/x-www-form-urlencoded` and encodes the form values.

The scope requests the application's consented permissions for the BC resource.

![Postman client credentials token request for Business Central](/images/bc-s2s-postman-token-request.png)

5. Open **Scripts** → **After response** and add this script to save a successful token response. It clears a previous token if the request fails.

```javascript
pm.environment.unset("accessToken");

if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.access_token) {
        pm.environment.set("accessToken", response.access_token);
    }
}
```

![Postman post-response script saving the access token](/images/bc-s2s-postman-token-script.png)

6. Save the request and select **Send**. Expect `200 OK` with a response similar to:

```json
{
  "token_type": "Bearer",
  "expires_in": 3599,
  "access_token": "<access-token>"
}
```

`expires_in` is the token lifetime in seconds; the value above is an example. Client credentials does not return a refresh token. When the access token expires, send this request again to obtain a new one.

## Configure Bearer Token authorization

1. Open the collection's **Authorization** tab.
2. Select **Bearer Token** and enter `{{accessToken}}` in the Token field.
3. For each BC API request, select **Inherit auth from parent**.
4. Keep the token request's authorization set to **No Auth**.

Postman adds the following header to BC API requests:

```http
Authorization: Bearer {{accessToken}}
```

![Postman collection Bearer Token authorization](/images/bc-s2s-postman-bearer-token.png)

## Read the company ID

1. Add a request named `Get companies` to the collection.
2. Set **GET** and use this URL:

```http
GET https://api.businesscentral.dynamics.com/v2.0/{{tenantId}}/{{environment}}/api/v2.0/companies
```

3. **Authorization** should be inherited from parent.
4. Add `Accept: application/json` in **Headers**.
5. Select **Send**. Expect `200 OK` with a `value` array containing companies accessible to the application, for example:

```json
{
  "value": [
    {
      "id": "11111111-2222-3333-4444-555555555555",
      "name": "CRONUS",
      "displayName": "CRONUS"
    }
  ]
}
```

6. Find the intended test company and copy its `id` into the environment variable `companyId`.

![Business Central companies returned in Postman](/images/bc-s2s-postman-companies.png)

![Comapny Id in environment variable](/images/bc-s2s-postman-company-id.png)

## Test a standard API endpoint

1. Add a request named `Get customers` with method **GET**:

```http
GET https://api.businesscentral.dynamics.com/v2.0/{{tenantId}}/{{environment}}/api/v2.0/companies({{companyId}})/customers
```

2. In **Params**, add `$top` = `5` and `$select` = `id,number,displayName`.
3. Use **Inherit auth from parent** and add `Accept: application/json`.
4. Select **Send**. Expect `200 OK` with a `value` array of customer records, or an empty array if the company has no customers.

```json
{
  "value": [
    {
      "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      "number": "10000",
      "displayName": "Example customer"
    }
  ]
}
```

This verifies that the token, environment, company and customer-read permissions work together. `$top` and `$select` limit the response.

![Successful Business Central customers API request in Postman](/images/bc-s2s-postman-customers.png)

## Standard and custom API routes

The token and Bearer Token setup stay the same for a custom API. Its route is defined by the extension's API publisher, group, version and entity set name:

```text
Standard:
https://api.businesscentral.dynamics.com/v2.0/{{tenantId}}/{{environment}}/api/v2.0/companies({{companyId}})/customers

Custom route template — replace the angle-bracket placeholders:
https://api.businesscentral.dynamics.com/v2.0/{{tenantId}}/{{environment}}/api/<publisher>/<group>/<version>/companies({{companyId}})/<entitySetName>
```

The extension must be installed in the target environment, and the app's BC permission sets must cover that custom API. API pages do not need to be published on the **Web Services** page.

## Links

- [Microsoft Learn — Using service-to-service authentication in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication)
- [Postman — Store and reuse values using variables](https://learning.postman.com/docs/sending-requests/variables/variables/)
- [Postman — Write post-response scripts](https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/)
- [Postman — Vault secrets](https://learning.postman.com/docs/sending-requests/postman-vault/postman-vault-secrets/)
