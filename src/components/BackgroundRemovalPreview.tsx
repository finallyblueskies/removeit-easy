import React, { useState, useRef, useEffect } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";

interface BackgroundRemovalPreviewProps {
  primaryImage: string;
  secondaryImage?: string;
  sx?: SxProps<Theme>;
}

const BackgroundRemovalPreview: React.FC<BackgroundRemovalPreviewProps> = ({
  primaryImage,
  secondaryImage,
  sx = {},
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 50% by default
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Measure container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle mouse events for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Clamp position between 0 and 100
    const clampedPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(clampedPosition);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Add global mouse up event to handle cases where mouse is released outside the component
  useEffect(() => {
    const globalMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mouseup", globalMouseUp);
    return () => window.removeEventListener("mouseup", globalMouseUp);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...sx,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Secondary image (background removed) */}
      {secondaryImage && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${secondaryImage})`,
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
          }}
        />
      )}

      {/* Primary image (with background) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${sliderPosition}%`,
          height: "100%",
          overflow: "hidden",
          backgroundImage: `url(${primaryImage})`,
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Slider handle */}
      {secondaryImage && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: `${sliderPosition}%`,
            transform: "translate(-50%, -50%)",
            height: "50px",
            width: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "4px",
            cursor: "ew-resize",
            zIndex: 10,
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          }}
          onMouseDown={handleMouseDown}
        >
          <DragHandleIcon sx={{ transform: "rotate(90deg)" }} />
        </Box>
      )}
    </Box>
  );
};

export default BackgroundRemovalPreview;
