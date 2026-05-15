// client/src/components/Controls.jsx
import React from 'react';
import './Controls.css';

const Controls = ({
  onGenerate,
  onStart,
  onPause,
  onReset,
  onSpeedChange,
  onArraySizeChange,
  onLanguageChange,
  onTargetChange,
  isPlaying,
  isCompleted,
  arraySize,
  speed,
  language,
  isSearch,
  targetValue
}) => {
  
  const handleGenerate = () => {
    onGenerate(arraySize);
  };
  
  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    onSpeedChange(newSpeed);
  };

  const handleArraySizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    onArraySizeChange(newSize);
  };

  const handleLanguageChange = (e) => {
    onLanguageChange(e.target.value);
  };

  const handleTargetChange = (e) => {
    const newTarget = parseInt(e.target.value);
    onTargetChange(newTarget);
  };
  
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="arraySize">Array Size: {arraySize}</label>
        <input
          id="arraySize"
          type="range"
          min="5"
          max="20"
          value={arraySize}
          onChange={handleArraySizeChange}
          disabled={isPlaying}
        />
      </div>
      
      {isSearch && (
        <div className="control-group">
          <label htmlFor="targetValue">Target Value: {targetValue}</label>
          <input
            id="targetValue"
            type="range"
            min="1"
            max="100"
            value={targetValue}
            onChange={handleTargetChange}
            disabled={isPlaying}
          />
        </div>
      )}
      
      <div className="control-group">
        <label htmlFor="speed">Speed: {speed}ms</label>
        <input
          id="speed"
          type="range"
          min="50"
          max="2000"
          value={speed}
          onChange={handleSpeedChange}
          step="50"
        />
      </div>

      <div className="control-group">
        <label htmlFor="language">Pseudocode Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          disabled={isPlaying}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      
      <div className="buttons">
        <button onClick={handleGenerate} disabled={isPlaying}>
          Generate New Array
        </button>
        <button onClick={onStart} disabled={isPlaying || isCompleted}>
          {isPlaying ? 'Running...' : 'Start'}
        </button>
        <button onClick={onPause} disabled={!isPlaying || isCompleted}>
          Pause
        </button>
        <button onClick={onReset} disabled={isPlaying}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Controls;