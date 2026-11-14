# Run cpu.exe alone and as three copies, pinned to one CPU core (affinity 1) and unpinned.
# Windows PowerShell 5.1; ASCII only. Output of each copy goes to its own file in results\.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force out, results | Out-Null
& gcc -std=c17 -Wall -Wextra -O0 -o out/cpu.exe src/cpu.c

function Run-Copies($names, $pin, $tag) {
    $procs = foreach ($n in $names) {
        $p = Start-Process -FilePath out\cpu.exe -ArgumentList $n, 4 -NoNewWindow -PassThru `
             -RedirectStandardOutput "results\$tag-$n.txt"
        if ($pin) { $p.ProcessorAffinity = 1 }
        $p
    }
    $procs | Wait-Process
}

Run-Copies @('A') $true 'one-core-alone'
Run-Copies @('A', 'B', 'C') $true 'one-core-three'
Run-Copies @('A', 'B', 'C') $false 'all-cores-three'

$cores = (Get-CimInstance Win32_Processor | Measure-Object -Property NumberOfLogicalProcessors -Sum).Sum
$count = (Get-Process).Count
"logical processors: $cores, running processes: $count" | Set-Content -Encoding ascii results\processes.txt
Get-ChildItem results\*.txt | ForEach-Object { "== $($_.Name)"; Get-Content $_ }

& (Join-Path $PSScriptRoot summarize.ps1)
