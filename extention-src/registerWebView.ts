import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

import { START } from "./commands";
import getNonce from "./getNonce";
import {
  BASE,
  CSP_SOURCE,
  NONCE,
  SCRIPT_SRC,
  STYLE_SRC,
  HMR_HOST,
  HMR_HOST_WS,
} from "./replaceables";

export default async function registerWebView(
  extensionContext: vscode.ExtensionContext
) {
  const disposable = vscode.commands.registerCommand(START, async function () {
    const extPath = extensionContext.extensionPath;
    const isDevelopment = process.env.EXTENTION_ENV === "development";

    let hmrHost = "";
    let hmrHostWS = "";
    let externalDevServerUri: vscode.Uri | undefined = undefined;

    if (isDevelopment) {
      const localDevServerUri = vscode.Uri.parse(process.env.DEV_SERVER_URL!);
      externalDevServerUri = await vscode.env.asExternalUri(localDevServerUri);

      hmrHost = externalDevServerUri.toString();

      hmrHostWS =
        externalDevServerUri.scheme === "https"
          ? hmrHost.replace(/^https/, "wss")
          : hmrHost.replace(/^http/, "ws");
    }

    const panel = vscode.window.createWebviewPanel(
      "react-dependencies-bluprint-view",
      "React Dependencies Bluprint",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(extPath, "build")),
          vscode.Uri.file(path.join(extPath, "build", "extention")),
          vscode.Uri.file(path.join(extPath, "build", "webview")),
        ],
      }
    );

    const basePath = isDevelopment
      ? hmrHost
      : panel.webview.asWebviewUri(
          vscode.Uri.file(path.join(extPath, "build", "webview"))
        );

    const panelPath = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(extPath, "extention-src", "index.html"))
    );

    const stylesPath = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(extPath, "extention-src", "styles.css"))
    );

    let scriptPath: string;

    if (externalDevServerUri) {
      scriptPath = vscode.Uri.joinPath(
        externalDevServerUri,
        "webview.js"
      ).toString();
    } else {
      scriptPath = panel.webview
        .asWebviewUri(
          vscode.Uri.file(path.join(extPath, "build", "webview", "webview.js"))
        )
        .toString();
    }

    const nonce = getNonce();

    const template = fs
      .readFileSync(panelPath.fsPath, "utf-8")
      .replace(BASE, basePath.toString())
      .replace(STYLE_SRC, stylesPath.toString())
      .replace(SCRIPT_SRC, scriptPath)
      // order matters
      .replace(HMR_HOST_WS, hmrHostWS)
      .replace(new RegExp(HMR_HOST, "g"), hmrHost)
      //
      .replace(new RegExp(CSP_SOURCE, "g"), panel.webview.cspSource)
      .replace(new RegExp(NONCE, "g"), nonce);

    panel.webview.html = template;
  });

  extensionContext.subscriptions.push(disposable);
}
