import { customProperty } from "../core/utils/format.ts";
import { isEmptyObject } from "../deps.ts";
import { astify } from "../core/ast.ts";
import type { PreProcessor } from "../core/types.ts";

export const twCustomPropertyInjector: PreProcessor = {
  name: "tw-custom-property-injector",
  fn: (root, { variablePrefix }) => {
    function customPropertyWith(property: string) {
      return customProperty(property, variablePrefix);
    }

    const customPropertyMap = {
      "translate-x": 0,
      "translate-y": 0,
      rotate: 0,
      "skew-x": 0,
      "skew-y": 0,
      "scale-x": 1,
      "scale-y": 1,
      "scroll-snap-strictness": "proximity",
      "ring-inset": " ",
      "ring-offset-width": "0px",
      "ring-offset-color": "#fff",
      "ring-color": "rgb(59 130 246/.5)",
      "ring-offset-shadow": "0 0 #0000",
      "ring-shadow": "0 0 #0000",
      shadow: "0 0 #0000",
      "shadow-colored": "0 0 #0000",
      blur: " ",
      brightness: " ",
      contrast: " ",
      grayscale: " ",
      "hue-rotate": " ",
      invert: " ",
      saturate: " ",
      sepia: " ",
      "drop-shadow": " ",
      "backdrop-blur": " ",
      "backdrop-brightness": " ",
      "backdrop-contrast": " ",
      "backdrop-grayscale": " ",
      "backdrop-hue-rotate": " ",
      "backdrop-invert": " ",
      "backdrop-opacity": " ",
      "backdrop-saturate": " ",
      "backdrop-sepia": " ",
    };

    const declaration = Object.entries(customPropertyMap).reduce(
      (acc, [key, value]) => {
        const property = customPropertyWith(key);
        const cache: Record<string, string | number> = {};
        root.walkDecls((decl) => {
          if (decl.value.includes(property)) {
            cache[property] = value;
            return false;
          }
        });

        return { ...acc, ...cache };
      },
      {},
    );

    if (!isEmptyObject(declaration)) {
      const newRoot = astify({
        "*, ::before, ::after": declaration,
      });

      root.prepend(newRoot);
    }

    return root;
  },
};
