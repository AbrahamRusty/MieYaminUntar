const SectionTag = ({ children, variant = "orange" }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "orange":
        return "tag-orange";
      case "pink":
        return "tag-pink";
      case "blue":
        return "tag-blue";
      default:
        return "tag-orange";
    }
  };

  return (
    <span className={`section-tag ${getVariantClass()}`}>
      {children}

      <style jsx>{`
        .section-tag {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 1rem;
          border-radius: 9999px;
          margin-bottom: 0.75rem;
        }

        .tag-orange {
          background-color: #ffedd5;
          color: #ea580c;
        }

        .tag-pink {
          background-color: #fce7f3;
          color: #db2777;
        }

        .tag-blue {
          background-color: #dbeafe;
          color: #2563eb;
        }
      `}</style>
    </span>
  );
};

export default SectionTag;