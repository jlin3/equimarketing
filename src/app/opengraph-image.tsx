import { headers } from "next/headers";
import { ImageResponse } from "next/og";

// Configuration exports
export const runtime = "edge";
export const alt = "Equi - Custom hedge fund programs and portable alpha for RIA CIOs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  try {
    // Get the host from headers
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
            padding: "80px",
          }}
        >
          <img
            src={`${baseUrl}/logos/EQUI-LOGO-SM-HZ-WHITE.png`}
            alt="Equi Logo"
            style={{
              width: "400px",
              height: "auto",
              marginBottom: "40px",
            }}
          />
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: "1.3",
            }}
          >
            {alt}
          </div>
        </div>
      ),
      { ...size },
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
