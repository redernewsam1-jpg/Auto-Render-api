const { exec } = require("child_process");

function downloadM3U8(url, output) {
  return new Promise((resolve, reject) => {
    const cmd = `ffmpeg -loglevel error -headers "Referer: https://web.classplusapp.com/" -i "${url}" -c copy "${output}"`;

    exec(cmd, (err) => {
      if (err) reject("Download failed");
      else resolve("Done");
    });
  });
}

module.exports = downloadM3U8;