import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";

const steps = ["Start", "Configure", "Launch"];

const Third = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen p-10 transition duration-500 ease-in-out ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-pink-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Theme Toggle */}
        <div className="flex justify-end">
          <FormControlLabel
            control={
              <Switch checked={darkMode} onChange={toggleDarkMode} color="secondary" />
            }
            label="Dark Mode"
          />
        </div>

        {/* Stepper */}
        <Card
          className={`rounded-2xl shadow-xl border transition duration-300 ${
            darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
          }`}
        >
          <CardContent>
            <Typography variant="h5" className="font-bold mb-4">
              Interactive Setup
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div className="mt-6 text-center">
              {activeStep === steps.length - 1 ? (
                <Typography className="text-green-500 font-semibold text-lg">
                  🎉 Setup Complete!
                </Typography>
              ) : (
                <Typography className="text-lg">
                  Current Step:{" "}
                  <span className="font-bold text-blue-500">{steps[activeStep]}</span>
                </Typography>
              )}
            </div>

            <Divider className="my-6" />

            <div className="flex justify-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                className="rounded-full"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                className="rounded-full"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Third;
