// ── CLOCK ──────────────────────────────────────────────────────────────────
function updateClock() {
  document.getElementById('clock').textContent =
    new Date().toTimeString().slice(0, 8);
}
setInterval(updateClock, 1000);
updateClock();

// ── SYSTEM LOG ─────────────────────────────────────────────────────────────
function sysLog(msg, type = 'info') {
  const log = document.getElementById('sysLog');
  const now = new Date().toTimeString().slice(0, 8);
  const line = document.createElement('div');
  line.className = 'log-line';
  const cssClass = type === 'ok' ? 'ok' : type === 'err' ? 'err' : type === 'warn' ? 'warn' : '';
  line.innerHTML = `<span class="log-time">[${now}]</span><span class="log-msg ${cssClass}">${msg}</span>`;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

sysLog('System boot sequence complete.', 'ok');
sysLog('Hardware interface modules loaded.');
sysLog('Awaiting operator input...');

// ── WAVEFORM ───────────────────────────────────────────────────────────────
const waveform = document.getElementById('waveform');
const BAR_COUNT = 24;

for (let i = 0; i < BAR_COUNT; i++) {
  const bar = document.createElement('div');
  bar.className = 'wave-bar';
  bar.style.setProperty('--h', (4 + Math.random() * 20) + 'px');
  bar.style.setProperty('--dur', (0.3 + Math.random() * 0.6) + 's');
  bar.style.animationDelay = (Math.random() * 0.5) + 's';
  waveform.appendChild(bar);
}

function setWaveActive(active) {
  waveform.querySelectorAll('.wave-bar').forEach(bar => {
    if (active) {
      bar.classList.add('active');
    } else {
      bar.classList.remove('active');
      bar.style.height = '4px';
    }
  });
}

// ── CAMERA ─────────────────────────────────────────────────────────────────
let cameraStream = null;

document.getElementById('startCam').addEventListener('click', async () => {
  try {
    sysLog('Requesting camera access...');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    cameraStream = stream;

    const video = document.getElementById('videoEl');
    video.srcObject = stream;
    video.style.display = 'block';

    document.getElementById('videoPlaceholder').style.display = 'none';
    document.getElementById('videoOverlay').classList.add('visible');
    ['ch1', 'ch2', 'ch3', 'ch4'].forEach(id => document.getElementById(id).classList.add('visible'));
    document.getElementById('recBadge').classList.add('visible');

    document.getElementById('videoPanel').classList.add('active');
    const tag = document.getElementById('videoTag');
    tag.textContent = 'LIVE';
    tag.className = 'panel-tag on';

    document.getElementById('startCam').style.display = 'none';
    document.getElementById('stopCam').style.display = '';

    sysLog('Camera stream active. Feed established.', 'ok');
  } catch (err) {
    document.getElementById('videoPanel').classList.add('error');
    const tag = document.getElementById('videoTag');
    tag.textContent = 'DENIED';
    tag.className = 'panel-tag err';

    if (err.name === 'NotAllowedError') {
      sysLog('Camera access denied by user.', 'err');
    } else if (err.name === 'NotFoundError') {
      sysLog('No camera device found.', 'err');
    } else {
      sysLog(`Camera error: ${err.message}`, 'err');
    }
  }
});

document.getElementById('stopCam').addEventListener('click', () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }

  const video = document.getElementById('videoEl');
  video.srcObject = null;
  video.style.display = 'none';

  document.getElementById('videoPlaceholder').style.display = 'flex';
  document.getElementById('videoOverlay').classList.remove('visible');
  ['ch1', 'ch2', 'ch3', 'ch4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('recBadge').classList.remove('visible');

  document.getElementById('videoPanel').classList.remove('active', 'error');
  const tag = document.getElementById('videoTag');
  tag.textContent = 'OFFLINE';
  tag.className = 'panel-tag';

  document.getElementById('startCam').style.display = '';
  document.getElementById('stopCam').style.display = 'none';
  sysLog('Camera stream terminated.', 'warn');
});

// ── VOICE TRANSCRIPTION ────────────────────────────────────────────────────
let recognition = null;
let finalTranscript = '';
let lastFinal = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  document.getElementById('startVoice').disabled = true;
  document.getElementById('voiceUnsupported').style.display = 'block';
  sysLog('Web Speech API unavailable in this browser.', 'warn');
} else {
  document.getElementById('startVoice').addEventListener('click', () => {

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setWaveActive(true);

      document.getElementById('voicePanel').classList.add('active');

      const tag = document.getElementById('voiceTag');
      tag.textContent = 'LISTENING';
      tag.className = 'panel-tag on';

      document.getElementById('transcriptEmpty').style.display = 'none';

      document.getElementById('startVoice').style.display = 'none';
      document.getElementById('stopVoice').style.display = '';

      sysLog('Voice recognition active. Listening...', 'ok');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript.trim();

        if (event.results[i].isFinal) {

          // Prevent duplicate final responses
          if (text !== lastFinal) {
            finalTranscript += text + ' ';
            lastFinal = text;
          }

        } else {
          interimTranscript = text;
        }
      }

      const box = document.getElementById('transcriptBox');

      box.innerHTML =
        (finalTranscript ? `<span>${finalTranscript}</span>` : '') +
        (interimTranscript
          ? `<span class="transcript-interim">${interimTranscript}</span>`
          : '');

      box.scrollTop = box.scrollHeight;
    };

    recognition.onerror = (event) => {
      sysLog(`Speech recognition error: ${event.error}`, 'err');

      if (event.error === 'not-allowed') {
        document.getElementById('voicePanel').classList.add('error');

        const tag = document.getElementById('voiceTag');
        tag.textContent = 'DENIED';
        tag.className = 'panel-tag err';
      }

      stopVoice();
    };

    recognition.onend = () => {
      // Restart recognition if stop button not pressed
      if (document.getElementById('stopVoice').style.display !== 'none') {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            // ignore restart errors
          }
        }, 200);
      }
    };

    recognition.start();
  });

  function stopVoice() {
    if (recognition) {
      recognition.stop();
      recognition = null;
    }

    setWaveActive(false);

    document.getElementById('voicePanel').classList.remove('active');

    const tag = document.getElementById('voiceTag');
    tag.textContent = 'IDLE';
    tag.className = 'panel-tag';

    document.getElementById('startVoice').style.display = '';
    document.getElementById('stopVoice').style.display = 'none';

    sysLog('Voice recognition stopped.', 'warn');
  }

  document.getElementById('stopVoice').addEventListener('click', stopVoice);
}

document.getElementById('clearVoice').addEventListener('click', () => {
  finalTranscript = '';
  lastFinal = '';

  document.getElementById('transcriptBox').innerHTML =
    '<span class="transcript-empty" id="transcriptEmpty">// Awaiting voice input...</span>';

  sysLog('Transcript buffer cleared.');
});
// ── BLUETOOTH ──────────────────────────────────────────────────────────────
if (!navigator.bluetooth) {
  document.getElementById('scanBt').disabled = true;
  document.getElementById('btUnsupported').style.display = 'block';
  sysLog('Web Bluetooth API unavailable in this browser.', 'warn');
} else {
  document.getElementById('scanBt').addEventListener('click', async () => {
    try {
      sysLog('Initiating Bluetooth scan...');
      document.getElementById('btStatusText').textContent = 'Scanning for devices...';
      document.getElementById('btTag').textContent = 'SCANNING';
      document.getElementById('btTag').className = 'panel-tag warn';

      const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });

      document.getElementById('btPanel').classList.add('active');
      document.getElementById('btTag').textContent = 'CONNECTED';
      document.getElementById('btTag').className = 'panel-tag on';
      document.getElementById('btStatusText').textContent = 'Device selected successfully.';

      // Avoid duplicate cards
      const list = document.getElementById('deviceList');
      const existingIds = [...list.querySelectorAll('.device-card')].map(c => c.dataset.id);
      if (!existingIds.includes(device.id)) {
        const card = document.createElement('div');
        card.className = 'device-card';
        card.dataset.id = device.id;
        card.innerHTML = `
          <div>
            <div class="device-name">${device.name || 'Unknown Device'}</div>
            <div class="device-id">ID: ${device.id}</div>
          </div>
          <div class="device-badge">PAIRED</div>
        `;
        list.appendChild(card);
      }

      sysLog(`Bluetooth device found: ${device.name || 'Unknown'} (${device.id.slice(0, 12)}...)`, 'ok');

    } catch (err) {
      if (err.name === 'NotFoundError') {
        sysLog('Bluetooth scan cancelled by user.', 'warn');
      } else if (err.name === 'SecurityError') {
        sysLog('Bluetooth access denied (requires HTTPS).', 'err');
        document.getElementById('btTag').textContent = 'DENIED';
        document.getElementById('btTag').className = 'panel-tag err';
      } else {
        sysLog(`Bluetooth error: ${err.message}`, 'err');
      }

      document.getElementById('btStatusText').textContent = 'Scan failed or cancelled.';
      if (document.getElementById('btTag').textContent === 'SCANNING') {
        document.getElementById('btTag').textContent = 'INACTIVE';
        document.getElementById('btTag').className = 'panel-tag';
      }
    }
  });
}
