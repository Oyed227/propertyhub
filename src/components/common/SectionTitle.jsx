function SectionTitle({
  title,
  subtitle,
  align = "center",
  badge,
  className = "",
}) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right",
  };

  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`}>
      {badge && (
        <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {badge}
        </span>
      )}

      <h2 className="mt-4 text-4xl font-black text-slate-900">{title}</h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
