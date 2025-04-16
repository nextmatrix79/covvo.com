'use client';

import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
      {type === 'textarea' ? (
        <Textarea id={name} name={name} placeholder={placeholder} required={required} />
      ) : (
        <Input type={type} id={name} name={name} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4 pl-4 border-l-2 border-gray-200">
        {children}
      </div>
    </div>
  );
}