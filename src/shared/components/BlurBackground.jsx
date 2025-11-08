const BlurBackground = ({
  children,
  className,
  blur = "backdrop-blur-[20px]",
  background = "bg-white/10",
  rounded = '',
  border = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${background} ${className} ${blur} overflow-hidden ${rounded} ${border}`}
    >
      {children}
    </div>
  );
};

export default BlurBackground;