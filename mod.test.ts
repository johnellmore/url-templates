import { url, unsafeComponent, withBase } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";

Deno.test("URL with no parts can be returned", () => {
  const x = url`http://example.com/`;
  assertEquals(x.toString(), "http://example.com/");
});

Deno.test("URL with interpolated path segments is correctly assembled", () => {
  const x = url`http://example.com/a-number/${1337}/a-string/${"leet"}/`;
  assertEquals(x.toString(), "http://example.com/a-number/1337/a-string/leet/");
});

Deno.test("URL with unsafe path is escaped during assembly", () => {
  const x = url`http://example.com/first/${'../evil'}/third`;
  assertEquals(x.toString(), 'http://example.com/first/..%2Fevil/third');
});

Deno.test("URL with marked unsafe component is assembled untouched", () => {
  const x = url`http://example.com/first/${unsafeComponent('../trusted')}/third`;
  assertEquals(x.toString(), 'http://example.com/trusted/third');
});

Deno.test("URL with marked unsafe component is assembled untouched", () => {
  const baseUrl = withBase("http://example.com/");
  const x = baseUrl`/first/${1337}/third`;
  assertEquals(x.toString(), 'http://example.com/first/1337/third');
});
