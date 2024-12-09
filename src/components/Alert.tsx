import { ReactNode } from "react";

type AlertProps = {
  alert: string;
  children: ReactNode;
};

export default function Alert({ children, alert }: AlertProps) {
  return (
    <div className={` ${alert ? "alert" : ""}`}>
      <i className="ri-error-warning-line"></i>
      {children}
    </div>
  );
}
