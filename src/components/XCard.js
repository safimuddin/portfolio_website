import React from "react";

export function XCard({
  authorName = "Explorer",
  authorHandle = "explorer",
  authorImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  content = ["Exploring the globe..."],
  isVerified = false,
  timestamp = "Now",
  reply = null,
  onClose = null,
}) {
  return (
    <div
      style={{
        width: "100%",
        minWidth: "400px",
        maxWidth: "550px",
        padding: "1.5px",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        background: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "20px",
          borderRadius: "14px",
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          color: "white",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={authorImage}
                alt={authorName}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {authorName}
                  </span>
                  {isVerified && (
                    <span style={{ color: "#1DA1F2", fontSize: "16px" }}>✓</span>
                  )}
                </div>
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "14px",
                  }}
                >
                  @{authorHandle}
                </span>
              </div>
              <button
                onClick={onClose}
                style={{
                  height: "32px",
                  width: "32px",
                  color: "rgba(255, 255, 255, 0.8)",
                  background: "transparent",
                  border: "none",
                  borderRadius: "8px",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ marginTop: "12px" }}>
          {content.map((item, index) => (
            <p
              key={index}
              style={{
                color: "white",
                fontSize: "15px",
                lineHeight: "1.5",
                margin: "0 0 8px 0",
              }}
            >
              {item}
            </p>
          ))}
          <span
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "13px",
              marginTop: "8px",
              display: "block",
            }}
          >
            {timestamp}
          </span>
        </div>

        {/* Reply */}
        {reply && (
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={reply.authorImage}
                    alt={reply.authorName}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {reply.authorName}
                  </span>
                  {reply.isVerified && (
                    <span style={{ color: "#1DA1F2", fontSize: "14px" }}>✓</span>
                  )}
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "13px",
                    }}
                  >
                    @{reply.authorHandle}
                  </span>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "13px",
                    }}
                  >
                    ·
                  </span>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "13px",
                    }}
                  >
                    {reply.timestamp}
                  </span>
                </div>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  {reply.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
