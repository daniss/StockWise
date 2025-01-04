import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/utils'
import { JSX } from 'react'

const cardVariants = cva(
  'rounded-lg bg-white shadow transition-all',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      },
      hover: {
        true: 'hover:shadow-lg',
        false: ''
      }
    },
    defaultVariants: {
      padding: 'md',
      hover: false
    }
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav'
}

export function Card({
  as: Component = 'div',
  className,
  padding,
  hover,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(cardVariants({ padding, hover }), className)}
      {...props}
    />
  )
}