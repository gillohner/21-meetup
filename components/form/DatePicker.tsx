// components/form/DatePicker.tsx
import React, { useState } from 'react';
import { Button, Modal, FormControl, Input, Box, VStack } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ label, date, onDateChange }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    onDateChange(currentDate);
  };

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        value={date ? date.toLocaleString() : ''}
        isReadOnly
        onFocus={() => setShow(true)}
      />
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <Box p={4} justifyContent="center" alignItems="center">
          <VStack space={4}>
            <DateTimePicker
              value={date || new Date()}
              mode="datetime"
              display="default"
              onChange={onChange}
            />
            <Button mt={4} onPress={() => setShow(false)}>
              Confirm
            </Button>
          </VStack>
        </Box>
      </Modal>
    </FormControl>
  );
};

export default CustomDatePicker;
