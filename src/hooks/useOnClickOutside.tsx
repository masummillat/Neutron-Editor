import { RefObject, useCallback, useEffect, useRef } from 'react';

const useOnClickOutside: (handler: () => void) => [any] = (handler) => {
  const ref: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const escapeListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handler();
      }
    },
    [handler],
  );

  const handleEvent = useCallback(
    (event: any) => {
      if (ref && event) {
        const { current } = ref;
        const { target } = event;
        if (current && target) {
          if (!current.contains(event.target)) {
            handler();
          }
        }
      }
    },
    [handler],
  );

  useEffect(() => {
    document.addEventListener('click', handleEvent, true);
    document.addEventListener('keyup', escapeListener, true);
    return () => {
      document.removeEventListener('click', handleEvent, true);
      document.removeEventListener('keyup', escapeListener, true);
    };
  }, [escapeListener, handleEvent]);

  return [ref];
};

export default useOnClickOutside;
