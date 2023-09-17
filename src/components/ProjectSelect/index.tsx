import { useEffect, useState } from 'react'
import { getAllProjects } from '@/clientCalls/projects'
import { FetchedProjects, Project } from '@/types/project'

type Props = {
	onSelectItem: (selectedItem: string) => void
}

export const ProjectSelect = ({ onSelectItem }: Props) => {
	const [projects, setProjects] = useState<Project[]>([])
	const [selectedItem, setSelectedItem] = useState<string>('');

	useEffect(() => {
		getAllProjects()
			.then((response) => response.json())
			.then((data: FetchedProjects) => setProjects(data.data.filter((item) => item.active)))
	}, [])

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedItem(e.target.value)
	}

	const handleButtonClick = () => {
		onSelectItem(selectedItem)
	}

	return (
		<div className="flex content-center items-center justify-center">
			<select name='name' value={selectedItem} onChange={handleSelectChange} className="select select-bordered w-full max-w-sm">
				{projects.map((p) => (
					<option key={p.id!} value={p.name}>{p.name}</option>
				))}

			</select>
			<button className="btn btn-accent ml-8 btn-md" onClick={handleButtonClick}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</button>
		</div>
	)

}
