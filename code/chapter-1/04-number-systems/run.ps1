# Number bases and the bytes of a UTF-8 string (Windows PowerShell 5.1; this file is ASCII only,
# so non-ASCII letters are built from their Unicode code points).
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force out, results | Out-Null
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$utf8 = New-Object Text.UTF8Encoding $false

# 1. One number in three bases
$bases = @(
    [Convert]::ToString(2026, 2)
    [Convert]::ToString(2026, 16)
    [Convert]::ToString(0x41, 10)
    [Convert]::ToString(255, 2)
)
$labels = @('2026 in base 2  :', '2026 in base 16 :', '0x41 in base 10 :', '255 in base 2   :')
0..3 | ForEach-Object { '{0} {1}' -f $labels[$_], $bases[$_].ToUpper() } | Set-Content -Encoding ascii results\bases.txt

# 2. "Ha Noi" with Vietnamese marks: a-grave is U+00E0, o-circumflex-dot-below is U+1ED9
$text = 'H' + [char]0x00E0 + ' N' + [char]0x1ED9 + 'i'
[IO.File]::WriteAllText("$PSScriptRoot\out\hanoi.txt", $text, $utf8)
Format-Hex -Path out\hanoi.txt
$bytes = [IO.File]::ReadAllBytes("$PSScriptRoot\out\hanoi.txt")
$hex = (Format-Hex -Path out\hanoi.txt | Out-String).Trim() -replace [regex]::Escape("$PSScriptRoot\"), ''
$summary = 'characters: {0}, bytes: {1}' -f $text.Length, $bytes.Length
[IO.File]::WriteAllLines("$PSScriptRoot\results\hanoi-hex.txt", @($hex, '', $summary), $utf8)

# 3. The same bytes decoded with the wrong table (Windows-1252)
$wrong = [Text.Encoding]::GetEncoding(1252).GetString($bytes)
[IO.File]::WriteAllLines("$PSScriptRoot\results\hanoi-wrong.txt",
    @(('read as UTF-8       : ' + $utf8.GetString($bytes)), ('read as Windows-1252: ' + $wrong)), $utf8)

Clear-Host
Get-Content results\bases.txt
Get-Content -Encoding UTF8 results\hanoi-hex.txt
Get-Content -Encoding UTF8 results\hanoi-wrong.txt
