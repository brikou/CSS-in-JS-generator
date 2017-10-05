import { convertSelectorForEmotion } from "../convertSelectorForEmotion";

test("convertSelectorForEmotion", () => {
    [
        [
            [
                ".list-inline-item:not(:last-child)",
                ".list-inline-item",
                new Set(["root", ".list-inline-item"]),
            ],
            "&:not(:last-child)",
        ],
        [
            [
                ".no-gutters > .col",
                ".no-gutters",
                new Set(["root", ".no-gutters", ".col"]),
            ],
            "& > .${col}",
        ],
        [
            [
                ".alert-primary .alert-link",
                ".alert-primary",
                new Set(["root", ".alert-primary", ".alert-link"]),
            ],
            "& .${alertLink}",
        ],
    ].forEach(([[selector, scope, knownScopes], convertedSelector]) => {
        expect(
            convertSelectorForEmotion(
                selector as string,
                scope as string,
                knownScopes as Set<string>,
            ),
        ).toEqual(convertedSelector);
    });
});
