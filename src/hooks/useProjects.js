import { useMemo } from "react";
import { useRealtimeValue } from "./useRealtimeValue";
import { getTimestampValue } from "../lib/utils";

export function useProjects() {
  const { data, loading, error } = useRealtimeValue("projects", {});

  const projects = useMemo(() => {
    return Object.entries(data || {})
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => getTimestampValue(b.createdAt) - getTimestampValue(a.createdAt));
  }, [data]);

  return { projects, loading, error };
}
