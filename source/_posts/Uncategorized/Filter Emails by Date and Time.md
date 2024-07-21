---
title: Filter Emails by Date and Time
categories: 
date: 2024-07-21
tags:
  - Python
---
Outlook can only natively search for date ranges and cannot natively also specify time. 

If you want to sort by date and time, this VBA script works well.

```
Sub FilterEmails()
    Dim olNs As Outlook.Namespace
    Dim olFolder As Outlook.Folder
    Dim olItems As Outlook.Items
    Dim olMail As Outlook.MailItem
    Dim filteredItems As Outlook.Items
    Dim i As Long
    Dim startDate As Date
    Dim endDate As Date
    Dim mailDate As Date
    Dim startTime As Date
    Dim endTime As Date

    ' Define the date and time range
    startDate = DateValue("01/01/2024")
    endDate = DateValue("01/05/2024")
    startTime = TimeValue("17:30:00")
    endTime = TimeValue("23:59:59")

    Set olNs = Application.GetNamespace("MAPI")
    Set olFolder = olNs.GetDefaultFolder(olFolderInbox)
    Set olItems = olFolder.Items

    ' Filter items by date range
    Set filteredItems = olItems.Restrict("[ReceivedTime] >= '" & startDate & "' AND [ReceivedTime] <= '" & endDate & "'")

    For i = filteredItems.Count To 1 Step -1
        Set olMail = filteredItems.Item(i)
        mailDate = olMail.ReceivedTime

        ' Check if the email was received on a weekday within the specified time range
        If Weekday(mailDate, vbMonday) <= 5 Then
            If TimeValue(mailDate) >= startTime And TimeValue(mailDate) <= endTime Then
                ' Do something with the filtered email
                Debug.Print olMail.Subject & " - " & olMail.ReceivedTime
            Else
                filteredItems.Remove i
            End If
        Else
            filteredItems.Remove i
        End If
    Next i

    MsgBox "Filtered " & filteredItems.Count & " emails within the specified date and time range."
End Sub

```


We can take it a step further and define a greater time range. This specific script ignores weekends and only filters emails on weekdays that occur after 5:30PM.

```
Sub FilterAfterHoursEmailsByWeek()
    Dim olNs As Outlook.NameSpace
    Dim olFolder As Outlook.Folder
    Dim olItems As Outlook.Items
    Dim olMail As Object
    Dim filteredItems As Outlook.Items
    Dim afterHoursItems As New Collection
    Dim i As Long
    Dim startDate As Date
    Dim endDate As Date
    Dim mailDate As Date
    Dim startTime As Date
    Dim endTime As Date
    Dim weekStartDate As Date
    Dim weekEndDate As Date
    Dim itemCount As Long

    ' Define the time range
    startTime = TimeValue("17:30:00") ' 5:30 PM
    endTime = TimeValue("23:59:59") ' 11:59 PM

    ' Define the start and end dates for the entire period
    startDate = DateValue("01/01/2024")
    endDate = DateValue("04/28/2024")

    Set olNs = Application.GetNamespace("MAPI")
    
    ' Set the folder to the default inbox or a specific folder
    ' For default inbox:
    ' Set olFolder = olNs.GetDefaultFolder(olFolderInbox)
    
    ' For a specific folder:
    Set olFolder = olNs.Folders("ENTER EMAIL HERE@OUTLOOK>.COM").Folders("FOLDER_NAME_HERE")

    ' Loop through each week
    weekStartDate = startDate
    Do While weekStartDate <= endDate
        weekEndDate = weekStartDate + 4 ' Weekdays only (Monday to Friday)
        
        ' Filter items by date range for the current week
        Set olItems = olFolder.Items
        Set filteredItems = olItems.Restrict("[ReceivedTime] >= '" & Format(weekStartDate, "yyyy/mm/dd") & "' AND [ReceivedTime] < '" & Format(weekEndDate + 1, "yyyy/mm/dd") & "'")

        ' Clear the afterHoursItems collection
        Set afterHoursItems = New Collection

        Debug.Print "Week Start Date: " & weekStartDate
        Debug.Print "Week End Date: " & weekEndDate
        Debug.Print "Total Filtered Items: " & filteredItems.Count

        For i = 1 To filteredItems.Count
            Set olMail = filteredItems.Item(i)
            
            ' Ensure the item is a mail item before processing
            If TypeOf olMail Is Outlook.MailItem Then
                mailDate = olMail.ReceivedTime

                ' Debugging step to verify email received times
                Debug.Print "Email: " & olMail.Subject & " - " & olMail.ReceivedTime

                ' Check if the email was received on a weekday within the specified time range
                If Weekday(mailDate, vbMonday) <= 5 Then
                    If TimeValue(mailDate) >= startTime And TimeValue(mailDate) <= endTime Then
                        afterHoursItems.Add olMail
                    End If
                End If
            End If
        Next i

        ' Display the count of filtered emails for the current week
        itemCount = afterHoursItems.Count
        MsgBox "Filtered " & itemCount & " emails for the week starting " & weekStartDate & "."

        ' Move to the next week
        weekStartDate = weekStartDate + 7
    Loop
End Sub


```

We can specify the storage path as follows as well as include the sender's actual email address

```
Sub FilterAfterHoursEmailsByWeek()
    Dim olNs As Outlook.Namespace
    Dim olFolder As Outlook.Folder
    Dim olItems As Outlook.Items
    Dim olMail As Object
    Dim filteredItems As Outlook.Items
    Dim afterHoursItems As New Collection
    Dim i As Long
    Dim startDate As Date
    Dim endDate As Date
    Dim mailDate As Date
    Dim startTime As Date
    Dim endTime As Date
    Dim weekStartDate As Date
    Dim weekEndDate As Date
    Dim itemCount As Long
    
    ' Excel variables
    Dim xlApp As Object
    Dim xlBook As Object
    Dim xlSheet As Object
    Dim row As Long
    Dim savePath As String

    ' Initialize Excel
    Set xlApp = CreateObject("Excel.Application")
    Set xlBook = xlApp.Workbooks.Add
    Set xlSheet = xlBook.Sheets(1)

    ' Add headers to Excel sheet
    xlSheet.Cells(1, 1).Value = "Week Start Date"
    xlSheet.Cells(1, 2).Value = "Week End Date"
    xlSheet.Cells(1, 3).Value = "Subject"
    xlSheet.Cells(1, 4).Value = "Received Time"
    xlSheet.Cells(1, 5).Value = "Sender Name"
    xlSheet.Cells(1, 6).Value = "Sender Email"
    
    row = 2 ' Start writing data from the second row

    ' Define the time range
    startTime = TimeValue("17:30:00") ' 5:30 PM
    endTime = TimeValue("23:59:59") ' 11:59 PM

    ' Define the start and end dates for the entire period
    startDate = DateValue("01/01/2024")
    endDate = DateValue("04/28/2024")

    Set olNs = Application.GetNamespace("MAPI")
    
    ' Set the folder to the default inbox or a specific folder
    ' For default inbox:
    ' Set olFolder = olNs.GetDefaultFolder(olFolderInbox)
    
    ' For a specific folder:
    Set olFolder = olNs.Folders("wilsonwu97@outlook.com").Folders("Inbox")

    ' Loop through each week
    weekStartDate = startDate
    Do While weekStartDate <= endDate
        weekEndDate = weekStartDate + 4 ' Weekdays only (Monday to Friday)
        
        ' Filter items by date range for the current week
        Set olItems = olFolder.Items
        Set filteredItems = olItems.Restrict("[ReceivedTime] >= '" & Format(weekStartDate, "yyyy/mm/dd") & "' AND [ReceivedTime] < '" & Format(weekEndDate + 1, "yyyy/mm/dd") & "'")

        ' Clear the afterHoursItems collection
        Set afterHoursItems = New Collection

        Debug.Print "Week Start Date: " & weekStartDate
        Debug.Print "Week End Date: " & weekEndDate
        Debug.Print "Total Filtered Items: " & filteredItems.Count

        For i = 1 To filteredItems.Count
            Set olMail = filteredItems.Item(i)
            
            ' Ensure the item is a mail item before processing
            If TypeOf olMail Is Outlook.MailItem Then
                mailDate = olMail.ReceivedTime

                ' Debugging step to verify email received times
                Debug.Print "Email: " & olMail.Subject & " - " & olMail.ReceivedTime

                ' Check if the email was received on a weekday within the specified time range
                If Weekday(mailDate, vbMonday) <= 5 Then
                    If TimeValue(mailDate) >= startTime And TimeValue(mailDate) <= endTime Then
                        afterHoursItems.Add olMail
                        ' Write to Excel
                        xlSheet.Cells(row, 1).Value = weekStartDate
                        xlSheet.Cells(row, 2).Value = weekEndDate
                        xlSheet.Cells(row, 3).Value = olMail.Subject
                        xlSheet.Cells(row, 4).Value = olMail.ReceivedTime
                        xlSheet.Cells(row, 5).Value = olMail.SenderName
                        xlSheet.Cells(row, 6).Value = olMail.SenderEmailAddress
                        row = row + 1
                    End If
                End If
            End If
        Next i

        ' Display the count of filtered emails for the current week
        itemCount = afterHoursItems.Count
        MsgBox "Filtered " & itemCount & " emails for the week starting " & weekStartDate & "."

        ' Move to the next week
        weekStartDate = weekStartDate + 7
    Loop
    
    ' Define the save path
    savePath = Environ("USERPROFILE") & "\Desktop\AfterHoursEmails.xlsx"
    
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

## Weekend Email Search and Output

```
Sub FilterWeekendEmails()
    Dim olNs As Outlook.Namespace
    Dim olFolder As Outlook.Folder
    Dim olItems As Outlook.Items
    Dim olMail As Object
    Dim filteredItems As Outlook.Items
    Dim afterHoursItems As New Collection
    Dim i As Long
    Dim startDate As Date
    Dim endDate As Date
    Dim mailDate As Date
    Dim weekStartDate As Date
    Dim weekEndDate As Date
    Dim itemCount As Long
    
    ' Excel variables
    Dim xlApp As Object
    Dim xlBook As Object
    Dim xlSheet As Object
    Dim row As Long
    Dim savePath As String

    ' Initialize Excel
    Set xlApp = CreateObject("Excel.Application")
    Set xlBook = xlApp.Workbooks.Add
    Set xlSheet = xlBook.Sheets(1)

    ' Add headers to Excel sheet
    xlSheet.Cells(1, 1).Value = "Week Start Date"
    xlSheet.Cells(1, 2).Value = "Week End Date"
    xlSheet.Cells(1, 3).Value = "Subject"
    xlSheet.Cells(1, 4).Value = "Received Time"
    xlSheet.Cells(1, 5).Value = "Sender Name"
    xlSheet.Cells(1, 6).Value = "Sender Email"
    
    row = 2 ' Start writing data from the second row

    ' Define the start and end dates for the entire period
    startDate = DateValue("01/01/2024")
    endDate = DateValue("04/28/2024")

    Set olNs = Application.GetNamespace("MAPI")
    
    ' Set the folder to the default inbox or a specific folder
    ' For default inbox:
    ' Set olFolder = olNs.GetDefaultFolder(olFolderInbox)
    
    ' For a specific folder:
    Set olFolder = olNs.Folders("wilsonwu97@outlook.com").Folders("Inbox")

    ' Loop through each week
    weekStartDate = startDate
    Do While weekStartDate <= endDate
        weekEndDate = weekStartDate + 6 ' Include the entire week
        
        ' Filter items by date range for the current week
        Set olItems = olFolder.Items
        Set filteredItems = olItems.Restrict("[ReceivedTime] >= '" & Format(weekStartDate, "yyyy/mm/dd") & "' AND [ReceivedTime] < '" & Format(weekEndDate + 1, "yyyy/mm/dd") & "'")

        ' Clear the afterHoursItems collection
        Set afterHoursItems = New Collection

        Debug.Print "Week Start Date: " & weekStartDate
        Debug.Print "Week End Date: " & weekEndDate
        Debug.Print "Total Filtered Items: " & filteredItems.Count

        For i = 1 To filteredItems.Count
            Set olMail = filteredItems.Item(i)
            
            ' Ensure the item is a mail item before processing
            If TypeOf olMail Is Outlook.MailItem Then
                mailDate = olMail.ReceivedTime

                ' Debugging step to verify email received times
                Debug.Print "Email: " & olMail.Subject & " - " & olMail.ReceivedTime

                ' Check if the email was received on a weekend
                If Weekday(mailDate, vbMonday) = 6 Or Weekday(mailDate, vbMonday) = 7 Then
                    afterHoursItems.Add olMail
                    ' Write to Excel
                    xlSheet.Cells(row, 1).Value = weekStartDate
                    xlSheet.Cells(row, 2).Value = weekEndDate
                    xlSheet.Cells(row, 3).Value = olMail.Subject
                    xlSheet.Cells(row, 4).Value = olMail.ReceivedTime
                    xlSheet.Cells(row, 5).Value = olMail.SenderName
                    xlSheet.Cells(row, 6).Value = olMail.SenderEmailAddress
                    row = row + 1
                End If
            End If
        Next i

        ' Display the count of filtered emails for the current week
        itemCount = afterHoursItems.Count
        MsgBox "Filtered " & itemCount & " emails for the weekend of " & weekStartDate & "."

        ' Move to the next week
        weekStartDate = weekStartDate + 7
    Loop
    
    ' Define the save path
    savePath = Environ("USERPROFILE") & "\Desktop\WeekendEmails.xlsx"
    
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