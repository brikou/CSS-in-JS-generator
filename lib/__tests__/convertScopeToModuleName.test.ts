import { convertScopeToModuleName } from "../convertScopeToModuleName";

test("convertScopeToModuleName", () => {
    [
        [".LIST-GROUP", "listGroup"],
        [".border-top-0", "borderTop_0"],
        [".break", "_break"],
        [".list-group", "listGroup"],
        [".navbar-expand-sm", "navbarExpandSm"],
        ["PRE", "Pre"],
        ["h1", "H1"],
        ["pre", "Pre"],
        ["root", "root"],
    ].forEach(([scope, moduleName]) => {
        expect(
            convertScopeToModuleName(scope as string),
        ).toEqual(moduleName);
    });
});
