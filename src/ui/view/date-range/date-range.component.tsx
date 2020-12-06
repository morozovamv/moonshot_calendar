import React, { ChangeEvent } from 'react';

interface DateRangeProps {
	startDate: string;
	endDate: string;
	setStartDate: (date: string) => void;
	setEndDate: (date: string) => void;
}

export const DateRange = (props: DateRangeProps) => {
	const onStartDateChange = (e: ChangeEvent<HTMLInputElement>) => props.setStartDate(e.target.value);
	const onEndDateChange = (e: ChangeEvent<HTMLInputElement>) => props.setEndDate(e.target.value);

	return (
		<div>
			<input type="date" value={props.startDate} onChange={onStartDateChange} />
			<input type="date" value={props.endDate} onChange={onEndDateChange} />
		</div>
	);
};
