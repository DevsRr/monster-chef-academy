import { useMemo } from "react";
import { useRealtimeValue } from "./useRealtimeValue";

export function useProject(projectId) {
  const { data, loading, error } = useRealtimeValue(`projects/${projectId}`, null);

  const project = useMemo(() => {
    if (!data) {
      return null;
    }

    return { id: projectId, ...data };
  }, [data, projectId]);

  return { project, loading, error };
}
