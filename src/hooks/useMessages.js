import { useMemo } from "react";
import { useRealtimeValue } from "./useRealtimeValue";
import { getTimestampValue } from "../lib/utils";

export function useMessages() {
  const { data, loading, error } = useRealtimeValue("messages", {});

  const messages = useMemo(() => {
    return Object.entries(data || {})
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => getTimestampValue(b.createdAt) - getTimestampValue(a.createdAt));
  }, [data]);

  return { messages, loading, error };
}
