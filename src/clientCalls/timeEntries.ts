import { generateLocalUrl, generateUrl } from '@/helpers/generate_url'
import { TimeEntry } from '@/types/timeEntry'

export const createTE = async (timeEntry: TimeEntry) => {
	return await fetch(generateLocalUrl('/time-entries'), {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(timeEntry)
	})
}

export const deleteTE = async (id: number) => {
	return await fetch(generateUrl('/time-entries'), {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			'id': id,
			'user_name': process.env.NEXT_PUBLIC_USERNAME
		})
	})
}

export const updateTE = async (time: TimeEntry) => {
	return await fetch(generateUrl('/time-entries'), {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			'project_name': time.project_name,
			'id': time.id,
			'task': time.task,
			'start': time.start,
			'end': time.end,
			'project_id': time.project_id,
			'user_name': process.env.NEXT_PUBLIC_USERNAME

		})
  })
}
