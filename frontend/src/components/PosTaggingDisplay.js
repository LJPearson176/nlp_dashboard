// src/components/PosTaggingDisplay.js

import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Box } from '@mui/material';

function PosTaggingDisplay({ tokens }) {
  const posColors = {
    NOUN: '#FFD700',
    VERB: '#ADFF2F',
    ADJ: '#FF69B4',
    ADV: '#87CEEB',
    PRON: '#FFB6C1',
    DET: '#FFA500',
    ADP: '#40E0D0',
    PROPN: '#DA70D6',
    CONJ: '#D3D3D3',
    NUM: '#7B68EE',
    PART: '#DDA0DD',
    SYM: '#00CED1',
    INTJ: '#8FBC8F',
    PUNCT: '#C0C0C0',
    X: '#FF4500',
    SPACE: '#F0E68C',
  };

  return (
    <Box sx={{ lineHeight: '2em', mt: 2 }}>
      {tokens.map((token, index) => (
        <span
          key={index}
          style={{
            backgroundColor: posColors[token.pos] || '#FFFFFF',
            padding: '2px',
          }}
          data-tooltip-id="pos-tooltip"
          data-tooltip-content={`POS: ${token.pos}, Tag: ${token.tag}`}
        >
          {token.text}{' '}
        </span>
      ))}
      <Tooltip id="pos-tooltip" />
    </Box>
  );
}

export default PosTaggingDisplay;