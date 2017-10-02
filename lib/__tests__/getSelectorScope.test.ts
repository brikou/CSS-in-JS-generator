import { getSelectorScope } from "../getSelectorScope";

test("getSelectorScope", () => {
    [
        ["*::before", "root"],
        [".list-inline-item:not(:last-child)", ".list-inline-item"],
        [".no-gutters > .col", ".no-gutters"],
        ["abbr[title]", "root"],
        ["h1", "root"],
        ['[role="button"]', "root"],
        ["a.bg-primary:focus", ".bg-primary"],
    ].forEach(([selector, selectorScope]) => {
        expect(getSelectorScope(selector)).toEqual(selectorScope);
    });
});
