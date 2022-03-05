import { useEffect, useRef } from "react";
import { IMG_SIZE } from "../logic/constants";

interface CanvasProps {
  scale?: number;

  image: CanvasRenderingContext2D;
}

export function Canvas({ image, scale = 1 }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);
    ctx.drawImage(image.canvas, 0, 0);
    ctx.resetTransform();
  }, [ref]);
  return (
    <canvas ref={ref} width={IMG_SIZE * scale} height={IMG_SIZE * scale} />
  );
}
