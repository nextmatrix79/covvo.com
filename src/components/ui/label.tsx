import { ComponentPropsWithoutRef } from 'react';

export function Label({
  htmlFor,
  children,
  className = '',
  ...props
}: { htmlFor: string } & ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}