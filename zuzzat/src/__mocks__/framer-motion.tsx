/* eslint-disable @typescript-eslint/no-unused-vars, react/display-name */
import React from "react";

const MOTION_PROPS = new Set([
  "whileTap", "whileHover", "whileFocus", "whileInView", "whileDrag",
  "initial", "animate", "exit", "transition", "variants", "layout",
  "dragConstraints", "dragElastic", "onDragEnd",
]);

const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) =>
      React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
        const filtered: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(props)) {
          if (!MOTION_PROPS.has(k)) filtered[k] = v;
        }
        return React.createElement(prop, { ...filtered, ref });
      }),
  }
);

const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export { motion, AnimatePresence };
