export function url(strings: TemplateStringsArray, ...vars: unknown[]): URL {
    return new URL(strings[0]);
}
