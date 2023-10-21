import { useState, useEffect } from 'react';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  backgroundColor: 'black',
};

const buttonStyle = {
  fontSize: '24px',
  padding: '20px 40px',
  backgroundColor: 'black',
  color: 'gray',
  border: 'none',
  cursor: 'pointer',
};

export default function Home() {
  const [isBlackout, setIsBlackout] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isBlackout && (event.key === 'Escape' || event.key === 'Esc')) {
        setIsBlackout(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isBlackout]);

  const toggleBlackout = () => {
    setIsBlackout(!isBlackout);
    toggleFullScreen()
  };

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div>
      {isBlackout ? (
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={toggleBlackout}>
            Click AQUI ou presione "ESC" duas vezes para sair.
          </button>
        </div>
      ) : (
        <button style={buttonStyle} onClick={toggleBlackout}>
          Ativar Tela Preta
        </button>
      )}
    </div>
  );
}