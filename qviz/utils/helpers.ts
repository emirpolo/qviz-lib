import { Y_AXIS_WIDTH_LABEL, Y_AXIS_WIDTH_TICKS } from "./defaults";

const getYAxisWidth = (hasLabel = true, hasTicks = true) => {
  return (
    (hasLabel ? Y_AXIS_WIDTH_LABEL : 0) +
    5 +
    (hasTicks ? Y_AXIS_WIDTH_TICKS : 0)
  );
};

export const margins = () => ({
  top: 10,
  bottom: 50,
  left: 50,
  right: 10
});

export function identity(args) {
  return args;
}
