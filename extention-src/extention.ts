import * as vscode from "vscode";

import registerWebView from "./registerWebView";

export function activate(context: vscode.ExtensionContext) {
  registerWebView(context);
}

export function deactivate() {}

// async function readFile(filePath: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// }

// import traverse from "@babel/traverse";
// import * as babel from "@babel/parser";

// const parse = () => {
//   readFile("filePath")
//     .then((fileData) => {
//       const ast = babel.parse(fileData, {
//         sourceType: "module",
//         plugins: ["jsx", "typescript"],
//       });

//       let root: TreeNode;

//       traverse(ast, {
//         CallExpression(path) {
//           const callee = path.node.callee;

//           if (
//             callee.type === "Identifier" &&
//             ["useEffect", "useCallback", "useMemo"].includes(callee.name)
//           ) {
//             root = new TreeNode(callee.name);

//             const [_, deps] = path.node.arguments;

//             if (deps && deps.type === "ArrayExpression") {
//               deps.elements.forEach((element) => {
//                 if (element?.type === "Identifier") {
//                   const dependencyNode = new TreeNode(element.name);
//                   root.addChild(dependencyNode);
//                 }
//               });
//             }
//           }
//         },
//       });

//       if (root === undefined) {
//         console.log("No hooks found");
//       } else {
//         console.log(root);
//       }
//     })
//     .catch((err) => console.log(err));
// };
