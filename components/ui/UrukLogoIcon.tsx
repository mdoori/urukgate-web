export default function UrukLogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer octagon ring (flat-top) */}
      <polygon
        points="81.4,8.2 111.8,38.6 111.8,81.4 81.4,111.8 38.6,111.8 8.2,81.4 8.2,38.6 38.6,8.2"
        fill="none"
        stroke="white"
        strokeWidth="10"
        strokeLinejoin="miter"
      />
      {/* Inner octagon ring (rotated 22.5°) */}
      <polygon
        points="84.0,36.0 94.0,60.0 84.0,84.0 60.0,94.0 36.0,84.0 26.0,60.0 36.0,36.0 60.0,26.0"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinejoin="miter"
        opacity="0.7"
      />
      {/* Center dot */}
      <circle cx="60" cy="60" r="9" fill="white" opacity="0.9" />
    </svg>
  );
}
