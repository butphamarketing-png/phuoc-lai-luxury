# Tạo lại favicon chuẩn từ logo (chạy sau khi đổi logo.png)
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$logo = Join-Path $root "src\assets\logo.png"
$pub = Join-Path $root "public"

Add-Type -AssemblyName System.Drawing

function Save-Resize($src, $dest, $size) {
  $img = [System.Drawing.Image]::FromFile($src)
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $size, $size)
  $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

Save-Resize $logo (Join-Path $pub "favicon-16x16.png") 16
Save-Resize $logo (Join-Path $pub "favicon-32x32.png") 32
Save-Resize $logo (Join-Path $pub "favicon.png") 32
Save-Resize $logo (Join-Path $pub "apple-touch-icon.png") 180
Save-Resize $logo (Join-Path $pub "favicon-192.png") 192

$bmp = New-Object System.Drawing.Bitmap (Join-Path $pub "favicon-32x32.png")
$hicon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hicon)
$fs = [System.IO.File]::Create((Join-Path $pub "favicon.ico"))
$icon.Save($fs)
$fs.Close()
$bmp.Dispose()

Write-Host "Favicon da tao trong public/"
