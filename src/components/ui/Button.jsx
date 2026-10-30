import { clsx } from 'clsx';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export default function Button({ children, variant = 'primary', className, as: Tag = 'button', ...props }) {
  return (
    <Tag className={clsx(variants[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
