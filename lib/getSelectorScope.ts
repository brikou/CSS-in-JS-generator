import * as parseSelector from "postcss-selector-parser";

export function getSelectorScope(selector: string): string {
    let selectorScope = "root";

    parseSelector((nodes: any) => {
        for (const node of nodes.first.nodes) {
            if (node.type === "class") {
                selectorScope = node.toString();
                break;
            }
        }
    }).processSync(selector);

    return selectorScope;
}
