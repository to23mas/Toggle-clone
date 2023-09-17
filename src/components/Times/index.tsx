'use client'

import { useState } from 'react'
import { TimeDialog } from '../TimeDialog'
import { TimeList } from '../TimeList'
import { TimeEntry } from '@/types/timeEntry'
import { useRouter } from 'next/navigation'
import { TimeEditForm } from '../TimeEditForm'
import { createTE, updateTE } from '@/clientCalls/timeEntries'

type Props = {
	tes: TimeEntry[]
}

export const Times = ({ tes }: Props) => {
  const [editingTime, setEditingTime] = useState<TimeEntry | undefined>(undefined)
  const router = useRouter()

  const selectTime = (id: number) => () => {
    setEditingTime(tes.find((t) => t.id === id))
  }

  const saveTime = async (time: TimeEntry) => {
    if (time.id === undefined) {
      const res = await createTE(time)
      if (res.ok) {
        router.refresh()
        setEditingTime(undefined)
      }
    } else {
      const res = await updateTE(time)
      if (res.ok) {
        router.refresh()
        setEditingTime(undefined)
      }
    }
  }

	return (
		<>
			<TimeDialog open={editingTime !== undefined} close={() => setEditingTime(undefined)}>
				{editingTime !== undefined && <TimeEditForm initialValues={editingTime} onSave={saveTime} onCancel={() => setEditingTime(undefined)} /> }
			</TimeDialog>
			<TimeList tes={tes} onSelect={selectTime} />
		</>
	)
}
