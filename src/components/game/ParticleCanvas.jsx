import { useEffect, useRef } from "react";

export default function ParticleCanvas({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameId;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: 34 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.2 + Math.random() * 0.6,
      size: 5 + Math.random() * 10,
      color: index % 3 === 0 ? "#14b8a6" : index % 3 === 1 ? "#fb7185" : "#fbbf24",
    }));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed / height;
        if (particle.y < -0.1) particle.y = 1.1;
        context.globalAlpha = 0.22;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x * width, particle.y * height, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      frameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
