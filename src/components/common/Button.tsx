import { Button } from "antd";
import type { ButtonType } from "antd/lib/button";
import type { ReactNode } from "react";
import React, { forwardRef } from "react";

export type ButtonProps = {
  className?: string;
  children?: ReactNode | string;
  onClick?: () => void;
  onClickNative?: (event?: React.MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  htmlType?: "submit" | "button";
};

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children, htmlType, className, disabled, type = "primary", onClickNative, ...props }, ref) => (
    <Button
      ref={ref}
      className={className}
      disabled={disabled}
      // eslint-disable-next-line react/button-has-type
      htmlType={htmlType}
      type={type}
      onClick={(event) => {
        onClick?.();
        onClickNative?.(event);
      }}
      {...props}
    >
      {children}
    </Button>
  )
);

export default ButtonComponent;
