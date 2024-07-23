---
title: Extract All Emails
categories: 
date: 2024-07-22
tags:
  - Python
---
# 1. Use this to extract all emails from a date range.

```
Sub ExportEmailsToExcelByDateRange()
    Dim olNs As Outlook.NameSpace
    Dim olFolder As Outlook.Folder
    Dim olItems As Outlook.Items
    Dim olMail As Object
    Dim filteredItems As Outlook.Items
    Dim i As Long
    Dim mailDate As Date
    
    ' Excel variables
    Dim xlApp As Object
    Dim xlBook As Object
    Dim xlSheet As Object
    Dim row As Long
    Dim savePath As String
    
    ' Date range variables
    Dim startDate As Date
    Dim endDate As Date

    ' Define the start and end dates for the period
    startDate = DateValue("01/01/2024")
    endDate = DateValue("07/22/2024")
    
    ' Initialize Excel
    Set xlApp = CreateObject("Excel.Application")
    Set xlBook = xlApp.Workbooks.Add
    Set xlSheet = xlBook.Sheets(1)

    ' Add headers to Excel sheet
    xlSheet.Cells(1, 1).Value = "Subject"
    xlSheet.Cells(1, 2).Value = "Received Time"
    xlSheet.Cells(1, 3).Value = "Sender Name"
    xlSheet.Cells(1, 4).Value = "Sender Email"
    
    row = 2 ' Start writing data from the second row

    Set olNs = Application.GetNamespace("MAPI")
    
    ' Set the folder to the default inbox or a specific folder
    ' For default inbox:
    ' Set olFolder = olNs.GetDefaultFolder(olFolderInbox)
    
    ' For a specific folder:
    Set olFolder = olNs.Folders("wilsonwu97@outlook.com").Folders("Inbox")

    ' Get items in the folder within the specified date range
    Set olItems = olFolder.Items
    Set filteredItems = olItems.Restrict("[ReceivedTime] >= '" & Format(startDate, "yyyy/mm/dd") & "' AND [ReceivedTime] <= '" & Format(endDate + 1, "yyyy/mm/dd") & "'")
    filteredItems.Sort "[ReceivedTime]", True ' Sort by received time in descending order

    ' Loop through each item in the filtered items
    For i = 1 To filteredItems.Count
        Set olMail = filteredItems.Item(i)
        
        ' Ensure the item is a mail item before processing
        If TypeOf olMail Is Outlook.MailItem Then
            mailDate = olMail.ReceivedTime

            ' Write to Excel
            xlSheet.Cells(row, 1).Value = olMail.Subject
            xlSheet.Cells(row, 2).Value = olMail.ReceivedTime
            xlSheet.Cells(row, 3).Value = olMail.SenderName
            xlSheet.Cells(row, 4).Value = olMail.SenderEmailAddress
            row = row + 1
        End If
    Next i
    
    ' Define the save path
    savePath = Environ("USERPROFILE") & "\Desktop\Emails_" & Format(startDate, "yyyymmdd") & "_to_" & Format(endDate, "yyyymmdd") & ".xlsx"
    
    ' Save and close the Excel file
    xlBook.SaveAs savePath
    xlBook.Close SaveChanges:=True
    xlApp.Quit

    ' Clean up
    Set xlSheet = Nothing
    Set xlBook = Nothing
    Set xlApp = Nothing

    MsgBox "Email information has been exported to " & savePath
End Sub


```

# Step 2: Create the necessary rows and filters.

1. Week Number 
```
=WEEKNUM(B4)
```

2. Received
```
=MOD(B2, 1)
```

Then format > Time > Select Time.
Optional: Add a custom filter to sort >= 0.708333

3. Day of Week
```
=TEXT(B2, "DDD")
```

4. After Hours
```
=IF(AND(TEXT(B2, "HH:MM:SS") >= "17:00:00", TEXT(B2, "DDD") <> "Sat", TEXT(B2, "DDD") <> "Sun"), "Yes", "No")
```

5. Create a isWeekend

```
=IF(OR(TEXT(B2, "DDD") = "Sat", TEXT(B2, "DDD") = "Sun"), "Yes", "No")
```

7. Create Pivot Tables



# Sum of Both

```
Weeks
=IFERROR(VLOOKUP(A2, 'After Hours'!A:B, 2, FALSE), 0)
=IFERROR(VLOOKUP(A2, Weekends!A:B, 2, FALSE), 0)
=B2 + C2

```