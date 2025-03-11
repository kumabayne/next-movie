import { IntersectionObserverMock } from "./intersectionObserver.mock";
import { matchMediaMock } from "./matchMedia.mock";
import { resizeObserverMock } from "./resizeObserver.mock";

export function EmblaMocks() {
  IntersectionObserverMock();
  matchMediaMock();
  resizeObserverMock();
}
