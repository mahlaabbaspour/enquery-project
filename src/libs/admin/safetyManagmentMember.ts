export const fetchUpsertDataOrganizaitonRole = async () => {
  const res = await fetch('http://192.168.1.103:80/api/organizations/organizationRoles/upsertData')
  const result = await res.json()

  return result.data
}

export const fetchUpsertDataUsers = async () => {
  const res = await fetch('http://192.168.1.103:80/api/users')
  const result = await res.json()

  return result.data
}

export const fetchMembers = async () => {
  const res = await fetch('http://192.168.1.103:80/api/patientSafety/safetyManagementMembers')
  const result = await res.json()

  return result.data
}

export const deleteMember = async (id: any) => {
  const res = await fetch(`http://192.168.1.103:80/api/patientSafety/safetyManagementMembers/${id}`, {
    method: 'DELETE'
  })

  if (!res.ok) {
    const text = await res.text()

    alert(text)
  }

  return true
}

export const createMember = async ({ user_ids, organization_role_id }: any) => {
  const res = await fetch('http://192.168.1.103:80/api/patientSafety/safetyManagementMembers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_ids,
      organization_role_id
    })
  })

  const data = await res.json()

  if (!res.ok || data.status === false) {
    const errors = data.data?.join('\n') || ''

    alert(`${data.message}\n${errors}`)
  }

  return data
}

export const updateMember = async ({ user_id, organization_role_id, id }: any) => {
  const res = await fetch(`http://192.168.1.103:80/api/patientSafety/safetyManagementMembers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id,
      organization_role_id
    })
  })

  const data = await res.json()

  if (!res.ok || data.status === false) {
    const errors = data.data?.join('\n') || ''

    alert(`${data.message}\n${errors}`)
  }

  return data
}
