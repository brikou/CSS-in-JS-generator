import {parse} from "postcss";
import {stringify} from "postcss";
import type {AnyNode} from "postcss";

import { convertSelectorForEmotion } from "./convertSelectorForEmotion";
import { escapeScopedCss } from "./escapeScopedCss";

export function convertScopedCssForEmotion(
    scopedCss: string,
    scope: string,
    knownScopes: Set<string>,
): string {
    let scopedCssForEmotion = "";

    function builder(
        output: string,
        node?: AnyNode,
        flag?: "start" | "end",
    ) {
        if (
            (flag === "start" || flag === "end") &&
            node &&
            node.type === "rule"
        ) {
            if (node.selector === scope) {
                if (node.parent.type === "root") {
                    return;
                } else if (flag === "start") {
                    output = "& {";
                }
            } else {
                if (flag === "start") {
                    const convertedSelectors: Set<string> = new Set();

                    (node.selectors || []).forEach((selector) => {
                        convertedSelectors.add(
                            convertSelectorForEmotion(
                                selector,
                                scope,
                                knownScopes,
                            ),
                        );
                    });

                    // TODO remove join usage once https://github.com/prettier/prettier/issues/2883 is resolved
                    output = `${[...convertedSelectors].join(", ")} {`;
                }
            }
        }

        scopedCssForEmotion += output;
    }

    stringify(parse(scopedCss), builder)

    return escapeScopedCss(scopedCssForEmotion);
}
