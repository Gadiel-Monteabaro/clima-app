import { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
};

export default function Alert({ children }: AlertProps) {
  return (
    <div className="alert">
      <i className="ri-error-warning-line"></i>
      {children}
    </div>
  );
}
