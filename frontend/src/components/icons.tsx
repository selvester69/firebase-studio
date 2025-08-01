import type { LucideProps } from 'lucide-react';
import { Package } from 'lucide-react';

export const Logo = ({ className, ...props }: LucideProps) => (
  <Package className={className} {...props} />
);
