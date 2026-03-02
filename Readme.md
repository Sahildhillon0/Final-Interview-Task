# 🚀 Zenithra Tech - Final Stage: The Hardware Interface Quest

> *"The ancient gates grind open. You have proven your worth as a Master of the Full-Stack arts."*

If you are reading this, **congratulations**. You successfully bypassed the Frontend Canvas Trap, spoofed your headers, manipulated the temporal timestamps, and decoded the Ancestors' riddle to pass the Gatekeeper API. 

**You are in the top 1% of candidates who make it this far.** The "Real Gem" is right in front of you. You have already proven your backend and problem-solving prowess. This final, practical task is designed to test your ability to interact with the physical layer of a user's device.

---

## 🎯 The Final Objective

Your task is to build a sleek, single-page web interface that successfully connects to the user's local hardware using modern Web APIs. 

You do not need to build a complex backend for this. We are evaluating your frontend architecture, your handling of browser permissions, and your ability to manage asynchronous hardware streams.

### 🛠️ Core Requirements

You must implement the following three hardware connections on a single dashboard:

| Feature | API / Technology Required | Expected Output on Screen |
| :--- | :--- | :--- |
| **📷 Video Feed** | WebRTC (`getUserMedia`) | A live video feed from the user's webcam rendered in a `<video>` element. |
| **🎤 Voice to Text** | Web Speech API | Capture the user's voice via microphone and print the live transcription (text) onto the screen. |
| **🦷 Bluetooth** | Web Bluetooth API | A button that prompts the browser to scan for nearby Bluetooth devices and prints the name/ID of the selected device. |

---

## 📜 Rules of Engagement & AI Policy

At Zenithra Tech, we mirror real-world engineering. We don't expect you to memorize syntax, and we actively encourage the use of modern developer tools.

* **You are fully permitted and encouraged to use AI tools (ChatGPT, Gemini, GitHub Copilot), YouTube, and documentation.**
* **The Catch:** Your final code is only 50% of the evaluation. During the technical interview, you must be able to explain *why* you chose your implementation, how the browser permission lifecycle works, and how you handled potential errors (e.g., what happens if the user denies camera access?).

---

## 🛤️ Your Path to the Offer (Step-by-Step)

We value your time. If you can get the core requirements working and submit a Pull Request, **you are fully eligible for the role.** ### Step 1: Fork & Clone
* **Fork** this repository to your own GitHub account.
* **Clone** your forked repository to your local machine.

### Step 2: Build the Interface
* Create your solution. You may use plain HTML/JS/CSS, React, Vue, or any modern framework you feel most powerful in.
* Ensure your UI clearly shows the Camera feed, the Voice Transcription text, and the Bluetooth connection status.

### Step 3: Submit Your Pull Request (Eligibility Checkpoint 🏁)
* Commit your code to your forked repository.
* Open a **Pull Request (PR)** against this original Zenithra repository.
* *Once your PR is submitted, your technical submission is officially complete!*

### Step 4: The Final Polish (Bonus / Optional 🌟)
Want to instantly stand out as a Senior Engineer? 
* **Deploy your solution** (using Vercel, Netlify, GitHub Pages, Cloudflare etc.) and include the live URL in your Pull Request description. *(Note: Web Bluetooth and WebRTC require HTTPS to function properly!)*

---

## 🧪 Evaluation Criteria

When reviewing your Pull Request, our engineering team will look at:
1.  **Permission Handling:** Do you gracefully handle scenarios where the user blocks microphone or camera access?
2.  **Code Cleanliness:** Is your logic for hardware APIs modular and easy to read, or is it a single massive file?
3.  **UX/UI:** It doesn't need to be a masterpiece, but it should look professional and clearly indicate to the user when hardware is recording/listening.

---

## 📬 Contact & Support

You have come incredibly far. Don't hesitate to reach out if you hit a critical roadblock or have questions about the expectations. 

* **Hiring Manager Email:** harshgoyal@zenithratech.com
* **LinkedIn:** https://www.linkedin.com/in/devharshgoyal/
* **Phone/WhatsApp:** 9211848317

*Submit your PR, take a breath, and get ready for a great technical conversation. We look forward to meeting you!*