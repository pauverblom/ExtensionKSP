## GitHub Copilot Instructions

This document provides instructions for GitHub Copilot to assist with the development of the "Kerbal Space Program Launcher" VS Code extension.

**Project Goal:** Create a VS Code extension that adds a green run button to the editor title bar for any `.cfg` file. Clicking this button should launch the Kerbal Space Program game.

**Key Tasks:**

1.  **Implement the "Run KSP" Button:**
    *   **Contribution Point:** Add a `menus` contribution in `package.json` for `editor/title`.
        *   Target `.cfg` files using the `when` clause with `resourceLangId == kerbal` (or a similar appropriate context key if `kerbal` is not a recognized language ID for `.cfg` files; investigate alternatives like `resourceExtname == .cfg`).
        *   The command triggered should be `kerbal-space-program-launcher.runKSP`.
        *   Set the button `icon` to a suitable "play" or "rocket" icon (e.g., `$(rocket)` or `$(play)` if available, or specify a path to a custom SVG icon). The icon should be green.
    *   **Command Implementation:** In `src/extension.ts`:
        *   Register the command `kerbal-space-program-launcher.runKSP`.
        *   The command handler should execute a shell command to launch Kerbal Space Program.
            *   **Windows:** `start steam://rungameid/220200` (KSP's Steam App ID)
            *   **macOS:** `open steam://rungameid/220200`
            *   **Linux:** `xdg-open steam://rungameid/220200`
            *   The extension should try to detect the operating system and use the appropriate command.
        *   Provide user feedback (e.g., an informational message) upon attempting to launch the game.

2.  **Language Definition (Optional but Recommended):**
    *   If `.cfg` files are not automatically recognized with a specific language ID that can be targeted in the `when` clause, consider adding a basic language definition for "Kerbal Config Files".
    *   This would involve adding a `languages` contribution in `package.json` and potentially a simple language configuration file. This makes the `when` clause more robust.

3.  **Icon:**
    *   If using a custom SVG icon for the button, create an `icons` folder (e.g., `resources/icons` or `icons`) and place the SVG file there.
    *   Ensure the `package.json` entry for the icon path is correct.
    *   The icon should be a simple, clear "play" or "rocket" symbol, and its fill color should be green.

4.  **README.md:**
    *   Update `README.md` with:
        *   A clear description of the extension's functionality.
        *   Instructions on how to use it (i.e., open a `.cfg` file and click the button).
        *   Mention the green run button.
        *   Any prerequisites (e.g., Kerbal Space Program installed via Steam).

5.  **Testing:**
    *   Manually test the extension on Windows, macOS, and Linux (if possible) by:
        *   Opening a `.cfg` file.
        *   Verifying the green run button appears.
        *   Clicking the button and confirming KSP attempts to launch via Steam.
    *   No automated tests are strictly required for the core launch functionality for this iteration, but ensure the extension loads and the command registration does not throw errors.

**Code Style and Best Practices:**

*   Follow standard TypeScript and VS Code extension development best practices.
*   Ensure code is well-commented, especially the command logic and platform detection.
*   Keep the extension lightweight and focused on its primary task.

**Error Handling:**

*   If Steam is not installed or KSP is not installed, the `steam://` URL scheme might not work. The extension should ideally inform the user if the launch command fails, though complex error detection is not a primary goal for the initial version. A simple `vscode.window.showErrorMessage` upon command execution failure would be sufficient.

**Platform Considerations:**

*   The primary method for launching KSP will be via its Steam App ID (220200). This is generally platform-agnostic once the correct OS-level command to open a URL is used.
*   The extension should use `process.platform` (`win32`, `darwin`, `linux`) to determine the correct shell command.

Let's start by modifying `package.json` to add the menu contribution and then implement the command in `src/extension.ts`.
