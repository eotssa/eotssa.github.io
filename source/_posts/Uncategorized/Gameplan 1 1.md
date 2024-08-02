---
title: Testing...
categories: 
date: 2024-07-28
tags:
---
Excel > VBA Editor > - - Check `Adobe Acrobat xx.0 Type Library` (where xx is your version number).

```
Sub ExtractPDFFormData()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim Field As Object
    Dim FieldName As String
    Dim FieldValue As String
    Dim FilePath As String
    Dim i As Integer
    
    ' Path to the PDF file
    FilePath = "C:\path\to\your\file.pdf"
    
    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")
    
    ' Create AVDoc object
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")
    
    ' Open the PDF file
    If AcroAVDoc.Open(FilePath, "") = True Then
        ' Set the PDDoc object
        Set AcroPDDoc = AcroAVDoc.GetPDDoc
        
        ' Get the form fields
        Set AcroForm = AcroPDDoc.GetJSObject
        
        ' List of field names
        Dim FieldNames As Variant
        FieldNames = Array("FirstName", "LastName", "Email", "PhoneNumber")
        
        ' Loop through each field name
        For i = LBound(FieldNames) To UBound(FieldNames)
            FieldName = FieldNames(i)
            FieldValue = AcroForm.getField(FieldName).value
            
            ' Write the field value to Excel (e.g., Column A for field names, Column B for field values)
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 1).Value = FieldName
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 2).Value = FieldValue
        Next i
        
        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file.", vbExclamation
    End If
    
    ' Close Acrobat application
    AcroApp.Exit
    Set AcroAVDoc = Nothing
    Set AcroPDDoc = Nothing
    Set AcroApp = Nothing
End Sub

```

- **FilePath:** Replace `"C:\path\to\your\file.pdf"` with the path to your PDF file.
- **AcroExch.App and AcroExch.AVDoc:** These objects are used to interact with Adobe Acrobat.
- **AcroPDDoc:** This object represents the PDF document.
- **AcroHiliteList:** This object is used to extract text from the PDF.
- The script loops through each page of the PDF, extracts the text, and writes it to the first column of an Excel sheet.

## 1. - The script will look for any PDF file in the specified folder and process it regardless of its name.

- **Place your PDF file in this folder. Ensure only one PDF file is in the folder at a time for this script to work correctly.**

```
Sub ExtractPDFFormData()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim FieldName As String
    Dim FieldValue As String
    Dim FolderPath As String
    Dim FilePath As String
    Dim FileName As String
    Dim i As Integer
    Dim FieldNames As Variant

    ' Folder where the PDF file will be placed
    FolderPath = "C:\PDFtoExcel\"

    ' Get the first PDF file in the folder
    FileName = Dir(FolderPath & "*.pdf")

    ' Check if there is a PDF file in the folder
    If FileName = "" Then
        MsgBox "No PDF file found in the folder.", vbExclamation
        Exit Sub
    End If

    ' Full path to the PDF file
    FilePath = FolderPath & FileName

    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")

    ' Create AVDoc object
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")

    ' Open the PDF file
    If AcroAVDoc.Open(FilePath, "") = True Then
        ' Set the PDDoc object
        Set AcroPDDoc = AcroAVDoc.GetPDDoc

        ' Get the form fields
        Set AcroForm = AcroPDDoc.GetJSObject

        ' List of field names (customize this according to your PDF form)
        FieldNames = Array("FirstName", "LastName", "Email", "PhoneNumber")

        ' Loop through each field name
        For i = LBound(FieldNames) To UBound(FieldNames)
            FieldName = FieldNames(i)
            FieldValue = AcroForm.getField(FieldName).value

            ' Write the field value to Excel (e.g., Column A for field names, Column B for field values)
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 1).Value = FieldName
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 2).Value = FieldValue
        Next i

        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file.", vbExclamation
    End If

    ' Close Acrobat application
    AcroApp.Exit
    Set AcroAVDoc = Nothing
    Set AcroPDDoc = Nothing
    Set AcroApp = Nothing
End Sub

```

---


CHECKBOXES

```
Sub ExtractPDFFormData()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim FieldName As String
    Dim FieldValue As String
    Dim FolderPath As String
    Dim FilePath As String
    Dim FileName As String
    Dim i As Integer
    Dim FieldNames As Variant
    Dim CheckBoxNames As Variant
    Dim LastRow As Integer

    ' Folder where the PDF file will be placed
    FolderPath = "C:\PDFtoExcel\"

    ' Get the first PDF file in the folder
    FileName = Dir(FolderPath & "*.pdf")

    ' Check if there is a PDF file in the folder
    If FileName = "" Then
        MsgBox "No PDF file found in the folder.", vbExclamation
        Exit Sub
    End If

    ' Full path to the PDF file
    FilePath = FolderPath & FileName

    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")

    ' Create AVDoc object
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")

    ' Open the PDF file
    If AcroAVDoc.Open(FilePath, "") = True Then
        ' Set the PDDoc object
        Set AcroPDDoc = AcroAVDoc.GetPDDoc

        ' Get the form fields
        Set AcroForm = AcroPDDoc.GetJSObject

        ' List of field names (customize this according to your PDF form)
        FieldNames = Array("FirstName", "LastName", "Email", "PhoneNumber")

        ' List of checkbox field names
        CheckBoxNames = Array("CheckA", "CheckB", "CheckC")

        ' Loop through each field name
        For i = LBound(FieldNames) To UBound(FieldNames)
            FieldName = FieldNames(i)
            FieldValue = AcroForm.getField(FieldName).value

            ' Write the field value to Excel (e.g., Column A for field names, Column B for field values)
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 1).Value = FieldName
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 2).Value = FieldValue
        Next i

        ' Find the last row to start writing checkboxes
        LastRow = UBound(FieldNames) + 2

        ' Loop through each checkbox field name
        For i = LBound(CheckBoxNames) To UBound(CheckBoxNames)
            FieldName = CheckBoxNames(i)
            FieldValue = AcroForm.getField(FieldName).value

            ' Determine if the checkbox is checked or not
            If FieldValue = "Yes" Then
                ' Write the checkbox name to Excel if it is checked
                ThisWorkbook.Sheets("Sheet1").Cells(LastRow, 1).Value = FieldName
                ThisWorkbook.Sheets("Sheet1").Cells(LastRow, 2).Value = "Checked"
                LastRow = LastRow + 1
            End If
        Next i

        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file.", vbExclamation
    End If

    ' Close Acrobat application
    AcroApp.Exit
    Set AcroAVDoc = Nothing
    Set AcroPDDoc = Nothing
    Set AcroApp = Nothing
End Sub

```

---

TWO separate sections of checkboxes

```
Sub ExtractPDFFormData()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim FieldName As String
    Dim FieldValue As String
    Dim FolderPath As String
    Dim FilePath As String
    Dim FileName As String
    Dim i As Integer
    Dim FieldNames As Variant
    Dim CheckBoxNamesSection1 As Variant
    Dim CheckBoxNamesSection2 As Variant
    Dim LastRow As Integer

    ' Folder where the PDF file will be placed
    FolderPath = "C:\PDFtoExcel\"

    ' Get the first PDF file in the folder
    FileName = Dir(FolderPath & "*.pdf")

    ' Check if there is a PDF file in the folder
    If FileName = "" Then
        MsgBox "No PDF file found in the folder.", vbExclamation
        Exit Sub
    End If

    ' Full path to the PDF file
    FilePath = FolderPath & FileName

    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")

    ' Create AVDoc object
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")

    ' Open the PDF file
    If AcroAVDoc.Open(FilePath, "") = True Then
        ' Set the PDDoc object
        Set AcroPDDoc = AcroAVDoc.GetPDDoc

        ' Get the form fields
        Set AcroForm = AcroPDDoc.GetJSObject

        ' List of field names (customize this according to your PDF form)
        FieldNames = Array("FirstName", "LastName", "Email", "PhoneNumber")

        ' List of checkbox field names for Section 1
        CheckBoxNamesSection1 = Array("CheckA1", "CheckB1", "CheckC1")

        ' List of checkbox field names for Section 2
        CheckBoxNamesSection2 = Array("CheckA2", "CheckB2", "CheckC2")

        ' Loop through each field name
        For i = LBound(FieldNames) To UBound(FieldNames)
            FieldName = FieldNames(i)
            FieldValue = AcroForm.getField(FieldName).value

            ' Write the field value to Excel (e.g., Column A for field names, Column B for field values)
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 1).Value = FieldName
            ThisWorkbook.Sheets("Sheet1").Cells(i + 1, 2).Value = FieldValue
        Next i

        ' Find the last row to start writing checkboxes
        LastRow = UBound(FieldNames) + 2

        ' Loop through each checkbox field name in Section 1
        For i = LBound(CheckBoxNamesSection1) To UBound(CheckBoxNamesSection1)
            FieldName = CheckBoxNamesSection1(i)
            FieldValue = AcroForm.getField(FieldName).value

            ' Determine if the checkbox is checked or not
            If FieldValue = "Yes" Then
                ' Write the checkbox name to Excel if it is checked
                ThisWorkbook.Sheets("Sheet1").Cells(LastRow, 1).Value = FieldName
                ThisWorkbook.Sheets("Sheet1").Cells(LastRow, 2).Value = "Checked"
                LastRow = LastRow + 1
            End If
        Next i

        ' Add a blank row to separate sections
        LastRow = LastRow + 1

        ' Loop through each checkbox field name in Section 2
        For i = LBound(CheckBoxNamesSection2) To UBound(CheckBoxNamesSection2)
            FieldName = CheckBoxNamesSection2(i)
            FieldValue = AcroForm.getField(FieldName).value

            ' Determine if the checkbox is checked or not
            If FieldValue = "Yes" Then
                ' Write the checkbox name to Excel if it is checked
                ThisWorkbook.Sheets("Sheet1").Cells(LastRow, 1).Value = FieldName
                ThisWorkbook.Sheets("Sheet1").Cells(LastRow, 2).Value = "Checked"
                LastRow = LastRow + 1
            End If
        Next i

        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file.", vbExclamation
    End If

    ' Close Acrobat application
    AcroApp.Exit
    Set AcroAVDoc = Nothing
    Set AcroPDDoc = Nothing
    Set AcroApp = Nothing
End Sub

```


### Explanation:

- **CheckBoxNamesSection1:** Array containing the names of checkboxes in the first section.
- **CheckBoxNamesSection2:** Array containing the names of checkboxes in the second section.
- **Writing Checkbox Status to Excel:** The script writes the checkbox names to Excel if they are checked. It separates the two sections with a blank row for clarity.

### Steps to Use:

1. **Identify Checkbox Field Names:** Ensure you know the exact names of the checkbox fields in each section of your PDF.
2. **Update Field Names:** Update `FieldNames`, `CheckBoxNamesSection1`, and `CheckBoxNamesSection2` arrays with the appropriate field names from your PDF.
3. **Run the VBA Script:** The script will extract data from both text fields and checkboxes in both sections, and then write the information to the specified cells in the Excel sheet.

By following these steps, the script will handle checkboxes in multiple sections of your PDF form and ensure the extracted data accurately reflects in your Excel sheet, with a clear separation between the sections.