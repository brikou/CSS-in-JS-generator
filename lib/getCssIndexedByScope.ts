import {parse} from "postcss";
import type {Node} from "postcss";
import Stringifier from "postcss/lib/stringifier";

import { getNodeScopes } from "./getNodeScopes";
import { getSelectorScope } from "./getSelectorScope";

export function getCssIndexedByScope(css: string): Map<string, string> {
    const cssIndexedByScope = new Map();

    const scopesStack = [new Set(["root"])];

    function builder(
        output: string,
        node?: Node,
        flag?: "start" | "end",
    ) {
        if (flag === "start" && node) {
            scopesStack.push(getNodeScopes(node));
        }

        if (flag === "end") {
            output += "\n\n";
        }

        scopesStack[scopesStack.length - 1].forEach((scope) => {
            if (cssIndexedByScope.has(scope) === false) {
                cssIndexedByScope.set(scope, "");
            }

            if (
                flag === "start" &&
                node &&
                node.type === "rule" &&
                (node.parent.type !== "atrule" ||
                    /keyframes$/.test(node.parent.name) === false)
            ) {
                output = `${(node.selectors || [])
                    .filter(
                        (selector) => getSelectorScope(selector) === scope,
                    )} {`;
            }

            cssIndexedByScope.set(scope, cssIndexedByScope.get(scope) + output);
        });

        if (flag === "end") {
            scopesStack.pop();
        }
    }

    (new Stringifier(builder)).stringify(
        parse(css),
    );

    return cssIndexedByScope;
}
