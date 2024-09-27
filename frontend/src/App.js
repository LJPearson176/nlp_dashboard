// src/App.js

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  CssBaseline,
} from '@mui/material';
import PosTaggingDisplay from './components/PosTaggingDisplay';
import ChunkingControls from './components/ChunkingControls';
import ChunkingDisplay from './components/ChunkingDisplay';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [chunks, setChunks] = useState([]);

  const handlePosTagging = () => {
    const formData = new FormData();
    formData.append('text', inputText);

    axios
      .post('/pos_tagging/', formData)
      .then((response) => {
        setTokens(response.data.tokens);
        setChunks([]); // Reset chunks when new text is analyzed
      })
      .catch((error) => {
        console.error('Error during POS tagging:', error);
      });
  };

  const handleApplyFormula = (formula) => {
    const formData = new FormData();
    formData.append('text', inputText);
    formData.append('formula', formula);

    axios
      .post('/chunking/', formData)
      .then((response) => {
        setChunks(response.data.chunks);
      })
      .catch((error) => {
        console.error('Error during chunking:', error);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          NLP Interactive Analytical Dashboard
        </Typography>

        <TextField
          label="Enter your text here"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handlePosTagging}
          sx={{ mt: 2 }}
        >
          Analyze Text
        </Button>

        {tokens.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              POS Tagging Result
            </Typography>
            <PosTaggingDisplay tokens={tokens} />

            <ChunkingControls onApplyFormula={handleApplyFormula} />

            {chunks.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                  Chunking Result
                </Typography>
                <ChunkingDisplay text={inputText} chunks={chunks} />
              </>
            )}
          </>
        )}
      </Container>
    </React.Fragment>
  );
}

export default App;