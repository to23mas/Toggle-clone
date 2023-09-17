import { Project } from '@/types/project'

type Props = {
	selectedItem: string
	projects: Project[]
	onSelect: (id: number) => () => void
	onToggle: (id: number) => () => void
}

export const ProjectList = ({selectedItem, projects, onSelect, onToggle }: Props) => {
	if (selectedItem !== "") {
		projects = projects.filter(p => p.name === selectedItem)
	}


	return (
		<div className="m-auto w-3/6">
			<table className="table table-fixed">
				{/* head */}
				<thead>
					<tr>
						<th />
						<th>Name</th>
						<th>Owner</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{
					projects.map((project) => (
						<tr key={project.id} className={project.active ? undefined : 'line-through'}>
							<th>{project.id}</th>
							<td>{project.name}</td>
							<td>{project.user_name}</td>
							<th>
								<button className="btn btn-neutral btn-sm mr-4"
									onClick={onSelect(project.id!)}
								>edit</button>
								<button className="btn btn-primary btn-sm"
									onClick={onToggle(project.id!)}
								>toggle</button>
							</th>
						</tr>
					)
					)
				}</tbody>
			</table>
		</div>
	)
}
