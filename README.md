# Kerbal Space Program Launcher for VS Code

Launch Kerbal Space Program directly from Visual Studio Code! This extension adds a convenient rocket icon button to the editor's title bar whenever you open a Kerbal Space Program configuration file (`.cfg`), allowing you to quickly start the game.

## Features

*   **One-Click Launch:** A rocket icon (`$(rocket)`) appears in the editor title bar when a `.cfg` file is open. Clicking this button launches Kerbal Space Program.
*   **Flexible Launch Options:**
    *   **Steam Launch (Default):** Attempts to launch KSP via Steam using AppID `220200`.
    *   **Custom Executable Path:** You can specify the direct path to your KSP executable if it's not installed via Steam or if you prefer to use a specific installation.
*   **First-Time Setup Prompt:** If the KSP executable path isn't configured, the extension will prompt you on your first attempt to launch the game, asking if you'd like to set the path or use Steam. This prompt only appears once per installation.
*   **Cross-Platform:** Designed to work on Windows, macOS, and Linux.
*   **Commands for Easy Configuration:**
    *   `Kerbal Space Program Launcher: Run KSP`: Launches the game using your configured preference.
    *   `Kerbal Space Program Launcher: Set Kerbal Space Program Executable Path`: Opens a file dialog to easily select and save your KSP executable path.
*   **Clear Feedback:** Provides informational and error messages to guide you (e.g., if launching fails or when the path is updated).

*(A screenshot of the rocket icon in the VS Code editor title bar would be great here! You can add one after publishing.)*

## Requirements

*   **Visual Studio Code:** Version 1.100.0 or higher.
*   **Kerbal Space Program:** Installed on your system.
*   **Steam Client (Optional):** Required only if you intend to launch KSP via Steam. It should be installed and running.

## How to Use

1.  Install the "Kerbal Space Program Launcher" extension from the VS Code Marketplace.
2.  Open any Kerbal Space Program configuration file (a file ending with `.cfg`).
3.  Look for the rocket icon (`$(rocket)`) in the editor's title bar (usually at the top right).
4.  Click the icon to launch Kerbal Space Program!
    *   If it's your first time and you haven't set a custom path, you'll be prompted to either set one or proceed with a Steam launch attempt.

## Configuration

This extension contributes the following setting, which can be found in your VS Code User or Workspace Settings:

*   **`kerbalSpaceProgramLauncher.kspExecutablePath`**:
    *   **Description:** The full path to your Kerbal Space Program executable.
        *   Example (Windows): `C:\Program Files (x86)\Steam\steamapps\common\Kerbal Space Program\KSP_x64.exe`
        *   Example (macOS): `/Applications/Kerbal Space Program.app`
        *   Example (Linux): `/path/to/your/KSP/KSP.x86_64`
    *   **How to set:**
        1.  Manually in VS Code Settings (File > Preferences > Settings, then search for "Kerbal Space Program Launcher").
        2.  Via the command: Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type/select `Kerbal Space Program Launcher: Set Kerbal Space Program Executable Path`. This will open a file dialog.
    *   If this path is set, the extension will use it to launch KSP. Otherwise, it defaults to the Steam launch method.

## Commands

The following commands are available from the Command Palette:

*   **`Kerbal Space Program Launcher: Run KSP`**:
    *   Launches Kerbal Space Program.
    *   Bound to the rocket icon in the editor title for `.cfg` files.
*   **`Kerbal Space Program Launcher: Set Kerbal Space Program Executable Path`**:
    *   Allows you to select the KSP executable file. The path is saved globally.

## Known Issues

*   **Steam Launch Failures:** If launching via Steam fails, ensure the Steam client is running, you are logged in, and KSP (AppID 220200) is correctly installed under your Steam account. The extension will provide an option to set a direct path if a Steam launch fails.
*   **Custom Path Failures:** If a custom executable path is set but launching fails, verify the path is correct and the game files are intact.
*   Please report any other issues on the [GitHub repository issues page](https://github.com/your-github-username/kerbal-space-program-launcher/issues) (replace with your actual link after creating the repo).

## Release Notes

See the [CHANGELOG.md](CHANGELOG.md) file for details on each release.

---

**Enjoy launching your rockets with ease from VS Code!**
