import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";
import "whatwg-fetch";

configure({
  testIdAttribute: "data-test-id",
});
