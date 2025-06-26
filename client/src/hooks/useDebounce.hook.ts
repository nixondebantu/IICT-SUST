import { useEffect, useState } from "react";

/**
 * A custom React hook that debounces a value.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds. Defaults to 500ms.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay?: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Set a timer to update the debounced value after the specified delay
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay || 500); // Use provided delay or default to 500ms

      // Cleanup function: This will be called before the effect is re-executed
      // or when the component unmounts. It clears the previous timer.
      return () => {
        clearTimeout(timer);
      };
    },
    // This effect will only re-run if the `value` or `delay` changes
    [value, delay]
  );

  // Return the debounced value
  return debouncedValue;
}
