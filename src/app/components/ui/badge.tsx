type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'outline';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#F5F5F5] text-[#6B7280]',
  success: 'bg-[#ECFDF5] text-[#059669]',
  warning: 'bg-[#FFFBEB] text-[#D97706]',
  error: 'bg-[#FEF2F2] text-[#DC2626]',
  outline: 'border border-[#D1D5DB] text-[#6B7280]',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}