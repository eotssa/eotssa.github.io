---
title: Testing.......
categories: 
date: 2024-07-31
tags:
---
## Generate Dynamic Paths

```
=HYPERLINK("C:\Documents\Inventory\Active\" & IF(ISBLANK([@[Date Taken]]), YEAR(TODAY()), YEAR([@[Date Taken]])) & "\" & [@[Size]] & "\" & LEFT([@[Card Number]], FIND(",", [@[Card Number]] & ",")-1), "Open Folder")
```

#### Using relative path
```
=IF(ISBLANK([@[Date Taken]]), "NA", HYPERLINK("Active\" & YEAR([@[Date Taken]]) & "\" & [@[Size]] & "\" & LEFT([@[Card Number]], FIND(",", [@[Card Number]] & ",")-1), "Open Folder"))


```

#### IF WE OPT TO USE 1 SHEET ONLY
```
=IF(ISBLANK([@[Date Taken]]), "NA", 
IF([@[Type]] = "USB", 
HYPERLINK("Active\" & YEAR([@[Date Taken]]) & "\" & [@[Size]] & "\" & LEFT([@[Card Number/Serial Number]], FIND(",", [@[Card Number/Serial Number]] & ",")-1), "Open Folder"), 
HYPERLINK("Active\" & YEAR([@[Date Taken]]) & "\" & [@[Brand]] & " " & [@[Size]] & "\" & LEFT([@[Card Number/Serial Number]], FIND(",", [@[Card Number/Serial Number]] & ",")-1), "Open Folder")))

```
# PDF to Excel; Just for Cards

```
Sub ExtractPDFDataToExcel()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim fso As Object
    Dim folder As Object
    Dim file As Object
    Dim pdfFilePath As String
    Dim Requester As String
    Dim Size As String
    Dim CardNumber As String
    Dim DateTaken As String
    Dim CaseName As String
    Dim Reason As String
    Dim Returnable As String
    Dim QTY As Integer
    Dim cardNumbers() As String
    Dim nextRow As Long
    
    ' Define the folder path
    Dim folderPath As String
    folderPath = "C:\Users\wilso\Desktop\One_Only"
    
    ' Create FileSystemObject
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set folder = fso.GetFolder(folderPath)
    
    ' Find the first PDF file in the folder
    pdfFilePath = ""
    For Each file In folder.Files
        If LCase(fso.GetExtensionName(file.Name)) = "pdf" Then
            pdfFilePath = file.Path
            Exit For
        End If
    Next file
    
    ' Check if a PDF file was found
    If pdfFilePath = "" Then
        MsgBox "No PDF files found in the folder."
        Exit Sub
    End If
    
    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")
    
    ' Open the PDF file
    If AcroAVDoc.Open(pdfFilePath, "") Then
        Set AcroPDDoc = AcroAVDoc.GetPDDoc
        Set AcroForm = AcroPDDoc.GetJSObject
        
        ' Extract field values
        On Error GoTo ErrorHandler
        
        ' Initialize fields to empty strings
        Requester = ""
        Size = ""
        CardNumber = ""
        DateTaken = ""
        CaseName = ""
        Reason = ""
        Returnable = ""
        QTY = 0
        
        ' Check and extract each field value safely
        Requester = GetPDFFieldValue(AcroForm, "First Name") & " " & GetPDFFieldValue(AcroForm, "Last Name")
        Size = GetPDFFieldValue(AcroForm, "Size1")
        CardNumber = GetPDFFieldValue(AcroForm, "DOJ Card NoRow1")
        DateTaken = GetPDFFieldValue(AcroForm, "Date Property Issued")
        CaseName = GetPDFFieldValue(AcroForm, "Case NameUSAO No")
        Reason = GetPDFFieldValue(AcroForm, "Reason")
        Returnable = GetPDFFieldValue(AcroForm, "Returnable")
        
        ' Calculate QTY
        If CardNumber <> "" Then
            cardNumbers = Split(CardNumber, ",")
            QTY = UBound(cardNumbers) + 1
        Else
            QTY = 0
        End If
        
        ' Find the next available row
        With ThisWorkbook.Sheets("Sheet1")
            nextRow = .Cells(.Rows.Count, 1).End(xlUp).Row + 1
        End With
        
        ' Write to Excel
        With ThisWorkbook.Sheets("Sheet1")
            .Cells(nextRow, 1).Value = Requester
            .Cells(nextRow, 2).Value = Size
            .Cells(nextRow, 3).Value = CardNumber
            .Cells(nextRow, 4).Value = DateTaken ' Only DateTaken is Date Property Issued
            .Cells(nextRow, 5).Value = "" ' Follow-Up Date left blank
            .Cells(nextRow, 6).Value = "" ' Date Returned left blank
            .Cells(nextRow, 7).Value = CaseName
            .Cells(nextRow, 8).Value = Reason
            .Cells(nextRow, 9).Value = Returnable
            .Cells(nextRow, 10).Value = "" ' Encryption Password left blank
            .Cells(nextRow, 11).Value = QTY
        End With
        
        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file."
    End If
    
    ' Cleanup
    AcroApp.Exit
    Set AcroForm = Nothing
    Set AcroPDDoc = Nothing
    Set AcroAVDoc = Nothing
    Set AcroApp = Nothing
    Set fso = Nothing
    Set folder = Nothing
    Exit Sub

ErrorHandler:
    MsgBox "An error occurred: " & Err.Description
    If Not AcroAVDoc Is Nothing Then AcroAVDoc.Close True
    If Not AcroApp Is Nothing Then AcroApp.Exit
    Set AcroForm = Nothing
    Set AcroPDDoc = Nothing
    Set AcroAVDoc = Nothing
    Set AcroApp = Nothing
    Set fso = Nothing
    Set folder = Nothing
End Sub

Function GetPDFFieldValue(AcroForm As Object, fieldName As String) As String
    On Error Resume Next
    Dim fieldValue As String
    fieldValue = AcroForm.GetField(fieldName).Value
    If Err.Number <> 0 Then
        fieldValue = ""
        Debug.Print "Field '" & fieldName & "' not found."
    End If
    On Error GoTo 0
    GetPDFFieldValue = fieldValue
End Function


```


## Normalizing for Size Sheets Unchanged Excel Sheet (DOJ CARDS ONLY)

```
Sub ExtractPDFDataToExcel()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim fso As Object
    Dim folder As Object
    Dim file As Object
    Dim pdfFilePath As String
    Dim Requester As String
    Dim size As String
    Dim CardNumber As String
    Dim DateTaken As String
    Dim CaseName As String
    Dim Reason As String
    Dim Returnable As String
    Dim QTY As Integer
    Dim cardNumbers() As String
    Dim nextRow As Long
    Dim ws As Worksheet
    
    ' Define the folder path
    Dim folderPath As String
    folderPath = "C:\Users\wilso\Desktop\One_Only"
    
    ' Create FileSystemObject
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set folder = fso.GetFolder(folderPath)
    
    ' Find the first PDF file in the folder
    pdfFilePath = ""
    For Each file In folder.Files
        If LCase(fso.GetExtensionName(file.Name)) = "pdf" Then
            pdfFilePath = file.Path
            Exit For
        End If
    Next file
    
    ' Check if a PDF file was found
    If pdfFilePath = "" Then
        MsgBox "No PDF files found in the folder."
        Exit Sub
    End If
    
    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")
    
    ' Open the PDF file
    If AcroAVDoc.Open(pdfFilePath, "") Then
        Set AcroPDDoc = AcroAVDoc.GetPDDoc
        Set AcroForm = AcroPDDoc.GetJSObject
        
        ' Extract field values
        On Error GoTo ErrorHandler
        
        ' Initialize fields to empty strings
        Requester = ""
        size = ""
        CardNumber = ""
        DateTaken = ""
        CaseName = ""
        Reason = ""
        Returnable = ""
        QTY = 0
        
        ' Check and extract each field value safely
        Requester = FormatRequester(GetPDFFieldValue(AcroForm, "First Name"), GetPDFFieldValue(AcroForm, "Last Name"))
        size = NormalizeSize(GetPDFFieldValue(AcroForm, "Size1"))
        CardNumber = GetPDFFieldValue(AcroForm, "DOJ Card NoRow1")
        DateTaken = GetPDFFieldValue(AcroForm, "Date Property Issued")
        CaseName = GetPDFFieldValue(AcroForm, "Case NameUSAO No")
        Reason = GetPDFFieldValue(AcroForm, "Reason")
        Returnable = GetPDFFieldValue(AcroForm, "Returnable")
        
        ' Calculate QTY
        If CardNumber <> "" Then
            cardNumbers = Split(CardNumber, ",")
            QTY = UBound(cardNumbers) + 1
        Else
            QTY = 0
        End If
        
        ' Determine the correct sheet based on Size
        Set ws = GetWorksheetBySize(size)
        If ws Is Nothing Then
            MsgBox "No worksheet found for size: " & size
            GoTo Cleanup
        End If
        
        ' Find the next available row
        nextRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
        
        ' Write to the correct sheet
        With ws
            .Cells(nextRow, 1).Value = Requester
            .Cells(nextRow, 2).Value = size
            .Cells(nextRow, 3).Value = CardNumber
            .Cells(nextRow, 4).Value = DateTaken ' Only DateTaken is Date Property Issued
            .Cells(nextRow, 5).Value = "" ' Follow-Up Date left blank
            .Cells(nextRow, 6).Value = "" ' Date Returned left blank
            .Cells(nextRow, 7).Value = CaseName
            .Cells(nextRow, 8).Value = Reason
            .Cells(nextRow, 9).Value = Returnable
            .Cells(nextRow, 10).Value = "" ' Encryption Password left blank
            .Cells(nextRow, 11).Value = QTY
        End With
        
        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file."
    End If
    
Cleanup:
    ' Cleanup
    AcroApp.Exit
    Set AcroForm = Nothing
    Set AcroPDDoc = Nothing
    Set AcroAVDoc = Nothing
    Set AcroApp = Nothing
    Set fso = Nothing
    Set folder = Nothing
    Exit Sub

ErrorHandler:
    MsgBox "An error occurred: " & Err.Description
    If Not AcroAVDoc Is Nothing Then AcroAVDoc.Close True
    If Not AcroApp Is Nothing Then AcroApp.Exit
    Set AcroForm = Nothing
    Set AcroPDDoc = Nothing
    Set AcroAVDoc = Nothing
    Set AcroApp = Nothing
    Set fso = Nothing
    Set folder = Nothing
End Sub

Function GetPDFFieldValue(AcroForm As Object, fieldName As String) As String
    On Error Resume Next
    Dim fieldValue As String
    fieldValue = AcroForm.GetField(fieldName).Value
    If Err.Number <> 0 Then
        fieldValue = ""
        Debug.Print "Field '" & fieldName & "' not found."
    End If
    On Error GoTo 0
    GetPDFFieldValue = fieldValue
End Function

Function NormalizeSize(size As String) As String
    Dim sizeWithoutSpaces As String
    sizeWithoutSpaces = Replace(size, " ", "")
    
    Select Case sizeWithoutSpaces
        Case "16GB"
            NormalizeSize = "16 GB"
        Case "32GB"
            NormalizeSize = "32 GB"
        Case "64GB"
            NormalizeSize = "64 GB"
        ' Add more cases as needed
        Case Else
            NormalizeSize = size ' Return the original size if no match found
    End Select
End Function

Function GetWorksheetBySize(size As String) As Worksheet
    Dim ws As Worksheet
    On Error Resume Next
    Select Case size
        Case "16 GB"
            Set ws = ThisWorkbook.Sheets("16 GB USB Cards")
        Case "32 GB"
            Set ws = ThisWorkbook.Sheets("32 GB USB Cards")
        Case "64 GB"
            Set ws = ThisWorkbook.Sheets("64 GB USB Cards")
        Case "128 GB"
            Set ws = ThisWorkbook.Sheets("128 GB USB Cards")
        Case "256 GB"
            Set ws = ThisWorkbook.Sheets("256 GB USB Cards")
        Case Else
            Set ws = Nothing
    End Select
    On Error GoTo 0
    Set GetWorksheetBySize = ws
End Function

Function FormatRequester(firstName As String, lastName As String) As String
    FormatRequester = UCase(lastName & ", " & firstName)
End Function


```

## Redoing Everything Into One sheet
- Includes serial numbers for external hard drives as well.

```
Sub ExtractPDFDataToExcel()
    Dim AcroApp As Object
    Dim AcroAVDoc As Object
    Dim AcroPDDoc As Object
    Dim AcroForm As Object
    Dim fso As Object
    Dim folder As Object
    Dim file As Object
    Dim pdfFilePath As String
    Dim Requester As String
    Dim MediaType As String
    Dim Brand As String
    Dim size As String
    Dim CardNumber As String
    Dim DateTaken As String
    Dim CaseName As String
    Dim Reason As String
    Dim Returnable As String
    Dim FollowUpDate As String
    Dim DateReturned As String
    Dim EncryptionPassword As String
    Dim QTY As Integer
    Dim cardNumbers() As String
    Dim nextRow As Long
    Dim ws As Worksheet
    
    ' Define the folder path
    Dim folderPath As String
    folderPath = "C:\Users\wilso\Desktop\One_Only"
    
    ' Create FileSystemObject
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set folder = fso.GetFolder(folderPath)
    
    ' Find the first PDF file in the folder
    pdfFilePath = ""
    For Each file In folder.Files
        If LCase(fso.GetExtensionName(file.Name)) = "pdf" Then
            pdfFilePath = file.Path
            Exit For
        End If
    Next file
    
    ' Check if a PDF file was found
    If pdfFilePath = "" Then
        MsgBox "No PDF files found in the folder."
        Exit Sub
    End If
    
    ' Create Acrobat application object
    Set AcroApp = CreateObject("AcroExch.App")
    Set AcroAVDoc = CreateObject("AcroExch.AVDoc")
    
    ' Open the PDF file
    If AcroAVDoc.Open(pdfFilePath, "") Then
        Set AcroPDDoc = AcroAVDoc.GetPDDoc
        Set AcroForm = AcroPDDoc.GetJSObject
        
        ' Extract field values
        On Error GoTo ErrorHandler
        
        ' Initialize fields to empty strings
        Requester = ""
        MediaType = ""
        Brand = ""
        size = ""
        CardNumber = ""
        DateTaken = ""
        CaseName = ""
        Reason = ""
        Returnable = ""
        FollowUpDate = ""
        DateReturned = ""
        EncryptionPassword = ""
        QTY = 0
        
        ' Check and extract each field value safely
        Requester = FormatRequester(GetPDFFieldValue(AcroForm, "First Name"), GetPDFFieldValue(AcroForm, "Last Name"))
        size = NormalizeSize(GetPDFFieldValue(AcroForm, "Size1"))
        DateTaken = GetPDFFieldValue(AcroForm, "Date Property Issued")
        CaseName = GetPDFFieldValue(AcroForm, "Case NameUSAO No")
        Reason = GetPDFFieldValue(AcroForm, "Reason")
        Returnable = GetPDFFieldValue(AcroForm, "Returnable")
        
        ' Determine MediaType and Brand
        If GetPDFFieldValue(AcroForm, "DOJ Card NoRow1") <> "" Then
            MediaType = "USB"
            Brand = "DOJ Card"
            CardNumber = GetPDFFieldValue(AcroForm, "DOJ Card NoRow1")
        ElseIf GetPDFFieldValue(AcroForm, "Serial NoRow1") <> "" Then
            MediaType = "External Hard Drive"
            Brand = GetPDFFieldValue(AcroForm, "MakeRow1")
            CardNumber = GetPDFFieldValue(AcroForm, "Serial NoRow1")
        End If
        
        ' Calculate QTY
        If CardNumber <> "" Then
            cardNumbers = Split(CardNumber, ",")
            QTY = UBound(cardNumbers) + 1
        Else
            QTY = 0
        End If
        
        ' Use a single sheet
        Set ws = ThisWorkbook.Sheets("Sheet1")
        
        ' Find the next available row
        nextRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
        
        ' Format the Card Number/Serial Number column as text to prevent date interpretation
        ws.Cells(nextRow, 6).NumberFormat = "@"
        
        ' Write to the correct sheet
        With ws
            .Cells(nextRow, 1).Value = Requester
            .Cells(nextRow, 2).Value = MediaType
            .Cells(nextRow, 3).Value = Brand
            .Cells(nextRow, 4).Value = size
            .Cells(nextRow, 5).Value = QTY
            .Cells(nextRow, 6).Value = CardNumber
            .Cells(nextRow, 7).Value = CaseName
            .Cells(nextRow, 8).Value = Reason
            .Cells(nextRow, 9).Value = Returnable
            .Cells(nextRow, 10).Value = DateTaken
            .Cells(nextRow, 11).Value = FollowUpDate
            .Cells(nextRow, 12).Value = DateReturned
            .Cells(nextRow, 13).Value = EncryptionPassword
        End With
        
        ' Close the PDF file
        AcroAVDoc.Close True
    Else
        MsgBox "Failed to open the PDF file."
    End If
    
Cleanup:
    ' Cleanup
    AcroApp.Exit
    Set AcroForm = Nothing
    Set AcroPDDoc = Nothing
    Set AcroAVDoc = Nothing
    Set AcroApp = Nothing
    Set fso = Nothing
    Set folder = Nothing
    Exit Sub

ErrorHandler:
    MsgBox "An error occurred: " & Err.Description
    If Not AcroAVDoc Is Nothing Then AcroAVDoc.Close True
    If Not AcroApp Is Nothing Then AcroApp.Exit
    Set AcroForm = Nothing
    Set AcroPDDoc = Nothing
    Set AcroAVDoc = Nothing
    Set AcroApp = Nothing
    Set fso = Nothing
    Set folder = Nothing
End Sub

Function GetPDFFieldValue(AcroForm As Object, fieldName As String) As String
    On Error Resume Next
    Dim fieldValue As String
    fieldValue = AcroForm.GetField(fieldName).Value
    If Err.Number <> 0 Then
        fieldValue = ""
        Debug.Print "Field '" & fieldName & "' not found."
    End If
    On Error GoTo 0
    GetPDFFieldValue = fieldValue
End Function

Function NormalizeSize(size As String) As String
    Dim sizeWithoutSpaces As String
    sizeWithoutSpaces = Replace(size, " ", "")
    
    Select Case sizeWithoutSpaces
        Case "16GB"
            NormalizeSize = "16 GB"
        Case "32GB"
            NormalizeSize = "32 GB"
        Case "64GB"
            NormalizeSize = "64 GB"
        ' Add more cases as needed
        Case "128GB"
            NormalizeSize = "128 GB"
        Case "256GB"
            NormalizeSize = "256 GB"
        Case "512GB"
            NormalizeSize = "512 GB"
        Case "1TB"
            NormalizeSize = "1 TB"
        Case "2TB"
            NormalizeSize = "2 TB"
        Case "4TB"
            NormalizeSize = "4 TB"
        Case Else
            NormalizeSize = size ' Return the original size if no match found
    End Select
End Function

Function FormatRequester(firstName As String, lastName As String) As String
    FormatRequester = UCase(lastName & ", " & firstName)
End Function
```

