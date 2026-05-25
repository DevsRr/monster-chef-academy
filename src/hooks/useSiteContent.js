import { useRealtimeValue } from "./useRealtimeValue";
import { defaultSiteContent } from "../lib/default-content";

export function useSiteContent() {
  const { data, loading, error } = useRealtimeValue("siteContent", defaultSiteContent);

  return {
    content: { ...defaultSiteContent, ...(data || {}) },
    loading,
    error,
  };
}
