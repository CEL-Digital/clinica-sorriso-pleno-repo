"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(), // navegador
    () => 2026 // servidor / pré-renderização
  );

  return <>{year}</>;
}