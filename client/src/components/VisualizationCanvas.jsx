import React, { useEffect, useRef } from 'react';
import './VisualizationCanvas.css';

const DEFAULT_BAR = '#3f7cff';
const ACTIVE_BAR = '#f97316';
const CURRENT_BAR = '#ef4444';
const SUCCESS_BAR = '#22c55e';
const RANGE_BAR = '#a5b4fc';
const MUTED_BAR = '#dbe4ff';

const VisualizationCanvas = ({
  data,
  algorithmState,
  comparisons,
  swaps,
  metricLabel,
  isSearch,
  targetValue,
  algorithmName
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data?.length) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const layout = getLayout(data, width, height);
    const activeSet = new Set([
      algorithmState.i,
      algorithmState.j,
      algorithmState.minIndex,
      algorithmState.currentIndex
    ].filter((value) => Number.isInteger(value) && value >= 0));

    data.forEach((value, index) => {
      const barHeight = Math.max(24, (value / layout.maxValue) * layout.chartHeight);
      const x = layout.startX + index * (layout.barWidth + layout.spacing);
      const y = layout.baseY - barHeight;

      ctx.fillStyle = getBarColor({
        index,
        isSearch,
        algorithmState,
        activeSet
      });

      roundRect(ctx, x, y, layout.barWidth, barHeight, 12);
      ctx.fill();

      ctx.fillStyle = '#16324f';
      ctx.font = `600 ${layout.valueFont}px Segoe UI`;
      ctx.textAlign = 'center';
      ctx.fillText(String(value), x + layout.barWidth / 2, y - 10);

      ctx.fillStyle = '#64748b';
      ctx.font = `${layout.indexFont}px Segoe UI`;
      ctx.fillText(String(index), x + layout.barWidth / 2, layout.baseY + 24);
    });

    drawHeader(ctx, {
      width,
      comparisons,
      swaps,
      metricLabel,
      statusText: getStatusText({ algorithmName, algorithmState, data, isSearch, targetValue })
    });
  }, [algorithmName, data, algorithmState, comparisons, swaps, metricLabel, isSearch, targetValue]);

  return (
    <div className="visualization-canvas">
      <canvas ref={canvasRef} width={960} height={460} />
    </div>
  );
};

function getLayout(data, width, height) {
  const maxValue = Math.max(...data, 1);
  const sidePadding = 36;
  const spacing = Math.max(10, Math.min(18, Math.floor(width / (data.length * 7))));
  const barWidth = Math.max(
    26,
    Math.floor((width - sidePadding * 2 - spacing * (data.length - 1)) / data.length)
  );
  const totalWidth = barWidth * data.length + spacing * (data.length - 1);

  return {
    maxValue,
    barWidth,
    spacing,
    startX: Math.max(sidePadding, Math.floor((width - totalWidth) / 2)),
    baseY: height - 56,
    chartHeight: height - 150,
    valueFont: data.length > 12 ? 12 : 15,
    indexFont: data.length > 12 ? 11 : 13
  };
}

function getBarColor({ index, isSearch, algorithmState, activeSet }) {
  if (isSearch) {
    if (algorithmState.found && algorithmState.currentIndex === index) {
      return SUCCESS_BAR;
    }
    if (
      Number.isInteger(algorithmState.left) &&
      Number.isInteger(algorithmState.right) &&
      index >= algorithmState.left &&
      index <= algorithmState.right
    ) {
      return activeSet.has(index) ? CURRENT_BAR : RANGE_BAR;
    }
    if (activeSet.has(index)) {
      return CURRENT_BAR;
    }
    return DEFAULT_BAR;
  }

  if (algorithmState.sortedIndices?.includes(index)) {
    return SUCCESS_BAR;
  }
  if (index === algorithmState.minIndex || index === algorithmState.pivot) {
    return ACTIVE_BAR;
  }
  if (activeSet.has(index)) {
    return CURRENT_BAR;
  }
  if (
    Number.isInteger(algorithmState.low) &&
    Number.isInteger(algorithmState.high) &&
    (index < algorithmState.low || index > algorithmState.high)
  ) {
    return MUTED_BAR;
  }
  return DEFAULT_BAR;
}

function getStatusText({ algorithmName, algorithmState, data, isSearch, targetValue }) {
  if (isSearch) {
    if (algorithmState.found && algorithmState.currentIndex >= 0) {
      return `Found ${targetValue} at index ${algorithmState.currentIndex}.`;
    }
    if (algorithmState.completed) {
      return `${targetValue} is not present in this array.`;
    }
    if (algorithmState.currentIndex >= 0) {
      return `Inspecting index ${algorithmState.currentIndex} with value ${data[algorithmState.currentIndex]}.`;
    }
    return `Target value: ${targetValue}.`;
  }

  if (algorithmState.completed) {
    return `${labelForAlgorithm(algorithmName)} completed.`;
  }
  if (algorithmName === 'selectionSort' && algorithmState.minIndex >= 0) {
    return `Current minimum candidate is at index ${algorithmState.minIndex}.`;
  }
  if (algorithmName === 'insertionSort' && algorithmState.pivot !== null) {
    return `Placing key ${algorithmState.pivot} into the sorted prefix.`;
  }
  if (algorithmName === 'mergeSort' && Number.isInteger(algorithmState.low) && Number.isInteger(algorithmState.high)) {
    return `Merging subarray from index ${algorithmState.low} to ${algorithmState.high}.`;
  }
  if (algorithmName === 'quickSort' && Number.isInteger(algorithmState.pivot)) {
    return `Partitioning around pivot index ${algorithmState.pivot}.`;
  }
  if (algorithmState.i >= 0 && algorithmState.j >= 0) {
    return `Comparing indices ${algorithmState.i} and ${algorithmState.j}.`;
  }
  return `Preparing ${labelForAlgorithm(algorithmName)}.`;
}

function labelForAlgorithm(algorithmName) {
  const labels = {
    bubbleSort: 'Bubble sort',
    selectionSort: 'Selection sort',
    insertionSort: 'Insertion sort',
    mergeSort: 'Merge sort',
    quickSort: 'Quick sort'
  };
  return labels[algorithmName] || 'Algorithm';
}

function drawHeader(ctx, { width, comparisons, swaps, metricLabel, statusText }) {
  ctx.fillStyle = '#0f172a';
  ctx.font = '600 18px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText(`Comparisons: ${comparisons}`, 24, 30);
  ctx.fillText(`${metricLabel}: ${swaps}`, 24, 58);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#1e293b';
  ctx.font = '600 17px Segoe UI';
  ctx.fillText(statusText, width / 2, 32);
}

function roundRect(ctx, x, y, width, height, radius) {
  const adjustedRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + adjustedRadius, y);
  ctx.lineTo(x + width - adjustedRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + adjustedRadius);
  ctx.lineTo(x + width, y + height - adjustedRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - adjustedRadius, y + height);
  ctx.lineTo(x + adjustedRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - adjustedRadius);
  ctx.lineTo(x, y + adjustedRadius);
  ctx.quadraticCurveTo(x, y, x + adjustedRadius, y);
  ctx.closePath();
}

export default VisualizationCanvas;
