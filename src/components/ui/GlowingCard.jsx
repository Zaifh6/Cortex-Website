import React from "react";
import { cn } from "@/lib/utils";
import "./GlowingCard.scss";

export const GlowingCard = ({ text, label, className }) => {
  return (
    <div className={cn("glowing-card-outer", className)}>
      <div className="glowing-card-inner">
        {/* Top-left light beam */}
        <div className="glowing-card-beam"></div>
        
        {/* Precision glowing dot */}
        <div className="glowing-card-dot"></div>
        
        {/* Technical grid markers */}
        <div className="glowing-card-line topl"></div>
        <div className="glowing-card-line leftl"></div>
        <div className="glowing-card-line bottoml"></div>
        <div className="glowing-card-line rightl"></div>
        
        {/* Content with gradient text */}
        <div className="glowing-card-text">{text}</div>
        <div className="glowing-card-label">{label}</div>
      </div>
    </div>
  );
};

export default GlowingCard;
