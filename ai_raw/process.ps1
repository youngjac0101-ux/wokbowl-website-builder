# 批量处理菜单图：裁掉右下角（去水印）-> 800x800 -> 输出到 public/images/menu/
# 用法：把原图放进 ai_raw/，在本目录执行: .\process.ps1
# 无需 ImageMagick，用 .NET 处理

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

$outDir = Join-Path $scriptDir "..\public\images\menu"
$null = New-Item -ItemType Directory -Force -Path $outDir

$CROP_PERCENT = 1    # 裁掉右侧和下方各 N%，只去右下角水印；裁太多就改小（如 2、3）
$KEEP = (100 - $CROP_PERCENT) / 100.0
$size = 800

Add-Type -AssemblyName System.Drawing

function To-Slug($name) {
    $name = $name.ToLower() -replace ' ', '-' -replace '[&()]', ''
    $name
}

$count = 0
Get-ChildItem -Path $scriptDir -File | Where-Object { $_.Extension -match '\.(png|jpg|jpeg)$' } | ForEach-Object {
    $imgPath = $_.FullName
    $base = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
    $outBase = To-Slug $base
    $outPath = Join-Path $outDir "$outBase.png"
    Write-Host "Processing: $($_.Name) -> $outBase.png"
    try {
        $bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
        $w = $bmp.Width
        $h = $bmp.Height
        $cropW = [int]($w * $KEEP)
        $cropH = [int]($h * $KEEP)
        $cropped = New-Object System.Drawing.Bitmap $cropW, $cropH
        $g = [System.Drawing.Graphics]::FromImage($cropped)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($bmp, 0, 0, [System.Drawing.Rectangle]::new(0, 0, $cropW, $cropH), [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $bmp.Dispose()
        $scale = [Math]::Max($size / $cropW, $size / $cropH)
        $scaledW = [int]($cropW * $scale)
        $scaledH = [int]($cropH * $scale)
        $final = New-Object System.Drawing.Bitmap $size, $size
        $g2 = [System.Drawing.Graphics]::FromImage($final)
        $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g2.DrawImage($cropped, [int](($size - $scaledW) / 2), [int](($size - $scaledH) / 2), $scaledW, $scaledH)
        $g2.Dispose()
        $cropped.Dispose()
        $final.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $final.Dispose()
        $count++
    } catch {
        Write-Warning "Failed: $($_.Exception.Message)"
    }
}

Write-Host "Done. Processed $count image(s) -> $outDir (refresh the site to see changes)"
