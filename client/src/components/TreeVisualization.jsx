// client/src/components/TreeVisualization.jsx
import React, { useRef, useEffect } from 'react';
import './TreeVisualization.css';

const TreeVisualization = ({ treeData, currentOperation, currentNode, visitedNodes }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !treeData) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (!treeData.root) {
      // Draw empty tree message
      ctx.fillStyle = '#7f8c8d';
      ctx.font = '20px Segoe UI';
      ctx.textAlign = 'center';
      ctx.fillText('Tree is empty. Add some nodes!', width / 2, height / 2);
      return;
    }

    // Calculate tree layout with proper centering
    const nodePositions = calculateTreeLayout(treeData.root, width, height);

    // Draw connections first
    drawConnections(ctx, treeData.root, nodePositions);

    // Then draw nodes
    drawNodes(ctx, treeData.root, nodePositions, currentNode, visitedNodes);

    // Draw current operation
    if (currentOperation) {
      ctx.fillStyle = '#2c3e50';
      ctx.font = '600 18px Segoe UI';
      ctx.textAlign = 'left';
      ctx.fillText(`Operation: ${currentOperation}`, 20, 30);
    }

  }, [treeData, currentNode, visitedNodes, currentOperation]);

  return (
    <div className="tree-visualization">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600}
        className="tree-canvas"
      />
    </div>
  );
};

const calculateTreeLayout = (root, canvasWidth, canvasHeight) => {
  const positions = new Map();
  if (!root) return positions;

  const treeInfo = calculateTreeDimensions(root);
  const horizontalSpacing = Math.max(60, canvasWidth / (treeInfo.count + 1));
  const verticalSpacing = Math.max(70, canvasHeight / (treeInfo.depth + 1));

  let xIndex = 0;
  const assignPositions = (node, depth) => {
    if (!node) return;
    assignPositions(node.left, depth + 1);
    positions.set(node.id, {
      x: (xIndex + 1) * horizontalSpacing,
      y: 80 + depth * verticalSpacing,
      depth
    });
    xIndex += 1;
    assignPositions(node.right, depth + 1);
  };

  assignPositions(root, 0);
  return positions;
};

const calculateTreeDimensions = (node) => {
  if (!node) return { depth: 0, count: 0 };

  const left = calculateTreeDimensions(node.left);
  const right = calculateTreeDimensions(node.right);

  return {
    depth: 1 + Math.max(left.depth, right.depth),
    count: 1 + left.count + right.count
  };
};

const drawConnections = (ctx, node, positions) => {
  if (!node) return;

  const drawConnection = (fromNode, toNode, isLeft = true) => {
    if (!fromNode || !toNode) return;

    const fromPos = positions.get(fromNode.id);
    const toPos = positions.get(toNode.id);
    if (!fromPos || !toPos) return;

    ctx.beginPath();
    ctx.moveTo(fromPos.x, fromPos.y + 20);

    const controlPointY = (fromPos.y + toPos.y) / 2;
    const curveOffset = isLeft ? -40 : 40;

    ctx.bezierCurveTo(
      fromPos.x + curveOffset, controlPointY,
      toPos.x - curveOffset, controlPointY,
      toPos.x, toPos.y - 20
    );

    ctx.strokeStyle = '#95a5a6';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  if (node.left) {
    drawConnection(node, node.left, true);
    drawConnections(ctx, node.left, positions);
  }
  if (node.right) {
    drawConnection(node, node.right, false);
    drawConnections(ctx, node.right, positions);
  }
};

const drawNodes = (ctx, node, positions, currentNode, visitedNodes) => {
  if (!node) return;

  const drawNode = (treeNode) => {
    const pos = positions.get(treeNode.id);
    if (!pos) return;

    let fillColor = '#3f7cff';
    let borderColor = '#2d5ed7';

    if (currentNode && treeNode.id === currentNode.id) {
      fillColor = '#ef4444';
      borderColor = '#c53030';
    } else if (visitedNodes && visitedNodes.some((visitedNode) => visitedNode.id === treeNode.id)) {
      fillColor = '#22c55e';
      borderColor = '#15803d';
    }

    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(treeNode.value.toString(), pos.x, pos.y);
  };

  const drawAllNodes = (activeNode) => {
    if (!activeNode) return;
    drawAllNodes(activeNode.left);
    drawNode(activeNode);
    drawAllNodes(activeNode.right);
  };

  drawAllNodes(node);
};

export default TreeVisualization;
