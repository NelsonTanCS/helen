import React, { useState } from 'react';

const GeoGuessrPage = () => {
  // Game data - you'll need to update these coordinates based on debug logs
  const gameRounds = [
    {
      id: 1,
      image: 'first_handyman.jpg', // Place your round images in public/images/
      correctAnswer: { x: 603, y: 338 }, // Update these based on debug logs
      description: 'Round 1'
    },
    {
      id: 2,
      image: 'image6.jpg',
      correctAnswer: { x: 323, y: 192 },
      description: 'Round 2'
    },
    {
      id: 3,
      image: 'image19.jpg',
      correctAnswer: { x: 553, y: 546 },
      description: 'Round 3'
    },
    {
      id: 4,
      image: 'bouquet.jpg',
      correctAnswer: { x: 499, y: 433 },
      description: 'Round 4'
    },
    {
      id: 5,
      image: 'eating_out.jpg',
      correctAnswer: { x: 636, y: 401 },
      description: 'Round 5'
    }
  ];

  const [currentRound, setCurrentRound] = useState(0);
  const [userPin, setUserPin] = useState(null);
  const [roundScores, setRoundScores] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate distance between two points
  const calculateDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate score based on distance (max 5000 points)
  const calculateScore = (distance) => {
    // Max distance for 0 points (adjust based on your map size)
    const maxDistance = 500;
    // Perfect score threshold (very close)
    const perfectThreshold = 10;
    
    if (distance <= perfectThreshold) return 5000;
    if (distance >= maxDistance) return 0;
    
    // Linear interpolation between perfect and zero
    const score = Math.round(5000 * (1 - distance / maxDistance));
    return Math.max(0, score);
  };

  // Handle map click to place/move pin
  const handleMapClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Debug log for setting correct answers
    console.log(`PIN DROPPED: x: ${Math.round(x)}, y: ${Math.round(y)}`);
    
    setUserPin({ x, y });
    setSubmitted(false);
  };

  // Submit current round
  const handleSubmit = () => {
    if (!userPin) return;
    
    const correctAnswer = gameRounds[currentRound].correctAnswer;
    const distance = calculateDistance(userPin, correctAnswer);
    const score = calculateScore(distance);
    
    console.log(`Round ${currentRound + 1}: Distance: ${distance.toFixed(2)}, Score: ${score}`);
    
    const newScores = [...roundScores, score];
    setRoundScores(newScores);
    setSubmitted(true);
    
    // Move to next round or end game
    setTimeout(() => {
      if (currentRound + 1 >= gameRounds.length) {
        setGameComplete(true);
      } else {
        setCurrentRound(currentRound + 1);
        setUserPin(null);
        setSubmitted(false);
      }
    }, 2000);
  };

  // Reset game
  const resetGame = () => {
    setCurrentRound(0);
    setUserPin(null);
    setRoundScores([]);
    setGameComplete(false);
    setSubmitted(false);
  };

  const totalScore = roundScores.reduce((sum, score) => sum + score, 0);

  if (gameComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '"Inter", "Segoe UI", sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#5b21b6',
            marginBottom: '20px',
            fontFamily: '"Playfair Display", "Georgia", serif'
          }}>
            Game Complete!
          </h1>
          
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '30px'
          }}>
            Final Score: {totalScore} / 25000
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '15px'
            }}>
              Round Breakdown:
            </h3>
            {roundScores.map((score, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: index < roundScores.length - 1 ? '1px solid #e5e7eb' : 'none'
              }}>
                <span style={{ color: '#5b21b6' }}>Round {index + 1}:</span>
                <span style={{ fontWeight: '600', color: '#10b981' }}>{score} points</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={resetGame}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '10px',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        width: '100%',
        margin: '0'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            color: 'white',
            marginBottom: '5px',
            fontFamily: '"Playfair Display", "Georgia", serif',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            Helen's GeoGuessr
          </h1>
          <div style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '8px'
          }}>
            Round {currentRound + 1} of {gameRounds.length}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)'
          }}>
            Score: {totalScore} / 25000
          </div>
        </div>

        {/* Game Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '20px',
          alignItems: 'stretch',
          flex: '1',
          minHeight: 0
        }}>
          {/* Round Image */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '15px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              Where is this location?
            </h3>
            <img
              src={`/images/${gameRounds[currentRound].image}`}
              alt={`Round ${currentRound + 1}`}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          {/* Map and Controls */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '15px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            height: '60%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              Click to place your guess
            </h3>
            
            {/* Map */}
            <div style={{
              position: 'relative',
              marginBottom: '10px',
              flex: '1',
              minHeight: '200px'
            }}>
              <img
                src="/images/map.jpg"
                alt="Map"
                onClick={handleMapClick}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  cursor: 'crosshair',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#f8fafc'
                }}
              />
              
              {/* User Pin */}
              {userPin && (
                <div style={{
                  position: 'absolute',
                  left: userPin.x - 12,
                  top: userPin.y - 24,
                  width: '24px',
                  height: '24px',
                  background: '#ef4444',
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  zIndex: 10
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    width: '8px',
                    height: '8px',
                    background: 'white',
                    borderRadius: '50%'
                  }}></div>
                </div>
              )}
              
              {/* Correct Answer Pin (shown after submit) */}
              {submitted && (
                <div style={{
                  position: 'absolute',
                  left: gameRounds[currentRound].correctAnswer.x - 12,
                  top: gameRounds[currentRound].correctAnswer.y - 24,
                  width: '24px',
                  height: '24px',
                  background: '#10b981',
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  zIndex: 10
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    width: '8px',
                    height: '8px',
                    background: 'white',
                    borderRadius: '50%'
                  }}></div>
                </div>
              )}
            </div>

            {/* Bottom Controls - Anchored to bottom */}
            <div style={{
              marginTop: 'auto'
            }}>
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!userPin || submitted}
                style={{
                  width: '100%',
                  background: (!userPin || submitted) ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: (!userPin || submitted) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '10px'
                }}
              >
                {submitted ? 'Submitted!' : 'Submit Guess'}
              </button>

              {/* Score Display */}
              {submitted && (
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '12px',
                  padding: '10px',
                  textAlign: 'center',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '3px'
                  }}>
                    Round {currentRound + 1} Score
                  </div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#10b981'
                  }}>
                    {roundScores[roundScores.length - 1]} points
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '3px'
                  }}>
                    Distance: {calculateDistance(userPin, gameRounds[currentRound].correctAnswer).toFixed(0)}px
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div style={{
                padding: '10px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#374151'
              }}>
                <strong>How to play:</strong> Click anywhere on the map to place your guess pin. You can move it by clicking elsewhere. Click Submit when you're satisfied with your guess! Sorry, no zooming :(
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoGuessrPage;
