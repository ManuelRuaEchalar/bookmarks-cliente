const DecorativePanel = () => {
  return (
    <div 
      className="relative flex justify-center items-center min-h-screen"
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #b8884e 0%, #a37c4cff 85%, #906b3eff 100%)'
      }}
    >
      <div className="text-center"  
      style={{
         marginTop: '45%',
         justifyItems: 'center'}}>
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-center" style={{ color: '#eee0c3ff', fontSize: '4rem' }}>
          FavBooks
        </h1>
        <p className="text-2xl md:text-3xl text-center" style={{ color: '#eee0c3ff', fontSize: '1.5rem' }}>
          Tus libros favoritos y donde conseguirlos
        </p>
      </div>
    </div>
  );
};

export default DecorativePanel;