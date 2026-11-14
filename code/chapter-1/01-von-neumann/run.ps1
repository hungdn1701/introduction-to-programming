# Each block of the von Neumann architecture on a real machine (Windows PowerShell 5.1, ASCII only).
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force results | Out-Null

$cpu  = Get-CimInstance Win32_Processor
$ram  = Get-CimInstance Win32_ComputerSystem
$disk = Get-CimInstance Win32_DiskDrive
$kbd  = Get-CimInstance Win32_Keyboard | Select-Object -First 1
$gpu  = Get-CimInstance Win32_VideoController | Where-Object CurrentHorizontalResolution | Select-Object -First 1

$lines = @(
    'CPU     : {0}, {1} cores, {2} logical processors' -f $cpu.Name, $cpu.NumberOfCores, $cpu.NumberOfLogicalProcessors
    'RAM     : {0:N1} GB' -f ($ram.TotalPhysicalMemory / 1GB)
    'Storage : ' + (($disk | ForEach-Object { '{0} ({1:N0} GB)' -f $_.Model, ($_.Size / 1GB) }) -join '; ')
    'Input   : ' + $kbd.Description
    'Output  : {0}, {1} x {2}' -f $gpu.Name, $gpu.CurrentHorizontalResolution, $gpu.CurrentVerticalResolution
)
$lines | Set-Content -Encoding ascii results\hardware.txt
Get-Content results\hardware.txt
