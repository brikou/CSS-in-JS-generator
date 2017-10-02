export function escapeScopedCss(scopedCss: string): string {
    return scopedCss.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}
