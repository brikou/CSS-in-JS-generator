import * as parseSelector from "postcss-selector-parser";

import { convertScopeToModuleName } from "./convertScopeToModuleName";

export function convertSelectorForEmotion(
    selector: string,
    scope: string,
    knownScopes: Set<string>,
): string {
    return parseSelector((nodes: any) => {
        nodes.first.walk((node: any) => {
            if (node.type === "class") {
                if (node.toString() === scope) {
                    node.toString = () => "&";
                } else if (knownScopes.has(node.toString())) {
                    node.toString = () =>
                        `.\${${convertScopeToModuleName(`.${node.value}`)}}`;
                }
            } else if (node.type === "tag") {
                if (node.toString() === scope) {
                    node.toString = () => "&";
                }
            }
        });
    }).processSync(selector);
}
