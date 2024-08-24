---
title: Testing3.......
categories: 
date: 2024-07-31
tags:
---
### TESTING COMPLETE V0.1

```
Sub ExtractPDFDataToExcelAndOrganizeFiles()
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
    Dim existingFolderPath As String
    Dim basePath As String
    Dim subFolderPath As String
    Dim i As Integer
    Const MAX_CARDS As Integer = 25

    ' Define the base path
    basePath = "C:\Users\wilso\Desktop\One_Only\Active\"
    
    ' Create FileSystemObject
    Set fso = CreateObject("Scripting.FileSystemObject")
    
    ' Check if the base path exists
    If Not fso.FolderExists(basePath) Then
        MsgBox "Base path does not exist: " & basePath
        Exit Sub
    End If
    
    ' Find the first PDF file in the folder
    pdfFilePath = ""
    Set folder = fso.GetFolder("C:\Users\wilso\Desktop\One_Only")
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
        size = NormalizeSize(GetPDFFieldValue(AcroForm, "SizeRow1"))
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
        
        ' Check if cardNumbers array is populated
        If QTY = 0 Then
            MsgBox "No valid card numbers found."
            GoTo Cleanup
        End If
        
        ' Limit the number of card numbers processed
        If QTY > MAX_CARDS Then
            MsgBox "Too many card numbers to process. Limit is " & MAX_CARDS
            GoTo Cleanup
        End If
        
        ' Determine the correct worksheet based on MediaType and size
        If MediaType = "USB" Then
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
                    MsgBox "Unknown size for USB: " & size
                    GoTo Cleanup
            End Select
        ElseIf MediaType = "External Hard Drive" Then
            Set ws = ThisWorkbook.Sheets("External")
        Else
            MsgBox "Unknown MediaType: " & MediaType
            GoTo Cleanup
        End If
        
        ' Iterate over each card number and write each to a new row
        For i = LBound(cardNumbers) To UBound(cardNumbers)
            nextRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
            
            ' Format the Card Number/Serial Number column as text to prevent date interpretation
            ws.Cells(nextRow, 6).NumberFormat = "@"
            
            ' Write to the correct sheet
            With ws
                .Cells(nextRow, 1).Value = Requester
                .Cells(nextRow, 2).Value = MediaType
                .Cells(nextRow, 3).Value = Brand
                .Cells(nextRow, 4).Value = size
                .Cells(nextRow, 5).Value = 1 ' Each card number gets its own row, so quantity is 1
                .Cells(nextRow, 6).Value = cardNumbers(i)
                .Cells(nextRow, 7).Value = CaseName
                .Cells(nextRow, 8).Value = Reason
                .Cells(nextRow, 9).Value = Returnable
                .Cells(nextRow, 10).Value = DateTaken
                .Cells(nextRow, 11).Value = FollowUpDate
                .Cells(nextRow, 12).Value = DateReturned
                .Cells(nextRow, 13).Value = EncryptionPassword
            End With
            
            ' Inform user that the Excel line has been written
            If MsgBox("Excel line written for card number " & cardNumbers(i) & ". Press OK to continue or Cancel to abort.", vbOKCancel + vbInformation, "Action Required") = vbCancel Then GoTo Cleanup
            
            ' Determine existing folder path
            If MediaType = "USB" Then
                existingFolderPath = basePath & size & " USB Cards"
            ElseIf MediaType = "External Hard Drive" Then
                existingFolderPath = basePath & size & " " & Brand
            End If
            
            ' Check if the existing folder path exists
            If Not fso.FolderExists(existingFolderPath) Then
                MsgBox "Error: Folder does not exist - " & existingFolderPath
                GoTo Cleanup
            End If
            
            subFolderPath = existingFolderPath & "\" & cardNumbers(i)
            
            ' Check if the subfolder exists
            If Not fso.FolderExists(subFolderPath) Then
                fso.CreateFolder subFolderPath
                ' Inform user that the folder has been created
                If MsgBox("Folder created: " & subFolderPath & ". Press OK to continue or Cancel to abort.", vbOKCancel + vbInformation, "Action Required") = vbCancel Then GoTo Cleanup
            Else
                ' Check if a PDF file with the same name already exists
                If fso.FileExists(subFolderPath & "\" & fso.GetFileName(pdfFilePath)) Then
                    MsgBox "Error: A PDF file with the same name already exists in the folder - " & subFolderPath
                    GoTo Cleanup
                End If
            End If
            
            ' Copy the PDF file to the new folder
            fso.CopyFile pdfFilePath, subFolderPath & "\" & fso.GetFileName(pdfFilePath)
            ' Inform user that the PDF file has been copied
            If MsgBox("Copied PDF file to: " & subFolderPath & ". Press OK to continue or Cancel to abort.", vbOKCancel + vbInformation, "Action Required") = vbCancel Then GoTo Cleanup
        Next i
        
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
    Exit Sub
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