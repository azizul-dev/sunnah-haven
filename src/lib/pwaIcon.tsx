import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export async function iconResponse(size: number) {
  const file = await readFile(path.join(process.cwd(), "public", "images", "sunnah-logo.jpg"));
  const src = `data:image/jpeg;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B3D2E",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={size} height={size} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    { width: size, height: size },
  );
}
