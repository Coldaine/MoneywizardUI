import type { ReactNode } from 'react';

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  headerAction?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const DashboardCard = ({ title, children, headerAction, footer, className }: DashboardCardProps) => {
  return (
    <div className={`card-monarch flex flex-col h-full ${className}`}>
      {(title || headerAction) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="font-bold text-sm text-secondary uppercase tracking-wider">{title}</h3>}
          {headerAction}
        </div>
      )}
      <div className="flex-grow">
        {children}
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};
