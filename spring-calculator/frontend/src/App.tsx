import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [side, setSide] = useState<number>(50)
  const [area, setArea] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Maximum visual size in pixels for the square in the container
  const MAX_VISUAL_SIZE = 400
  // Scaling factor: pixels per unit
  // We want the square to grow up to MAX_VISUAL_SIZE
  // Let's assume max units = 200
  const UNIT_TO_PIXEL = MAX_VISUAL_SIZE / 200

  const calculateArea = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/calculator/square', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ side }),
      })
      if (!response.ok) throw new Error('Failed to calculate')
      const data = await response.json()
      setArea(data.area)
    } catch (error) {
      console.error(error)
      alert('Error connecting to backend. Make sure Spring Boot is running on port 8080.')
    } finally {
      setLoading(false)
    }
  }

  // Auto-clear area if side changes (optional, but keeps UI clean)
  useEffect(() => {
    setArea(null)
  }, [side])

  // Scale logic: Determine a "nice" distance to show on the scale
  // We want the scale bar to be roughly 100px wide
  const getScaleInfo = () => {
    const targetWidthPx = 100
    const unitsAtTargetWidth = targetWidthPx / UNIT_TO_PIXEL
    
    // Find a "nice" number for units (1, 2, 5, 10, 20, 50, 100, 200, etc.)
    const niceNumbers = [1, 2, 5, 10, 20, 50, 100, 200, 500]
    const niceUnits = niceNumbers.reduce((prev, curr) => {
      return (Math.abs(curr - unitsAtTargetWidth) < Math.abs(prev - unitsAtTargetWidth) ? curr : prev)
    })
    
    const scaleWidthPx = niceUnits * UNIT_TO_PIXEL
    return { width: scaleWidthPx, label: `${niceUnits} units` }
  }

  const scaleInfo = getScaleInfo()

  return (
    <div className="app-container">
      {/* Left Panel: Calculator */}
      <div className="left-panel">
        <div className="calculator-card">
          <h1>Square Calculator</h1>
          
          <div className="input-group">
            <label htmlFor="side-input">Side Length</label>
            <input
              id="side-input"
              type="number"
              value={side}
              onChange={(e) => setSide(Number(e.target.value))}
              min="1"
              max="200"
            />
          </div>

          <button 
            className="calc-button" 
            onClick={calculateArea}
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate Area'}
          </button>

          {area !== null && (
            <div className="result-display">
              <h2>Calculated Area</h2>
              <div className="result-value">{area.toLocaleString()}</div>
              <p style={{color: '#636e72', fontSize: '0.8rem'}}>units²</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Visualizer */}
      <div className="right-panel">
        <div className="visualizer-container">
          <div 
            className="square-visual"
            style={{
              width: `${side * UNIT_TO_PIXEL}px`,
              height: `${side * UNIT_TO_PIXEL}px`
            }}
            data-side={side}
          >
            {/* Visual labels or patterns could go here */}
          </div>
        </div>

        {/* Draggable Slider at the bottom of visualizer */}
        <div className="slider-container">
          <span>1</span>
          <input
            type="range"
            min="1"
            max="200"
            value={side}
            onChange={(e) => setSide(Number(e.target.value))}
          />
          <span>200</span>
        </div>

        {/* Distance Scale (Google Maps style) */}
        <div className="distance-scale">
          <div className="scale-label">{scaleInfo.label}</div>
          <div 
            className="scale-line" 
            style={{ width: `${scaleInfo.width}px` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default App
