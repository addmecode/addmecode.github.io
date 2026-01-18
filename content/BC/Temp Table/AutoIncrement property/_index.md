+++
date = '2026-01-09T21:18:48+01:00'
title = 'AutoIncrement property'
+++

## AutoIncrement property for field on temporary table

> [!INFO]
> Notes based on BC27

AutoIncrement property for field on temporary table doesn't work, however it still compiles.
This does not work because the automatic increment mechanism is handled by SQL, and temporary tables are not stored in SQL.

```al
table 50103 "AMC Dynamic Req Page Fields"
{
    Caption = 'Dynamic Request Page Fields';
    DataClassification = CustomerContent;
    TableType = Temporary; // temporary table

    fields
    {
        field(1; "Entry No."; Integer)
        {
            Caption = 'Entry No.';
            NotBlank = true;
            AutoIncrement = true; // compiles but the entry no is not incremented
        }
    }
}
```

## Workaround
Full solution can be found here: [dynamic-req-page](https://github.com/addmecode/dynamic-req-page)


Remove the AutoIncrement property from the field.
\
In the OnInsert trigger find the last used entry no and increment it manually.
> [!Important]
>The entry no will be incremented only in the temporary table scope

```al
trigger OnInsert()
begin
    this.SetLastEntryNo();
end;

 local procedure SetLastEntryNo()
 var
     DynamicRequestPageMgt: Codeunit "AMC Dynamic Request Page Mgt";
 begin
     DynamicRequestPageMgt.SetLastEntryNoDynamicRequestFields(Rec);
 end;

internal procedure SetLastEntryNoDynamicRequestFields(var DynamicRequestFields: Record "AMC Dynamic Req Page Fields" temporary)
begin
    if DynamicRequestFields."Entry No." <> 0 then
        exit;
    DynamicRequestFields."Entry No." := this.FindLastEntryNoDynamicRequestFields(DynamicRequestFields);
end;

internal procedure FindLastEntryNoDynamicRequestFields(var DynamicRequestFields: Record "AMC Dynamic Req Page Fields" temporary): Integer
var
    LastRec: Record "AMC Dynamic Req Page Fields";
begin
    LastRec.Copy(DynamicRequestFields, true);
    if LastRec.FindLast() then
        exit(LastRec."Entry No." + 1);
    exit(1);
end;
```