"use client";

import React, { useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { applyMotionPreset, MotionPresetType } from "@/lib/motionPresets";

interface MotionImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  preset?: MotionPresetType;
  delay?: number;
  duration?: number;
  priority?: boolean;
}

export function MotionImage({
  containerClassName = "",
  imageClassName = "",
  preset,
  delay = 0,
  duration = 1.2,
  priority = false,
  ...props
}: MotionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preset || !containerRef.current) return;
    const tween = applyMotionPreset(containerRef.current, preset, {
      delay,
      duration,
    });
    return () => {
      tween?.kill();
    };
  }, [preset, delay, duration]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      data-cursor="view"
    >
      <Image
        {...props}
        priority={priority}
        className={`object-cover transition-transform duration-700 ease-out hover:scale-105 ${imageClassName}`}
      />
    </div>
  );
}
