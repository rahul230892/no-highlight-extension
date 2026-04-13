# No Text Highlight Color — Chrome Extension

> A lightweight Chrome extension that removes the default text selection highlight color from all websites, making your browsing experience cleaner and distraction-free.

---

## ✨ Features

- **Removes selection highlight color** — sets text selection background to transparent across every website.
- **Preserves text selectability** — you can still select, copy, and interact with text normally; only the blue/colored highlight box is hidden.
- **Works on all frames** — CSS is injected into every iframe on the page, not just the top-level document.
- **Runs automatically** — activates on every tab load and when you switch between tabs; no manual toggle needed.
- **No data collection** — the extension never reads, stores, or transmits any page content or personal data.

---

## 🚀 Installation (Developer / Unpacked Mode)

Chrome extensions that are not published on the Chrome Web Store can be loaded directly from your filesystem.

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/rahul230892/no-highlight-extension.git
   ```

2. **Open Chrome** and navigate to:
   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode** — toggle the switch in the **top-right corner** of the Extensions page.

4. **Click "Load unpacked"** — select the root folder of this repository (the folder that contains `manifest.json`).

5. The extension will appear in your extensions list and activate immediately. A puzzle-piece icon will appear in the toolbar.

---

## 🔧 How It Works

The extension uses Chrome's **Manifest V3** `scripting` API to inject a small CSS snippet into every tab:

```css
* {
  user-select: text !important;
}
*::selection {
  background: transparent !important;
  color: inherit !important;
}
```

- `user-select: text` ensures text remains selectable on sites that try to block it.
- `background: transparent` on `::selection` removes the colored highlight box.
- `color: inherit` keeps the selected text readable (same colour as surrounding text).

The background service worker listens for two events:

| Event | Trigger |
|---|---|
| `chrome.tabs.onUpdated` | Page finishes loading — CSS is (re-)injected |
| `chrome.tabs.onActivated` | User switches to a different tab — CSS is injected if not already present |

Chrome internal pages (`chrome://`, `chrome-extension://`) are automatically skipped since they cannot be scripted.

---

## 🛡️ Permissions

| Permission | Why it's needed |
|---|---|
| `scripting` | Required to programmatically inject CSS into web pages |
| `tabs` | Required to listen for tab updates and read tab URLs |
| `<all_urls>` (host permission) | Required to inject CSS into pages on any domain |

No network requests are made. No user data is read or stored.

---

## 🗂️ Project Structure

```
no-highlight-extension/
├── icons/
│   └── icon128.png       # Extension icon (128×128)
├── background.js         # Service worker — injects CSS on tab events
├── manifest.json         # Extension manifest (Manifest V3)
├── LICENSE               # MIT License
└── README.md             # This file
```

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository.
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m "feat: describe your change"`
4. **Push to your fork**: `git push origin feature/your-feature-name`
5. **Open a Pull Request** and describe what you changed and why.

For significant changes, please open an **Issue** first to discuss the approach.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
