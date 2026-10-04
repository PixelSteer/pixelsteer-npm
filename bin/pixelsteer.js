#!/usr/bin/env node

"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { resolveAsset } = require("../scripts/platform");

const asset = resolveAsset(process.platform, process.arch);
const binary = path.join(__dirname, "..", "vendor", asset);

if (!fs.existsSync(binary)) {
  console.error("PixelSteer's native binary is missing. Run `npm rebuild pixelsteer` to install it.");
  process.exit(1);
}

const result = spawnSync(binary, process.argv.slice(2), {
  stdio: "inherit",
  windowsHide: false,
});

if (result.error) {
  console.error(`Unable to run PixelSteer: ${result.error.message}`);
  process.exit(1);
}
if (result.signal) {
  process.kill(process.pid, result.signal);
}
process.exit(result.status ?? 1);
