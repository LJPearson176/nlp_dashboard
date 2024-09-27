// src/components/ChunkingDisplay.js

import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Box } from '@mui/material';

function ChunkingDisplay({ text, chunks }) {
  const renderTextWithChunks = () => {
    let content = [];
    let lastIndex = 0;

    // Sort chunks by start index
    chunks.sort((a, b) => a.start - b.start);

    chunks.forEach((chunk, index) => {
      // Add text before the chunk
      if (chunk.start > lastIndex) {
        content.push(
          <span key={`text-${lastIndex}`}>
            {text.slice(lastIndex, chunk.start)}
          </span>
        );
      }
      // Add the chunk with highlighting
      content.push(
        <span
          key={`chunk-${index}`}
          style={{
            backgroundColor: '#ADD8E6',
            padding: '2px',
          }}
          data-tooltip-id="chunk-tooltip"
          data-tooltip-content={`Chunk: ${chunk.labels.join(' ')}`}
        >
          {text.slice(chunk.start, chunk.end)}
        </span>
      );
      lastIndex = chunk.end;
    });

    // Add any remaining text
    if (lastIndex < text.length) {
      content.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex)}
        </span>
      );
    }

    return content;
  };

  return (
    <Box sx={{ lineHeight: '2em', mt: 2 }}>
      {renderTextWithChunks()}
      <Tooltip id="chunk-tooltip" />
    </Box>
  );
}

export default ChunkingDisplay;