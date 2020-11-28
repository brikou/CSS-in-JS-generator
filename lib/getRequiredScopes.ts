import * as postcss from "postcss";
import * as parseSelector from "postcss-selector-parser";

import { getSelectorScope } from "./getSelectorScope";

export function getRequiredScopes(
    css: string,
    scope: string,
    knownScopes: Set<string>,
): Set<string> {
    const requiredScopes: Set<string> = new Set();

    const root = postcss.parse(css);
    root.walkRules((rule) => {
        parseSelector((nodes: any) => {
            nodes.walkClasses((node: any) => {
                const selectorScope = getSelectorScope(node.toString());
                if (selectorScope === scope) {
                    return;
                }

                if (knownScopes.has(selectorScope)) {
                    requiredScopes.add(selectorScope);
                }
            });
        }).processSync(rule.selector);
    });

    return requiredScopes;
}
