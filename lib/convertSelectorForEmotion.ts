import * as parseSelector from "postcss-selector-parser";

import { convertScopeToModuleName } from "./convertScopeToModuleName";

export function convertSelectorForEmotion(
    selector: string,
    scope: string,
    knownScopes: Set<string>,
): string {
    return parseSelector((nodes: any) => {
        nodes.first.walkClasses((node: any) => {
            if (node.toString() === scope) {
                node.toString = () => "&";
            } else if (knownScopes.has(node.toString())) {
                node.toString = () =>
                    ".${" + convertScopeToModuleName(node.value) + "()}";
            }
        });
    }).processSync(selector);
}
