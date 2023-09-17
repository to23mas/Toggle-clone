import { useState } from 'react'
import { Input } from '@/components/Input'
import { TimeEntry } from '@/types/timeEntry'

type Props = {
	initialValues: TimeEntry
	onSave: (te: TimeEntry) => void
	onCancel: () => void
}

export const TimeEditForm = ({initialValues, onSave}: Props) => {
	const [te, setTe] = useState(initialValues)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setTe({ ...te, [name]: value})
	}

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault()
		onSave(te)
	}

	return (
		<form onSubmit={handleSave}>
			<Input label="Name" name="project_name" value={te.project_name ? te.project_name : "unknown name"} onChange={handleChange} />
			<Input label="Task" name="task" value={te.task} onChange={handleChange} />
			<Input label="Start time" name="start" value={te.start} onChange={handleChange} />
			<Input label="End time" name="end" value={te.end} onChange={handleChange} />
			<button className="btn btn-primary" onClick={handleSave}>Save</button>
		</form>
	)
}

