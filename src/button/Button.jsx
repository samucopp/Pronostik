import './Button.css';

const Button = ({
  loading,
  type = 'submit'
}) => {
  return (
    <button
      type={type}
      disabled={loading}
    >
      {loading ? 'Buscando...' : 'Buscar'}
    </button>
  );
};

export default Button;