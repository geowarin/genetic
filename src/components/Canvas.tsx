import { useEffect, useRef } from "react";
import { IMG_SIZE } from "../logic/constants";

interface CanvasProps {
  scale?: number;

  draw(ctx: CanvasRenderingContext2D): void;
}

export function Canvas({ draw, scale = 1 }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);
    draw(ctx);
    ctx.resetTransform();
  }, [ref]);
  return (
    <canvas ref={ref} width={IMG_SIZE * scale} height={IMG_SIZE * scale} />
  );
}
