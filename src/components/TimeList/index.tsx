import { deleteTE } from '@/clientCalls/timeEntries'
import { TimeEntry } from '@/types/timeEntry'
import { useRouter } from 'next/navigation'

type Props = {
  tes: TimeEntry[]
  onSelect: (id: number) => () => void
}

export const TimeList = ({ tes, onSelect }: Props) => {
	const router = useRouter()

  const deleteTimeEntry = (id: number) => async () => {
    const p = tes.find((d: TimeEntry) => d.id === id)!
		if (p) {
			const res = await deleteTE(id)
			if (res.ok) {
				router.refresh()
			}
		}
  }

	return (
		<div className="overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th />
						<th>Project id</th>
						<th>Task</th>
						<th>Start</th>
						<th>End</th>
						<th>Owner</th>
						<th>Project name</th>
					</tr>
				</thead>
				<tbody>
					{tes.map((te: TimeEntry) => (
						<tr key={te.id}>
							<th></th>
							<th>{te.project_id}</th>
							<td>{te.task}</td>
							<td>{te.start}</td>
							<td>{te.end}</td>
							<td>{te.user_name}</td>
							<td>{te.project_name}</td>
							<th>
								<button
									className="btn btn-neutral btn-sm mr-4"
									onClick={onSelect(te.id)}
									>Edit
								</button>
								<button
									className="btn btn-neutral btn-sm mr-4"
									onClick={deleteTimeEntry(te.id)}
									>Delete
								</button>
							</th>
						</tr>
					)
					)
				}
				</tbody>
			</table>
		</div>
	)
}

