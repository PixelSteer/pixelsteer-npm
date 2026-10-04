#!/usr/bin/env node

"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { resolveAsset } = require("./platform");

const packageRoot = path.resolve(__dirname, "..");
const asset = resolveAsset(process.platform, process.arch);
const vendorDir = path.join(packageRoot, "vendor");
const destination = path.join(vendorDir, asset);
const downloadBaseUrl = (process.env.PIXELSTEER_DOWNLOAD_BASE_URL || "https://pixelsteer.com/release").replace(/\/$/, "");

main().catch((error) => {
  console.error(`PixelSteer installation failed: ${error.message}`);
  process.exit(1);
});

async function main() {
  if (process.env.PIXELSTEER_SKIP_DOWNLOAD === "1") return;
  fs.mkdirSync(vendorDir, { recursive: true });

  const localBinary = process.env.PIXELSTEER_BINARY_PATH;
  if (localBinary) {
    fs.copyFileSync(path.resolve(localBinary), destination);
  } else {
    const [binary, checksumFile] = await Promise.all([
      download(`${downloadBaseUrl}/${asset}`),
      download(`${downloadBaseUrl}/checksums.txt`),
    ]);
    const expected = checksumFor(checksumFile.toString("utf8"), asset);
    const actual = crypto.createHash("sha256").update(binary).digest("hex");
    if (actual !== expected) {
      throw new Error(`checksum mismatch for ${asset}`);
    }
    const temporary = `${destination}.${process.pid}.tmp`;
    fs.writeFileSync(temporary, binary);
    fs.rmSync(destination, { force: true });
    fs.renameSync(temporary, destination);
  }

  if (process.platform !== "win32") fs.chmodSync(destination, 0o755);
  console.log(`Installed ${asset} in ${path.relative(process.cwd(), destination)}`);
}

async function download(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`download returned ${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

function checksumFor(contents, assetName) {
  for (const line of contents.split(/\r?\n/)) {
    const match = line.trim().match(/^([a-fA-F0-9]{64})\s+\*?(.+)$/);
    if (match && match[2] === assetName) return match[1].toLowerCase();
  }
  throw new Error(`no checksum published for ${assetName}`);
}
