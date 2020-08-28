import { useRef, useEffect } from 'react';

// usePrevious custom hook
export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
