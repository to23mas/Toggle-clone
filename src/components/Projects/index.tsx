'use client'

import { useState } from 'react'
import { Project } from '@/types/project'
import { ProjectList } from '@/components/ProjectList'
import { createProject, updateProject } from '@/clientCalls/projects'
import { useRouter } from 'next/navigation'
import { Dialog } from '@/components/Dialog'
import { ProjectForm } from '@/components/ProjectForm'
import { ProjectSelect } from '../ProjectSelect'


type Props = {
  projects: Project[]
}

export const Projects = ({ projects }: Props) => {
	const [editingProject, setEditingProject] = useState<Project | undefined>(undefined)
	const [selectedItem, setSelectedItem] = useState<string>('');

	const router = useRouter()

	const selectProject = (id: number) => () => {
		setEditingProject(projects.find((p) => p.id === id))
	}

	const toggleProject = (id: number) => async () => {
		const p = projects.find((p) => p.id === id)!
		const res = await updateProject({ ...p, active: !p.active})
		if (res.ok) {
			router.refresh()
		}
	}

	const saveProject = async (project: Project) => {
		if (project.id === undefined) {
			const res = await createProject(project)
			if (res.ok) {
				router.refresh()
				setEditingProject(undefined)
			}
		} else {
			const res = await updateProject(project)
			if (res.ok) {
				router.refresh()
				setEditingProject(undefined)
			}
		}
	}

	const handleSelectionChange = (item: string) => {
		setSelectedItem(item);
	};

	return (
		<>
			<Dialog open={editingProject !== undefined} close={() => setEditingProject(undefined)}>
				{editingProject !== undefined && <ProjectForm initialValues={editingProject} onSave={saveProject} onCancel={() => setEditingProject(undefined)} />}
			</Dialog>
			<div className='flex items-center justify-center m-10'>
				<button className="btn-lg btn-primary rounded-lg"
					onClick={() => setEditingProject({id: undefined, name: '', active: true, user_name: process.env.NEXT_PUBLIC_USERNAME!})}
					>New
				</button>
			</div>
			<ProjectSelect onSelectItem={handleSelectionChange} />
			<ProjectList selectedItem={selectedItem} projects={projects} onSelect={selectProject} onToggle={toggleProject} />
		</>
	)
}
