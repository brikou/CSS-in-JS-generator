import { getScopeRelativePath } from "../getScopeRelativePath";

test("getScopeRelativePath", () => {
    const knownScopes = new Set([
        "root",
        ".border",
        ".border-top-0",
        ".list-group",
        ".list-group-item",
        ".list-group-item-action",
        ".navbar",
        ".navbar-expand",
        ".navbar-expand-sm",
        ".text-sm-center",
        ".text-sm-left",
        ".text-sm-right",
    ]);

    [
        [["root", "root"], "index.js"],
        [["root", ".border"], "border.js"],
        [[".list-group-item-action", ".list-group-item"], "../item.js"],
        [[".navbar", ".navbar-expand-sm"], "navbar/expand/sm.js"],
        [[".navbar-expand-sm", ".text-sm-center"], "../../text-sm/center.js"],
    ].forEach(([[fromScope, toScope], scopeRelativePath]) => {
        expect(getScopeRelativePath(fromScope, toScope, knownScopes)).toEqual(
            scopeRelativePath,
        );
    });
});
