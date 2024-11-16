import React, { useEffect, useRef } from 'react';

interface ChartProps {
  data: number[];
  labels: string[];
  period: string;
  animate: boolean;
  unit: string;
}

const Chart: React.FC<ChartProps> = ({ data, labels, period, animate, unit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const formatValue = (value: number) => {
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
      }
      return value.toString();
    };

    const maxValue = Math.max(...data) * 1.1 || 10;
    const xStep = graphWidth / (data.length - 1 || 1);
    const yScale = graphHeight / maxValue;

    const tickCount = 5;
    const tickStep = maxValue / tickCount;
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i * tickStep);

    const drawChart = (progress: number = 1) => {
      ctx.clearRect(0, 0, width, height);

      // Loading animation gradient
      if (animate && progress < 1) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#E0F4FF');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#E0F4FF');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, height - 2, width * progress, 2);
      }

      // Draw grid lines and data
      ctx.beginPath();
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      ticks.forEach(tick => {
        const y = height - padding - (tick * yScale);
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
      });
      ctx.stroke();

      // Draw data points and lines
      if (data.length > 0) {
        const points = data.map((value, index) => ({
          x: padding + index * xStep,
          y: height - padding - (value * yScale),
          value,
        }));

        // Draw area
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding);
        points.forEach((point, index) => {
          if (index === 0) {
            ctx.lineTo(point.x, point.y);
          } else {
            const prevPoint = points[index - 1];
            const currentProgress = Math.min(progress * data.length - (index - 1), 1);
            if (currentProgress > 0) {
              const currentX = prevPoint.x + (point.x - prevPoint.x) * currentProgress;
              const currentY = prevPoint.y + (point.y - prevPoint.y) * currentProgress;
              ctx.lineTo(currentX, currentY);
            }
          }
        });
        ctx.lineTo(points[points.length - 1].x, height - padding);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.1)';
        ctx.fill();

        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#9333ea';
        ctx.lineWidth = 2;
        points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();

        // Draw points
        points.forEach(point => {
          ctx.beginPath();
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#9333ea';
          ctx.lineWidth = 2;
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      }

      // Draw axes labels
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ticks.forEach(tick => {
        const y = height - padding - (tick * yScale);
        ctx.fillText(`${formatValue(tick)} ${unit}`, padding - 10, y + 4);
      });

      ctx.textAlign = 'center';
      labels.forEach((label, index) => {
        const x = padding + index * xStep;
        ctx.fillText(label, x, height - padding + 20);
      });
    };

    if (animate) {
      let progress = 0;
      const animationDuration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        progress = Math.min((currentTime - startTime) / animationDuration, 1);
        drawChart(progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      drawChart();
    }
  }, [data, labels, animate, unit]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={300}
      className="w-full h-auto"
    />
  );
};

export default Chart;