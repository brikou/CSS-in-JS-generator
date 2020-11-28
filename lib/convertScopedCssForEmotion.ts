import * as postcss from "postcss";
import Stringifier from "postcss/lib/stringifier";

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
        node?: postcss.Node,
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

    (new Stringifier(builder) as postcss.Stringifier).stringify(
        postcss.parse(scopedCss),
    );

    return escapeScopedCss(scopedCssForEmotion);
}
