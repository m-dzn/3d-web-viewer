export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({ leftIcon, rightIcon, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="inline-flex gap-1 justify-center items-center text-font-default px-4 py-2 rounded-md bg-primary text-sm text-primary-on font-semibold"
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;
