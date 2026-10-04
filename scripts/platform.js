"use strict";

const assets = {
  "win32-x64": "Windows-x86_64.exe",
  "win32-arm64": "Windows-arm64.exe",
  "darwin-arm64": "macOS-arm64",
  "darwin-x64": "macOS-x86_64",
  "linux-x64": "Linux-x86_64",
  "linux-arm64": "Linux-arm64",
};

function resolveAsset(platform, arch) {
  const asset = assets[`${platform}-${arch}`];
  if (!asset) {
    throw new Error(`PixelSteer does not support ${platform}/${arch}.`);
  }
  return asset;
}

module.exports = { resolveAsset };
