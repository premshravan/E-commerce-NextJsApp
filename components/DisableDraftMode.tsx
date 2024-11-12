"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  //only show disable draft mode buttonwhen outside of presentation tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }
  const handleClick = async () => {
    await fetch("/draft-mode/disable");
    router.refresh();
  };
  return (
    <button onClick={handleClick} className= " fixed  bottom-4 right-4 p-2 z-50 bg-gray-500">
      Disable Draft mode
    </button>
  );
}
