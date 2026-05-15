// client/src/components/PseudocodeContainer.jsx
import React from 'react';
import PseudocodeBox from './PseudocodeBox';
import TreePseudocodeBox from './TreePseudocodeBox';
import GraphPseudocodeBox from './GraphPseudocodeBox'; // You can create this later

const PseudocodeContainer = ({ algorithm, currentStep, algorithmName, dataStructure, currentOperation, traversalType }) => {
  // Determine which pseudocode box to show based on data structure
  const renderPseudocodeBox = () => {
    switch(dataStructure) {
      case 'tree':
        return (
          <TreePseudocodeBox
            algorithm={algorithm}
            currentStep={currentStep}
            currentOperation={currentOperation}
            traversalType={traversalType}
          />
        );
      case 'graph':
        return (
          <GraphPseudocodeBox
            algorithm={algorithm}
            currentStep={currentStep}
            currentOperation={currentOperation}
          />
        );
      case 'array':
      default:
        return (
          <PseudocodeBox
            algorithm={algorithm}
            currentStep={currentStep}
            algorithmName={algorithmName}
          />
        );
    }
  };

  return (
    <div className="pseudocode-container">
      {renderPseudocodeBox()}
    </div>
  );
};

export default PseudocodeContainer;