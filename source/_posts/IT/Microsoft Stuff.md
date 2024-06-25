Refer to the official Microsoft Documentation here: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/main/reference/5.1/Microsoft.PowerShell.Management/Get-HotFix.md

Specifically, here for batch scans: 

Example 3: Verify if an update is installed and write computer names to a file
The commands in this example verify whether a particular update installed. If the update isn't installed, the computer name is written to a text file.
```Powershell
$A = Get-Content -Path ./Servers.txt
$A | ForEach-Object { if (!(Get-HotFix -Id KB957095 -ComputerName $_))
    { Add-Content $_ -Path ./Missing-KB957095.txt }}
```

The `$A` variable contains computer names that were obtained by `Get-Content` from a text file. The objects in $A are sent down the pipeline to `ForEach-Object`. An if statement uses the Get-Hotfix cmdlet with the Id parameter and a specific Id number for each computer name. If a computer doesn't have the specified hotfix Id installed, the `Add-Content` cmdlet writes the computer name to a file.



The above code only works with RPC enabled. 

Refer to here for a "refined" version.

```
$A = Get-Content -Path ./Servers.txt

$A | ForEach-Object { 
    try {
        if (!(Get-HotFix -Id KB957095 -ComputerName $_)) {
            Add-Content -Path ./TESTTTTMissing-KB957095.txt -Value $_
        }
    }
    catch {
        # Log the error message if RPC server is unavailable or any other error occurs
        Add-Content -Path ./Error-KB957095.txt -Value "$_: $($_.Exception.Message)"
    }
}

```


## Take a list of computer names and runs the specified `Get-HotFix -Id $kbNumber -ComputerName $computerName -ErrorAction Stop`. Then stores the results. RPC needs to be enabled. 
```powershell
# File name path
$computerNames = Get-Content -Path ./Computers.txt

# KB number to check
$kbNumber = "KB957095"

# Output file paths
$presentFilePath = "./Present-$kbNumber.txt"
$missingFilePath = "./Missing-$kbNumber.txt"
$errorFilePath = "./Error-$kbNumber.txt"

# Clear previous output files
Remove-Item $presentFilePath, $missingFilePath, $errorFilePath -ErrorAction SilentlyContinue

$computerNames | ForEach-Object {
    $computerName = $_
    try {
        # The specific KB is installed on the computer
        $hotfix = Get-HotFix -Id $kbNumber -ComputerName $computerName -ErrorAction Stop
        
        if ($hotfix) {
            Add-Content -Path $presentFilePath -Value $computerName
        } 
    }
    catch {
        # Computer is contacted, but KB is missing
        if ($_.Exception.Message -match "Cannot find.*hotfix") {
            Add-Content -Path $missingFilePath -Value $computerName
        } else {
            # Log other errors
            Write-Warning "Error checking ${computerName}: $_"
            Add-Content -Path $errorFilePath -Value "${computerName}: $_"
        }
    }
}

# Output a summary message
Write-Output "Check for KB $kbNumber completed. Results stored in $presentFilePath, $missingFilePath, and $errorFilePath."

```