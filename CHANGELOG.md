# Change Log

All notable changes to the "kerbal-space-program-launcher" extension will be documented in this file.

## [0.0.1] - 2025-05-21

### Added
- Initial release of the Kerbal Space Program Launcher.
- Adds a rocket icon button to the editor title bar for `.cfg` files to launch Kerbal Space Program.
- Supports launching KSP via Steam (default) or a user-defined executable path.
- Prompts user to set KSP executable path on first launch attempt if not already configured; this prompt appears only once per installation.
- Command `Kerbal Space Program Launcher: Run KSP` to launch the game.
- Command `Kerbal Space Program Launcher: Set Kerbal Space Program Executable Path` to allow users to specify the game's location.
- Configuration setting `kerbalSpaceProgramLauncher.kspExecutablePath` to store the custom KSP path.
- Platform-specific launch commands for Windows, macOS, and Linux.
- Enhanced error messages to guide users if launching fails, with an option to set the path if a Steam launch fails.