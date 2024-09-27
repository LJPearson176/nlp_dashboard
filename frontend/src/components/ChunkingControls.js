// src/components/ChunkingControls.js

import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

function ChunkingControls({ onApplyFormula }) {
  const [customFormula, setCustomFormula] = useState('');
  const predesignedFormulas = [
    { name: 'Noun Phrases (NP)', formula: 'DET? ADJ* NOUN+' },
    { name: 'Verb Phrases (VP)', formula: 'AUX* VERB+' },
    { name: 'Prepositional Phrases (PP)', formula: 'ADP DET? NOUN+' },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Predesigned Formulas:</Typography>
      <Box sx={{ mt: 1 }}>
        {predesignedFormulas.map((item, index) => (
          <Button
            key={index}
            variant="outlined"
            color="primary"
            onClick={() => onApplyFormula(item.formula)}
            sx={{ mr: 1, mt: 1 }}
          >
            {item.name}
          </Button>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Custom Formula:
      </Typography>
      <TextField
        label="Enter POS formula (e.g., 'ADJ NOUN')"
        variant="outlined"
        fullWidth
        value={customFormula}
        onChange={(e) => setCustomFormula(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onApplyFormula(customFormula)}
        sx={{ mt: 2 }}
      >
        Apply Custom Formula
      </Button>
    </Box>
  );
}

export default ChunkingControls;