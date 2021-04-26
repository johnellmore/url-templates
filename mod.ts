function stringify(component: unknown): string {
  if (component instanceof UnsafeUrlComponent) {
    return '' + component.component;
  } else {
    return encodeURIComponent('' + component);
  }
}

function assembleSegments(strings: TemplateStringsArray, vars: unknown[]): string {
  const parts: string[] = [];
  strings.forEach((str, index) => {
    parts.push(str);
    const nextVar = vars[index];
    if (nextVar !== undefined) {
      parts.push(stringify(nextVar));
    }
  });
  return parts.join('');
}

class UnsafeUrlComponent {
  constructor(
    readonly component: unknown
  ) {}
}

export function unsafeComponent(component: unknown): UnsafeUrlComponent {
  return new UnsafeUrlComponent(component);
}

export function url(strings: TemplateStringsArray, ...vars: unknown[]): URL {
  const contents = assembleSegments(strings, vars);
  return new URL(contents);
}

export function withBase(baseUrl: string) {
  return (strings: TemplateStringsArray, ...vars: unknown[]): URL => {
    const contents = assembleSegments(strings, vars);
    return new URL(contents, baseUrl);
  }
}
