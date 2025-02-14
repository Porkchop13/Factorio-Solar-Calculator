import { Box, Stack, Text } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "./components/ui/number-input";

import { ColorModeButton } from "./components/ui/color-mode";
import { Field } from "./components/ui/field";
import { useState } from "react";

function App() {
  const [dayNightCycle, setDayNightCycle] = useState(420);
  const [dawnLength, setDawnLength] = useState(dayNightCycle / 5);
  const [dayLength, setDayLength] = useState(dayNightCycle / 2);
  const [duskLength, setDuskLength] = useState(dayNightCycle / 5);
  const [nightLength, setNightLength] = useState(dayNightCycle / 10);
  const [solarPowerModifier, setSolarPowerModifier] = useState(100);
  const [solarPanelPower, setSolarPanelPower] = useState(60);
  const [accumulatorCapacity, setAccumulatorCapacity] = useState(5);
  const [panelAccumulatorRatio, setPanelAccumulatorRatio] = useState(0.84);

  function updateDayNightCycle(value: number): void {
    setDayNightCycle(value);
    setDawnLength(calculateDawnLength(value));
    setDayLength(calculateDayLength(value));
    setDuskLength(calculateDuskLength(value));
    setNightLength(calculateNightLength(value));
    setPanelAccumulatorRatio(
      calculatePanelAccumulatorRatio(
        value,
        solarPanelPower,
        accumulatorCapacity,
        solarPowerModifier
      )
    );
  }

  function updateSolarPanelPower(value: number): void {
    setSolarPanelPower(value);
    setPanelAccumulatorRatio(
      calculatePanelAccumulatorRatio(
        dayNightCycle,
        value,
        accumulatorCapacity,
        solarPowerModifier
      )
    );
  }

  function updateAccumulatorCapacity(value: number): void {
    setAccumulatorCapacity(value);
    setPanelAccumulatorRatio(
      calculatePanelAccumulatorRatio(
        dayNightCycle,
        solarPanelPower,
        value,
        solarPowerModifier
      )
    );
  }

  function updateSolarPowerModifier(value: number): void {
    setSolarPowerModifier(value);
    setPanelAccumulatorRatio(
      calculatePanelAccumulatorRatio(
        dayNightCycle,
        solarPanelPower,
        accumulatorCapacity,
        value
      )
    );
  }

  return (
    <Box position="relative" p={4}>
      <ColorModeButton position="absolute" top={4} right={4} />
      <Stack maxWidth={650} margin="auto">
        <Field orientation="horizontal" label="Day-Night Cycle">
          <NumberInputRoot
            step={1}
            formatOptions={{ style: "decimal" }}
            value={dayNightCycle.toString()}
            onValueChange={(e) => updateDayNightCycle(e.valueAsNumber)}
            min={0}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>
        <Field orientation="horizontal" label="Dawn Length">
          <Text>{dawnLength.toFixed(1)}</Text>
        </Field>
        <Field orientation="horizontal" label="Day Length">
          <Text>{dayLength.toFixed(1)}</Text>
        </Field>
        <Field orientation="horizontal" label="Dusk Length">
          <Text>{duskLength.toFixed(1)}</Text>
        </Field>
        <Field orientation="horizontal" label="Night Length">
          <Text>{nightLength.toFixed(1)}</Text>
        </Field>
        <Field orientation="horizontal" label="Solar Power Modifier">
          <NumberInputRoot
            defaultValue="100"
            step={0.1}
            formatOptions={{ style: "percent" }}
            value={solarPowerModifier.toString()}
            onValueChange={(e) =>
              updateSolarPowerModifier(e.valueAsNumber * 100)
            }
            min={0}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>
        <Field orientation="horizontal" label="Solar Panel Power">
          <NumberInputRoot
            step={1}
            formatOptions={{ style: "decimal" }}
            value={solarPanelPower.toString()}
            onValueChange={(e) => updateSolarPanelPower(e.valueAsNumber)}
            min={0}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>
        <Field orientation="horizontal" label="Accumulator Capacity">
          <NumberInputRoot
            step={1}
            formatOptions={{ style: "decimal" }}
            value={accumulatorCapacity.toString()}
            onValueChange={(e) => updateAccumulatorCapacity(e.valueAsNumber)}
            min={0}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>
        <Field orientation="horizontal" label="Panel/Accumulator Ratio">
          <Text>{panelAccumulatorRatio.toFixed(3)}</Text>
        </Field>
      </Stack>
    </Box>
  );
}

function calculateDawnLength(dayNightCycle: number): number {
  return dayNightCycle * 0.2;
}

function calculateDayLength(dayNightCycle: number): number {
  return dayNightCycle * 0.5;
}

function calculateDuskLength(dayNightCycle: number): number {
  return dayNightCycle * 0.2;
}

function calculateNightLength(dayNightCycle: number): number {
  return dayNightCycle * 0.1;
}

function calculatePanelAccumulatorRatio(
  dayNightCycle: number,
  solarPanelPower: number,
  accumulatorCapacity: number,
  solarPowerModifier: number
): number {
  const dawnLength = calculateDawnLength(dayNightCycle);
  const dayLength = calculateDayLength(dayNightCycle);
  const duskLength = calculateDuskLength(dayNightCycle);
  const nightLength = calculateNightLength(dayNightCycle);
  const dawnDuskLength = (dawnLength + duskLength) / 2;

  const powerDuration = (dayLength + dawnDuskLength) / dayNightCycle;
  const accumulatorDuration =
    nightLength +
    (dawnDuskLength * (dawnDuskLength + dayLength)) / dayNightCycle;
  const power =
    (solarPanelPower * (solarPowerModifier / 100)) /
    (accumulatorCapacity * 1000);

  return powerDuration * accumulatorDuration * power;
}

export default App;
