import React from "react";
import { useEffect } from "react";

export default function listenForOutsideClicks(
  listening,
  setListening,
  menuRef,
  setAddGroupClicked
) {
  return () => {
    if (listening) return;

    if (!menuRef?.current) return;
    setListening(true);
    ["click", "touchstart"].forEach((type) => {
      document.addEventListener(type, (evt) => {
        const cur = menuRef.current;
        const node = evt.target;
        if (cur.contains(node)) return;
        setAddGroupClicked(false);
      });
    });
  };
}
