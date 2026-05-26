# Tạo lại favicon + ảnh chia sẻ Zalo/Facebook từ logo (chạy sau khi đổi logo.png)
$root = Split-Path $PSScriptRoot -Parent
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

# OG share 1200x630 — logo giữa, nền #1A1A1A (Zalo/Facebook preview)
$ogW = 1200
$ogH = 630
$og = New-Object System.Drawing.Bitmap $ogW, $ogH
$ogG = [System.Drawing.Graphics]::FromImage($og)
$ogG.Clear([System.Drawing.Color]::FromArgb(255, 26, 26, 26))
$logoImg = [System.Drawing.Image]::FromFile($logo)
$logoSize = 280
$logoX = [int](($ogW - $logoSize) / 2)
$logoY = [int](($ogH - $logoSize) / 2)
$ogG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$ogG.DrawImage($logoImg, $logoX, $logoY, $logoSize, $logoSize)
$og.Save((Join-Path $pub "og-share.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$ogG.Dispose(); $og.Dispose(); $logoImg.Dispose()

Write-Host "Favicon + og-share.png da tao trong public/"
