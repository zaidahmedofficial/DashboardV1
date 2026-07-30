import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type VariantConfig = {
  variants?: Record<string, Record<string, string>>;
  compoundVariants?: Array<Record<string, string> & { class?: string }>;
  defaultVariants?: Record<string, string>;
};

type VariantProps<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R
  ? R
  : never;

export function cva(
  base: string,
  config?: VariantConfig
): (props?: Record<string, string | undefined> & { className?: string }) => string {
  return (props = {}) => {
    const result: string[] = [base];

    if (config?.variants) {
      for (const key in config.variants) {
        const variantValue = props[key];
        if (variantValue && config.variants![key][variantValue]) {
          result.push(config.variants![key][variantValue]);
        }
      }
    }

    if (config?.compoundVariants) {
      for (const cv of config.compoundVariants) {
        let match = true;
        for (const key in cv) {
          if (key === "class") continue;
          if (props[key] !== cv[key]) {
            match = false;
            break;
          }
        }
        if (match) {
          result.push(cv.class || "");
        }
      }
    }

    if (props.className) {
      result.push(props.className);
    }

    return result.filter(Boolean).join(" ");
  };
}

export type { VariantProps };
