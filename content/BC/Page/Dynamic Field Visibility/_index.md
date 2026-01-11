+++
date = '2026-01-09T21:18:48+01:00'
title = 'Dynamic Field Visibility'
+++

## Dynamic Field Visibility in Business Central

> [!INFO]
> Notes based on BC27

### How to Set Field Visibility

The field visibility can be set using a boolean global variable. The variable might be set in `OnOpenPage` or `OnAfterGetRecord` triggers:

![Setting visibility with global variable](/images/dynamic-visibility-field-global-variable.png)

### What Doesn't Work for Setting Visibility

It is not possible to set visibility using:

1. Procedure
![Attempting to use procedure for visibility](/images/dynamic-visibility-field-procedure.png)

2. Array
![Attempting to use array for visibility](/images/dynamic-visibility-field-array.png)

3. List
![Attempting to use list for visibility](/images/dynamic-visibility-field-list.png)

4. Field from the Page Table
> [!WARNING]
> It compiles but throws a runtime error

![Using field from page table - first image](/images/dynamic-visibility-field-error1.png)
![Using field from page table - second image](/images/dynamic-visibility-field-error2.png)

