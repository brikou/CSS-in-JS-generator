import { convertScopeToModuleName } from "../convertScopeToModuleName";

test("convertScopeToModuleName", () => {
    [
        ["root", "root"],
        [".list-group", "listGroup"],
        [".border-top-0", "borderTop0"],
        [".navbar-expand-sm", "navbarExpandSm"],
    ].forEach(([scope, moduleName]) => {
        expect(
            convertScopeToModuleName(scope as string),
        ).toEqual(moduleName);
    });
});
