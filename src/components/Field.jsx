const Field = ({ label,name,value}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input type="text" name={name} defaultValue={value} />
      {/* value bir inputa değer atamak için kullanılır. Bu şekilde verilen değer değiştirelemez bunu düzeltme için ise defaultValue kullanılır */}
    </div>
  );
};

export default Field;
