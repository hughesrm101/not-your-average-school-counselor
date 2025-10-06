import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-nyasc-yellow-500 text-nyasc-gray-800 hover:bg-nyasc-yellow-600 shadow-lg hover:shadow-xl',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border-2 border-nyasc-blue-900 text-nyasc-blue-900 hover:bg-nyasc-blue-900 hover:text-white',
        secondary: 'bg-nyasc-gray-100 text-nyasc-gray-900 hover:bg-nyasc-gray-200',
        ghost: 'text-nyasc-gray-700 hover:bg-nyasc-gray-100',
        link: 'text-nyasc-blue-500 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-9 rounded-xl px-4',
        lg: 'h-14 rounded-2xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
