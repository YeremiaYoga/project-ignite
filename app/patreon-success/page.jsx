"use client";

import { Suspense } from "react";
import PatreonSuccessContent from "./PatreonSuccessContent";

export default function PatreonSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-20">Loading...</div>}>
      <PatreonSuccessContent />
    </Suspense>
  );
}
