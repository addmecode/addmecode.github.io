+++
date = '2026-01-15T22:30:00+01:00'
title = 'Isolated Storage'
+++

Isolated storage in Business Central is a secure key/value store for small, sensitive data such as API keys. It keeps secrets out of tables, supports encryption when it is enabled, and scopes data with **DataScope** (for example, Module or Company) via the **IsolatedStorage** and **SecretText**.

## Links
- [ms learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-isolated-storage)
- [businesscentralgeek](https://businesscentralgeek.com/how-to-use-isolated-storage-in-business-central)
- [demiliani](https://demiliani.com/2024/01/02/dynamics-365-business-central-isolated-storage-and-secrettext-support/)
- [vld](https://vld-bc.com/blog/how-to-use-isolated-storage)
- [fredborg](https://fredborg.org/?p=1382)

## Use case
Full use case can be found here: [ui-translations-bc](https://github.com/addmecode/ui-translations-bc)

### Example help functions
```al
internal procedure SetApiKey(NewApiKey: SecretText)
var
    OverwriteApiKeyQst: Label 'The Api key is already set. Do you want to overwrite it?';
begin
    if this.IsApiKeySet() and GuiAllowed() then
        if not Confirm(OverwriteApiKeyQst) then
            exit;

    if EncryptionEnabled() then
        IsolatedStorage.SetEncrypted(this.GetStorageKey(), NewApiKey, DataScope::Module)
    else
        IsolatedStorage.Set(this.GetStorageKey(), NewApiKey, DataScope::Module);
end;

internal procedure GetApiKey(): SecretText
var
    ApiKey: SecretText;
begin
    IsolatedStorage.Get(this.GetStorageKey(), DataScope::Module, ApiKey);
    exit(ApiKey);
end;

internal procedure IsApiKeySet(): Boolean
begin
    exit(IsolatedStorage.Contains(this.GetStorageKey(), DataScope::Module));
end;

local procedure GetStorageKey(): Text
begin
    exit('whatever-describes-your-key-or-guid'); //i.e. deepl-api-key
end;
```
### Example setup page

> [!WARNING]
> It is not possible to use secured text for variable displayed as a field on the page. Therefore the variable should be marked as NonDebuggable.

```al
page 50104 "AMC DeepL Setup"
{
    ApplicationArea = All;
    Caption = 'DeepL Setup';
    DeleteAllowed = false;
    InsertAllowed = false;
    PageType = Card;
    SourceTable = "AMC DeepL Setup";
    UsageCategory = Administration;

    layout
    {
        area(Content)
        {
            group(General)
            {
                Caption = 'General';

                field("Base Url"; Rec."Base Url")
                {
                    ApplicationArea = Basic, Suite;
                    ToolTip = 'Specifies the value of the Base Url field.', Comment = '%';
                }
                field("API Key"; this.ApiKey)
                {
                    ApplicationArea = Basic, Suite;
                    Caption = 'API Key';
                    ExtendedDatatype = Masked;
                    ToolTip = 'Specifies the value of the API Key.', Comment = '%';

                    trigger OnValidate()
                    begin
                        Rec.SetApiKey(this.ApiKey);
                    end;
                }
            }
        }
    }

    trigger OnOpenPage()
    begin
        if not Rec.Get() then begin
            Rec.Init();
            Rec.Insert();
        end;
        if Rec.IsApiKeySet() then
            this.ApiKey := '****';
    end;

    var
        [NonDebuggable]
        ApiKey: Text;
}
```

### Example usage
```al
local procedure PostDeepL(var Response: HttpResponseMessage; BodyText: Text)
var
    DeepLSetup: Record "AMC DeepL Setup";
    Client: HttpClient;
    Content: HttpContent;
    ContentHeaders: HttpHeaders;
    ApiKeyPrefixTxt: Label 'DeepL-Auth-Key %1', Locked = true;
    DeepLSetupNotFoundErr: Label 'DeepL Setup is not configured. Open the DeepL Setup page and enter the API key and base URL.';
    PostErr: Label 'DeepL error (%1 %2): %3', Comment = '%1 is Response Http Status Code, %2 is Response Reason Phrase, %3 is Response body';
    Url: Text;
begin
    if not DeepLSetup.Get() then
        Error(DeepLSetupNotFoundErr);
    Url := DeepLSetup."Base Url" + '/translate';

    Content.GetHeaders(ContentHeaders);
    Content.WriteFrom(BodyText);
    ContentHeaders.Remove('Content-Type');
    ContentHeaders.Add('Content-Type', 'application/json');
    Client.Clear();
    Client.DefaultRequestHeaders().Add('Authorization', SecretStrSubstNo(ApiKeyPrefixTxt, DeepLSetup.GetApiKey()));
    Client.DefaultRequestHeaders().Add('Accept', 'application/json');
    Client.Post(Url, Content, Response);

    if not Response.IsSuccessStatusCode() then begin
        Response.Content.ReadAs(BodyText);
        Error(PostErr, Response.HttpStatusCode, Response.ReasonPhrase, BodyText);
    end;
end;
```