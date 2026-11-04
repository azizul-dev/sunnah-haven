import { ImageResponse } from "next/og";

export function iconResponse(size: number) {
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
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 32 32">
          <path d="M20 4a12 12 0 1 0 0 24 10 10 0 1 1 0-24z" fill="#c9a24b" />
          <path d="M25 9l1.2 2.8 3 .3-2.3 2 .7 3-2.6-1.6-2.6 1.6.7-3-2.3-2 3-.3z" fill="#e2c77d" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
