import { Button as AntButton } from "antd";
import React from "react";

const Button = ({
  style,
  children,
  onClick,
  type = "primary",
  size = "medium",
  danger = false,
  block = false,
}) => {
  return (
    <AntButton
      size={size}
      type={type}
      danger={danger}
      block={block}
      onClick={onClick}
    >
      {children}
    </AntButton>
  );
};

export default Button;
