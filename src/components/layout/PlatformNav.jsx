import { Download, Maximize2, Save, Settings, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePlatform } from "../../context/PlatformContext";
import { useInstallPrompt } from "../../pwa/useInstallPrompt";
import IconButton from "../ui/IconButton";
import StatusPill from "../ui/StatusPill";

export default function PlatformNav() {
  const { state, dispatch } = usePlatform();
  const { canInstall, promptInstall } = useInstallPrompt();

  const enterFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="section pt-3">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel flex items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-5"
        >
          <Link to="/" className="flex items-center gap-2 font-display text-base font-extrabold sm:text-xl">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent to-gold text-xl shadow-lg">
              M
            </span>
            <span className="hidden sm:inline">Monster Chef Academy</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <StatusPill tone="gold" label={`${state.player.stars} Stars`} />
            <StatusPill tone="accent" label={`${state.player.coins} Coins`} />
            <StatusPill tone={state.sync.online ? "accent" : "coral"} label={state.sync.online ? "Online" : "Offline"} />
            <StatusPill tone="muted" label={state.sync.status} />
          </div>

          <div className="flex items-center gap-2">
            <IconButton label="Save progress" onClick={() => dispatch({ type: "setSyncStatus", payload: { status: "Saved now" } })}>
              <Save size={19} />
            </IconButton>
            <IconButton label={state.settings.muted ? "Turn sound on" : "Mute sound"} onClick={() => dispatch({ type: "toggleMute" })}>
              {state.settings.muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
            </IconButton>
            <IconButton label="Fullscreen" onClick={enterFullscreen}>
              <Maximize2 size={18} />
            </IconButton>
            {canInstall ? (
              <IconButton label="Install app" onClick={promptInstall}>
                <Download size={18} />
              </IconButton>
            ) : null}
            <IconButton label="Settings">
              <Settings size={18} />
            </IconButton>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
