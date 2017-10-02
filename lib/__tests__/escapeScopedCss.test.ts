import { escapeScopedCss } from "../escapeScopedCss";

test("escapeScopedCss", () => {
    expect(
        escapeScopedCss(
            "// ...example in a `will-change` rule.\n" +
            '&::before { content: "\\2014 \\00A0"; }\n' +
                "& .${alertLink} { color: #002752; }",
        ),
    ).toEqual(
        "// ...example in a \\`will-change\\` rule.\n" +
        '&::before { content: "\\\\2014 \\\\00A0"; }\n' +
            "& .${alertLink} { color: #002752; }",
    );
});
