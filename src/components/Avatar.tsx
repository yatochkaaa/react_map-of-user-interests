import { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

const Avatar = ({ src, alt, size = 50 }: AvatarProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <div
          className="spinner"
          style={{
            width: size / 2,
            height: size / 2,
            border: "3px solid #fff",
            borderTop: "3px solid #888",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{
          display: loading ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Avatar;
