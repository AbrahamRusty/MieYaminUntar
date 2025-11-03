const SectionTag = ({ children, variant = "orange" }) => {
  const variantClass = `tag-${variant}`;
  
  return (
    <span className={`section-tag ${variantClass}`}>
      {children}
    </span>
  );
};

export default SectionTag;