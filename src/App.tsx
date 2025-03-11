import {
  Box,
  Stack as ChakraStack,
  Text,
  Heading,
  VStack as ChakraVStack,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  NumberInputField,
  NumberInputRoot,
} from "./components/ui/number-input";

import { ColorModeButton } from "./components/ui/color-mode";
import { Field } from "./components/ui/field";
import { useState } from "react";

interface ExtendedStackProps extends React.ComponentProps<typeof ChakraStack> {
  spacing?: number;
  direction?: "row" | "column";
  align?: string;
}

const Stack = (props: ExtendedStackProps) => <ChakraStack {...props} />;
const VStack = (props: ExtendedStackProps) => <ChakraVStack {...props} />;
const Divider = () => (
  <hr
    style={{ margin: "1rem 0", borderTop: "1px solid", borderColor: "inherit" }}
  />
);

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
    <Box position="relative" p={6}>
      <ColorModeButton position="absolute" top={6} right={6} />
      <VStack maxW={750} mx="auto" spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={3}>
            Factorio Solar Calculator
          </Heading>
          <Text color="gray.500">
            Calculate the optimal ratio of solar panels to accumulators based on
            your game settings
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            Day-Night Cycle Settings
          </Heading>
          <Stack spacing={4}>
            <Field
              orientation="horizontal"
              label="Day-Night Cycle"
              helperText="Total length of a full day-night cycle in seconds"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <NumberInputRoot
                    step={1}
                    formatOptions={{ style: "decimal" }}
                    value={dayNightCycle.toString()}
                    onValueChange={(e) => updateDayNightCycle(e.valueAsNumber)}
                    min={0}
                    width="full"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Box>
                <Tooltip label="seconds" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    s
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
            <Field
              orientation="horizontal"
              label="Dawn Length"
              helperText="Duration of sunrise transition in seconds"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <Text fontWeight="medium">{dawnLength.toFixed(1)}</Text>
                </Box>
                <Tooltip label="seconds" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    s
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
            <Field
              orientation="horizontal"
              label="Day Length"
              helperText="Duration of full daylight in seconds"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <Text fontWeight="medium">{dayLength.toFixed(1)}</Text>
                </Box>
                <Tooltip label="seconds" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    s
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
            <Field
              orientation="horizontal"
              label="Dusk Length"
              helperText="Duration of sunset transition in seconds"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <Text fontWeight="medium">{duskLength.toFixed(1)}</Text>
                </Box>
                <Tooltip label="seconds" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    s
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
            <Field
              orientation="horizontal"
              label="Night Length"
              helperText="Duration of complete darkness in seconds"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <Text fontWeight="medium">{nightLength.toFixed(1)}</Text>
                </Box>
                <Tooltip label="seconds" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    s
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4}>
            Power Settings
          </Heading>
          <Stack spacing={4}>
            <Field
              orientation="horizontal"
              label="Solar Power Modifier"
              helperText="Game setting that affects solar panel output"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <NumberInputRoot
                    defaultValue="100"
                    step={0.1}
                    formatOptions={{ style: "percent" }}
                    value={solarPowerModifier.toString()}
                    onValueChange={(e) =>
                      updateSolarPowerModifier(e.valueAsNumber * 100)
                    }
                    min={0}
                    width="full"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Box>
              </Stack>
            </Field>
            <Field
              orientation="horizontal"
              label="Solar Panel Power"
              helperText="Base power output in kW"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <NumberInputRoot
                    step={1}
                    formatOptions={{ style: "decimal" }}
                    value={solarPanelPower.toString()}
                    onValueChange={(e) =>
                      updateSolarPanelPower(e.valueAsNumber)
                    }
                    min={0}
                    width="full"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Box>
                <Tooltip label="kilowatts" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    kW
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
            <Field
              orientation="horizontal"
              label="Accumulator Capacity"
              helperText="Storage capacity in MJ"
              css={{
                "& > .chakra-field__label": {
                  minWidth: "180px",
                  marginRight: "4",
                },
              }}
            >
              <Stack direction="row" spacing={1} align="center" flex={1}>
                <Box width="120px">
                  <NumberInputRoot
                    step={1}
                    formatOptions={{ style: "decimal" }}
                    value={accumulatorCapacity.toString()}
                    onValueChange={(e) =>
                      updateAccumulatorCapacity(e.valueAsNumber)
                    }
                    min={0}
                    width="full"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Box>
                <Tooltip label="megajoules" placement="right">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    minW="20px"
                    cursor="help"
                  >
                    MJ
                  </Text>
                </Tooltip>
              </Stack>
            </Field>
          </Stack>
        </Box>

        <Box
          bg="gray.100"
          _dark={{
            bg: "gray.700",
            borderColor: "gray.600",
          }}
          p={6}
          borderRadius="lg"
          border="2px"
          borderColor="gray.200"
        >
          <Heading as="h2" size="md" mb={2}>
            Result
          </Heading>
          <Field
            orientation="horizontal"
            label="Panel/Accumulator Ratio"
            helperText="The optimal ratio of solar panels to accumulators. A ratio of 0.84 means you need 0.84 solar panels for each accumulator."
            css={{
              "& > .chakra-field__label": {
                minWidth: "180px",
                marginRight: "4",
              },
            }}
          >
            <Stack direction="row" spacing={2} align="baseline">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="blue.500"
                _dark={{ color: "blue.300" }}
              >
                {panelAccumulatorRatio.toFixed(3)}
              </Text>
              <Text color="gray.500">panels per accumulator</Text>
            </Stack>
          </Field>
        </Box>
      </VStack>
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
