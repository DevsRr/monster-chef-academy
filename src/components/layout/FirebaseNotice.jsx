import { Settings2 } from "lucide-react";
import { isFirebaseConfigured } from "../../lib/firebase";

export default function FirebaseNotice() {
  if (isFirebaseConfigured) {
    return null;
  }

  return (
    <div className="section pt-4">
      <div className="glass-panel flex items-start gap-3 rounded-[24px] px-5 py-4 text-sm leading-6 text-[var(--muted)]">
        <Settings2 size={18} className="mt-1 shrink-0 text-accent" />
        <p>
          Firebase environment variables are not configured yet. The UI is fully built, but realtime data, auth,
          and contact submissions will stay in setup mode until you add values from
          <span className="mx-1 font-semibold text-[var(--text)]">`.env.example`</span>.
        </p>
      </div>
    </div>
  );
}
