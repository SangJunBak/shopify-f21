import { TextFieldProps } from "@material-ui/core";
import { InputProps as StandardInputProps } from "@material-ui/core/Input/Input";
import moment, { Moment } from "moment";
import React, { ChangeEvent, FC, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import Input from "shared/Input/Input";

type YearPickerProps = {};

const CURRENT_DATE = moment();

// TODO: Expose dates as props
const YearPicker: FC<YearPickerProps> = (props) => {
  const [selectedDate, handleDateChange] = useState<Moment | null>(moment());

  return (
    <DatePicker
      views={["year"]}
      label="Year only"
      value={selectedDate}
      onChange={(date) => handleDateChange(date)}
      disableFuture={true}
      maxDate={CURRENT_DATE}
      TextFieldComponent={(textFieldProps: TextFieldProps) => (
        <Input
          {...textFieldProps.inputProps}
          onClick={textFieldProps.onClick}
          onFocus={textFieldProps.onFocus}
          onBlur={textFieldProps.onBlur}
          defaultValue={textFieldProps.value as string[]}
          label={textFieldProps.label as string}
          readOnly
          disabled
        />
      )}
    />
  );
};

export default YearPicker;
