import { getSelectorScope } from "../getSelectorScope";

test("getSelectorScope", () => {
    [
        ["*::before", "root"],
        [".list-inline-item:not(:last-child)", ".list-inline-item"],
        [".no-gutters > .col", ".no-gutters"],
        ["IMG", "img"],
        ["a.bg-primary:focus", ".bg-primary"],
        ["abbr[title]", "abbr"],
        ["body", "root"],
        ["h1", "h1"],
        ["html", "root"],
        ["ul li", "ul"],
        ['[role="button"]', "root"],
    ].forEach(([selector, selectorScope]) => {
        expect(getSelectorScope(selector)).toEqual(selectorScope);
    });
});
