import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Button,
  Paper,
  Stack
} from "@mui/material";

const symptomsList = [
  "itching",
  "skin rash",
  "nodal skin eruptions",
  "continuous sneezing",
  "shivering",
  "chills",
  "joint pain",
  "stomach pain",
  "acidity",
  "ulcers on tongue",
  "muscle wasting",
  "vomiting",
  "burning micturition",
  "spotting urination",
  "fatigue",
  "weight gain",
  "anxiety",
  "cold hands and feet",
  "mood swings",
  "weight loss"
];

export default function DiseasePredictorUI() {
  const [search, setSearch] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const filteredSymptoms = symptomsList.filter((symptom) =>
    symptom.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleClear = () => {
    setSelectedSymptoms([]);
    setSearch("");
  };

  const handlePredict = () => {
    // ⚡ Backend logic will go here — send `selectedSymptoms` to FastAPI
    console.log("Selected Symptoms:", selectedSymptoms);
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 800,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        🩺 Disease Predictor
      </Typography>

      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Search Symptoms"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {filteredSymptoms.map((symptom) => (
            <Chip
              key={symptom}
              label={symptom}
              clickable
              color={selectedSymptoms.includes(symptom) ? "primary" : "default"}
              onClick={() => handleSelect(symptom)}
            />
          ))}
        </Box>
      </Paper>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="error"
          onClick={handleClear}
          sx={{ minWidth: 120 }}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handlePredict}
          sx={{ minWidth: 120 }}
        >
          Predict Disease
        </Button>
      </Stack>

      {selectedSymptoms.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Selected Symptoms:</Typography>
          <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedSymptoms.map((symptom) => (
              <Chip
                key={symptom}
                label={symptom}
                color="primary"
                onDelete={() => handleSelect(symptom)}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
