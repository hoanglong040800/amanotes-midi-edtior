import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, type FieldValues, type Path, useFormContext } from "react-hook-form";

type Props<TFieldValues extends FieldValues = FieldValues> = {
	name: Path<TFieldValues>;
	label: string;
	options: string[];
};

function getErrorMessage<TFieldValues extends FieldValues>(
	errors: FieldValues,
	name: Path<TFieldValues>
) {
	const fieldError = errors[name as string] as { message?: string } | undefined;
	return fieldError?.message;
}

function getSelectedValues(value: unknown): string[] {
	return Array.isArray(value) ? (value as string[]) : [];
}

const MultiSelect = <TFieldValues extends FieldValues = FieldValues>({
	name,
	label,
	options,
}: Props<TFieldValues>) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<TFieldValues>();

	const errorMessage = getErrorMessage(errors, name);

	return (
		<FormControl fullWidth error={Boolean(errorMessage)} className="multi-select">
			<InputLabel>{label}</InputLabel>

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<MultiSelectField
						label={label}
						options={options}
						selectedValues={getSelectedValues(field.value)}
						onChange={field.onChange}
					/>
				)}
			/>

			{errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
};

export default MultiSelect;

type FieldProps = {
	label: string;
	options: string[];
	selectedValues: string[];
	onChange: (value: string | string[]) => void;
};

const MultiSelectField = ({ label, options, selectedValues, onChange }: FieldProps) => (
	<Select
		input={<OutlinedInput label={label} />}
		multiple
		value={selectedValues}
		onChange={(event) => onChange(event.target.value)}
		renderValue={(selected) => (selected as string[]).join(", ")}
	>
		{options.map((option) => (
			<MenuItem key={option} value={option}>
				<Checkbox checked={selectedValues.includes(option)} sx={{ mr: 1 }} />
				<Typography variant="body2">{option}</Typography>
			</MenuItem>
		))}
	</Select>
);
