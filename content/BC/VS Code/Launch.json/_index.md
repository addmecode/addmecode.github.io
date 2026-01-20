+++
date = '2026-01-20T22:00:00+01:00'
title = 'Launch.json'
+++

Useful properties for the .vscode/launch.json

## breakOnError
When you run the debugger, it immediately stops at this line:
![Azure AD App Setup Error](/images/azure-ad-app-setup-error.png)


To avoid this frustrating behavior, set the breakOnError property to ExcludeTry. After that, the debugger will no longer stop on errors inside the TryFunction.

```json
"breakOnError": "ExcludeTry"
```