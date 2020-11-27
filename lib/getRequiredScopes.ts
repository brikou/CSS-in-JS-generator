import { parse } from "postcss";
import parse from "postcss-selector-parser";
import { Container, ClassName } from "postcss-selector-parser";

import { getSelectorScope } from "./getSelectorScope";


export function getRequiredScopes(
    css: string,
    scope: string,
    knownScopes: Set<string>,
): Set<string> {
    const requiredScopes = new Set();

    const root = parse(css);
    root.walkRules((rule) => {
        parse((selectors: Container) => {
            selectors.walkClasses((className: ClassName) => {
                const selectorScope = getSelectorScope(className.toString());
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
