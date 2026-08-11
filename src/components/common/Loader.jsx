function Loader({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 ${sizeClasses[size]}`}
      />
      {text && <p className="text-slate-500">{text}</p>}
    </div>
  );
}

export default Loader;
