import { IImage, IResult, compare } from "./image-ssim";
import { useEffect, useState } from "react";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const src1 = `face-${random(1, 20)}.jpg`;
  const src2 = `face-${random(1, 20)}.jpg`;

  const [result, setResult] = useState<IResult>();

  useEffect(() => {
    Promise.all([loadImage(src1), loadImage(src2)]).then(([img1, img2]) => {
      setResult(compare(img1, img2));
    });
  }, []);

  return (
    <div className="App">
      <img width={200} src={src1} />
      <img width={200} src={src2} />

      <h2>Similarity result</h2>
      <pre>{JSON.stringify(result)}</pre>
    </div>
  );
}

const width = 1024;
const height = 1024;

function loadImage(path: string): Promise<IImage> {
  return new Promise<IImage>((resolve) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, canvas.height);
      const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve({
        width: canvas.width,
        height: canvas.height,
        // @ts-ignore
        data: id.data,
        channels: 4,
        canvas: canvas,
      });
    };
    img.src = path;
  });
}

export default App;
