import { useEffect, useRef } from "react";

const useUpdateEffect = (effect: () => void, dependencies: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      effect();
    } else {
      didMount.current = true;
    }
  }, dependencies);
};

export default useUpdateEffect;
