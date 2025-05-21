// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as process from 'process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "kerbal-space-program-launcher" is now active!');

	// Register the command to set the KSP path
	const setKSPPathCommand = vscode.commands.registerCommand('kerbal-space-program-launcher.setKSPPath', async () => {
		const options: vscode.OpenDialogOptions = {
			canSelectMany: false,
			openLabel: 'Select KSP Executable',
			// Filters might need adjustment based on typical KSP executable names/types per OS
			filters: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'KSP Executable': process.platform === 'darwin' ? ['app'] : ['exe', 'x86_64', 'x86', 'bin', ''], // Common executable extensions/names
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'All files': ['*']
			}
		};

		const fileUri = await vscode.window.showOpenDialog(options);
		if (fileUri && fileUri[0]) {
			const kspPath = fileUri[0].fsPath;
			await vscode.workspace.getConfiguration('kerbalSpaceProgramLauncher').update('kspExecutablePath', kspPath, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage(`Kerbal Space Program executable path set to: ${kspPath}`);
		} else {
			vscode.window.showInformationMessage('No file selected. KSP executable path not changed.');
		}
	});

	// Register the command to run KSP (which now includes the first-time prompt logic)
	const runKSPCommand = vscode.commands.registerCommand('kerbal-space-program-launcher.runKSP', async () => {
		const config = vscode.workspace.getConfiguration('kerbalSpaceProgramLauncher');
		let kspExecutablePath = config.get<string | null>('kspExecutablePath');
		const promptedStateKey = 'kspLauncher.hasPromptedForPath'; // Persists across sessions

		if (!kspExecutablePath && !context.globalState.get(promptedStateKey)) {
			const selection = await vscode.window.showInformationMessage(
				'Kerbal Space Program executable path is not set. Would you like to set it now? If not, KSP will attempt to launch via Steam.',
				{ modal: true }, // Modal to ensure user interacts
				'Set KSP Path',
				'Use Steam / Later'
			);

			// Mark as prompted REGARDLESS of choice, to ensure it's only asked once per installation.
			await context.globalState.update(promptedStateKey, true);

			if (selection === 'Set KSP Path') {
				await vscode.commands.executeCommand('kerbal-space-program-launcher.setKSPPath');
				// After attempting to set the path, check if it was actually set and inform the user.
				// Do not proceed to launch this time; user can click run again.
				const newPath = vscode.workspace.getConfiguration('kerbalSpaceProgramLauncher').get<string | null>('kspExecutablePath');
				if (newPath) {
					vscode.window.showInformationMessage(`KSP path configured. Click the run button again to launch.`);
				} else {
					vscode.window.showInformationMessage(`KSP path not configured. Click the run button again to use Steam or set the path via the command palette.`);
				}
				return; // Exit runKSPCommand here
			}
			// If 'Use Steam / Later' or dismissed, kspExecutablePath remains null,
			// and we proceed to the launch logic below.
		}

		// --- Actual Launch Logic ---
		// Re-fetch kspExecutablePath in case it was set by a concurrent process or if the prompt logic modified it
		// (though in the current flow, if prompt sets it, we return early).
		kspExecutablePath = config.get<string | null>('kspExecutablePath');
		let commandToExecute = '';

		if (kspExecutablePath) {
			// Use the custom path if provided
			commandToExecute = `"${kspExecutablePath}"`; // Base command: quoted path
			if (process.platform === 'darwin' && kspExecutablePath.endsWith('.app')) {
				commandToExecute = `open -a "${kspExecutablePath}"`;
			} else if (process.platform === 'win32') {
				// Using 'start ""' helps with paths containing spaces and avoids cmd window staying open.
				commandToExecute = `start "" "${kspExecutablePath}"`;
			}
			// For Linux, directly executing the quoted path is usually fine.
		} else {
			// Fallback to Steam launch
			switch (process.platform) {
				case 'win32':
					commandToExecute = 'start steam://rungameid/220200';
					break;
				case 'darwin':
					commandToExecute = 'open steam://rungameid/220200';
					break;
				case 'linux':
					commandToExecute = 'xdg-open steam://rungameid/220200';
					break;
				default:
					vscode.window.showErrorMessage('Unsupported platform for launching KSP via Steam.');
					return;
			}
		}

		if (!commandToExecute) {
			vscode.window.showErrorMessage('Could not determine the command to launch KSP.');
			return;
		}

		cp.exec(commandToExecute, (err) => {
			if (err) {
				console.error(err);
				// Check if this was a Steam launch attempt
				if (!kspExecutablePath) { // kspExecutablePath was null, so it was a Steam attempt
					vscode.window.showErrorMessage(
						'Failed to launch KSP via Steam. Please ensure Steam is installed, running, and KSP (AppID 220200) is installed. If KSP is installed elsewhere, you can set the executable path.',
						{ modal: false },
						'Set KSP Path'
					).then(selection => {
						if (selection === 'Set KSP Path') {
							vscode.commands.executeCommand('kerbal-space-program-launcher.setKSPPath');
						}
					});
				} else { // A custom path was set and failed
					vscode.window.showErrorMessage('Failed to launch Kerbal Space Program using the configured path. Please check your KSP installation and the executable path setting.');
				}
				return;
			}
			vscode.window.showInformationMessage('Launching Kerbal Space Program...');
		});
	});

	context.subscriptions.push(runKSPCommand, setKSPPathCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
