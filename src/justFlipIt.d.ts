declare namespace justFlipIt {
  interface StyleOption {
    el: string;
    style: Partial<CSSStyleDeclaration>;
  }

  interface Options {
    /**
     * Template for the back side of the flipped element
     */
    Template?: string;

    /**
     * Click behavior. True for click toggle, selector string for delegated click, false for hover
     */
    Click?: boolean | string;

    /**
     * Flip direction. True for X-axis, false for Y-axis
     */
    FlipX?: boolean;

    /**
     * Custom styles to apply to elements
     */
    Style?: StyleOption[];
  }

  /**
   * Destroy flip instances matching the selector
   */
  function destroy(selector: string | Element | NodeListOf<Element> | HTMLCollection): void;
}

/**
 * Initialize flip effect on matching elements
 */
declare function justFlipIt(
  selector: string | Element | NodeListOf<Element> | HTMLCollection,
  options?: justFlipIt.Options
): any;

export = justFlipIt;
