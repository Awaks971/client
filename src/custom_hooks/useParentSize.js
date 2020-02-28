import { useRef, useState, useLayoutEffect } from "react";

function useParentSize() {
  const ref = useRef();
  const [sizes, setSizes] = useState({});

  useLayoutEffect(() => {
    // window.addEventListener("resize", function() {
    //   setTimeout(
    //     () =>
    //       setSizes(
    //         ref.current ? ref.current.getBoundingClientRect().toJSON() : {}
    //       ),
    //     1000
    //   );
    // });
    setSizes(ref.current.getBoundingClientRect().toJSON());
  }, []);

  return [ref, sizes];
}

export default useParentSize;
