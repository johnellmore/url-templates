import { url } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";

Deno.test("simple URL with no parts can be returned", () => {
  const x = url`http://example.com/`;
  assertEquals(x.toString(), "http://example.com/");
});
