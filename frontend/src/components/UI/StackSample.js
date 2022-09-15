import { Stack } from '@mui/material';

const StackSample = () => {
  return (
    <Stack spacing={2}>
      <div className="text-red-300 underline">Item 1</div>
      <div className="bg-orange-300">Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
};

export default StackSample;
