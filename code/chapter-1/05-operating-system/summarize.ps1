# Collect the per-copy outputs of cpu.exe into one table (million loops in each second). ASCII only.
Set-Location $PSScriptRoot
$runs = @(
    @('A alone, core 0', 'one-core-alone-A'),
    @('A with B, C on core 0', 'one-core-three-A'),
    @('B with A, C on core 0', 'one-core-three-B'),
    @('C with A, B on core 0', 'one-core-three-C'),
    @('A with B, C, all cores', 'all-cores-three-A')
)
$rows = @('{0,-24}{1,9}{2,9}{3,9}{4,9}' -f 'million loops per second', 's1', 's2', 's3', 's4')
foreach ($r in $runs) {
    $n = Get-Content "results\$($r[1]).txt" | ForEach-Object { ($_ -split ',')[1].Trim().Split(' ')[0] }
    $rows += '{0,-24}{1,9}{2,9}{3,9}{4,9}' -f $r[0], $n[0], $n[1], $n[2], $n[3]
}
$rows += ''
$rows += Get-Content results\processes.txt
$rows | Set-Content -Encoding ascii results\summary.txt
Get-Content results\summary.txt
