import { shuffle } from "lodash";

import { getScopePath } from "../getScopePath";

test("getScopePath", () => {
    const knownScopes = new Set(
        shuffle([
            "root",
            ".active",
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
        ]),
    );

    [
        ["root", "index.js"],
        [".active", "active.js"],
        [".border", "border.js"],
        [".border-top-0", "border/top-0.js"],
        [".list-group", "list-group.js"],
        [".list-group-item", "list-group/item.js"],
        [".list-group-item-action", "list-group/item/action.js"],
        [".navbar", "navbar.js"],
        [".navbar-expand", "navbar/expand.js"],
        [".navbar-expand-sm", "navbar/expand/sm.js"],
        [".text-sm-center", "text-sm/center.js"],
    ].forEach(([scope, scopePath]) => {
        expect(
            getScopePath(scope as string, knownScopes as Set<string>),
        ).toEqual(scopePath);
    });
});
