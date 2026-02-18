'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-3 py-2.5 text-sm text-[#1A1A1A] bg-white
            border rounded transition-colors duration-200
            placeholder:text-[#9CA3AF] resize-vertical min-h-[100px]
            focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent
            disabled:bg-[#F5F5F5] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
            ${error ? 'border-[#DC2626]' : 'border-[#D1D5DB] hover:border-[#9CA3AF]'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
