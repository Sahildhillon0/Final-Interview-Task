(function () {
  console.log(
    "%c[ZENITHRA SECURE TERMINAL] INITIALIZING...",
    "color: #555; font-family: monospace;",
  );

  setTimeout(() => {
    console.info(
      "%c🕵️‍♂️ Inspecting the DOM? Nice try. The data is rendered at the pixel level. Master the CSS to reveal the terminal.",
      "color: #00ff41; font-weight: bold; font-size: 14px; background: black; padding: 5px; border: 1px solid #00ff41;",
    );
  }, 1000);

  // // Base64 encoded: "https://api.yourcompany.com/v1/interview/start"
  // const _0x1a = [
  //   "aHR0cHM6Ly",
  //   "9hcGkueW91",
  //   "cmNvbXBhbn",
  //   "kuY29tL3Yx",
  //   "L2ludGVydm",
  //   "lldy9zdGFy",
  //   "dA==",
  // ];

  // Base64 encoded: "https://onboarding.zenithratech.com/v1/interview/start"
  const _0x1a = [
    "aHR0cHM6Ly",
    "9vbmJvYXJk",
    "aW5nLnplbm",
    "l0aHJhdGVj",
    "aC5jb20vdj",
    "EvaW50ZXJ2",
    "aWV3L3N0YX",
    "J0"
  ];
  
  const targetPath = atob(_0x1a.join(""));

  document.addEventListener("DOMContentLoaded", () => {
    // Create a CANVAS element instead of a DIV
    const canvas = document.createElement("canvas");
    canvas.id = "quest-init";
    canvas.width = 600;
    canvas.height = 120;

    // Get the 2D drawing context
    const ctx = canvas.getContext("2d");

    // Paint the background of the canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Paint the border
    ctx.strokeStyle = "#00ff41";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    // Paint the Secret Text as PIXELS
    ctx.fillStyle = "#00ff41";
    ctx.font = "bold 18px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("TARGET ACQUIRED:", canvas.width / 2, 40);

    ctx.font = "16px Courier New";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(targetPath, canvas.width / 2, 70);

    ctx.font = "12px Courier New";
    ctx.fillStyle = "#00ff41";
    ctx.fillText("[INITIATE POSTMAN PROTOCOL]", canvas.width / 2, 100);

    // Append the canvas to the body
    document.body.appendChild(canvas);
  });
})();
