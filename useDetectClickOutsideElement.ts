import { RefObject, useEffect } from 'react';

/**
 * Custom React hook to detect clicks outside a specified DOM element
 * and trigger a callback function when a click occurs.
 *
 * @param ref - A reference to the DOM element to monitor for clicks outside.
 * @param callback - The callback function to execute when a click is detected outside the element.
 * @param excludedRef - An array of references to DOM elements that should be excluded from triggering the callback.
 */
const useDetectClickOutsideElement = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
  excludedRef: RefObject<HTMLElement>[]
) => {
  useEffect(() => {
    /**
     * Event handler function to check if a click occurred outside the specified element
     * and not on any of the excluded elements. If so, it triggers the callback.
     *
     * @param event - The mouse click event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !excludedRef.some(
          (excluded) => excluded.current?.contains(event.target as Node)
        )
      ) {
        callback(event);
      }
    };

    // Add an event listener to detect clicks outside the element.
    document.addEventListener('mousedown', handleClickOutside);

    // Remove the event listener when the component unmounts.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, excludedRef, callback]);
};

export default useDetectClickOutsideElement;
