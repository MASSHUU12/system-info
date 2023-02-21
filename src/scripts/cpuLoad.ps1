# Get-WmiObject Win32_Processor | Select LoadPercentage | Format-List
Get-WmiObject Win32_Processor | Measure-Object -Property LoadPercentage -Average | Select Average
