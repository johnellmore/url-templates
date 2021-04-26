## URL tagged templates in TypeScript

This allows you to safely construct URLs from unsanitized input in an expressive way via JS [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). It visually looks similarly to string interpolation, but it escapes interpolated values by default. It still provides an escape hatch if you need to embed raw data directly.

Basic example:
```typescript
import { url } from "./mod.ts";

const id = 77;
const username = '../path-traversal';
const safeUrl = url`http://example.com/user/${id}/${username}`;
// safeUrl is a `URL` instance
console.log(safeUrl.toString());
// "http://example.com/user/77/..%2Fpath-traversal"
```

Using raw data via the `unsafeComponent()` wrapper:
```typescript
import { url, unsafeComponent } from "./mod.ts";

const username = 'bilbobaggins';
const utmParams = '?utm_campaign=suchandsuch';
const safeUrl = url`http://example.com/${username}${unsafeComponent(utmParams)}`;
console.log(safeUrl.toString());
// "http://example.com/bilbobaggins?utm_campaign=suchandsuch"
```

Constructing URLs relative to another (e.g. relative to your application's base URL):
```typescript
import { url, urlRelativeTo } from "./mod.ts";

const baseUrl = urlRelativeTo('http://example.com');
const username = 'malreynolds';
const safeUrl = baseUrl`/${username}/profile`;
console.log(safeUrl.toString());
// "http://example.com/malreynolds/profile"
```
