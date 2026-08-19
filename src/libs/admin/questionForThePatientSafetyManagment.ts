export const fetchQuestions = async () => {
  const res = await fetch('http://192.168.1.103:80/api/patientSafety/safetyManagementQuestions')
  const result = await res.json()

  return result.data
}

export const deleteQuestion = async (id: any) => {
  const res = await fetch(`http://192.168.1.103:80/api/patientSafety/safetyManagementQuestions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    const text = await res.text()

    alert(text)
  }

  return true
}

export const createQuestion = async ({ title, status }: any) => {
  const res = await fetch('http://192.168.1.103:80/api/patientSafety/safetyManagementQuestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      status
    })
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data)
  }

  return data
}

export const updateQuestion = async ({ title, status, id }: any) => {
  const res = await fetch(`http://192.168.1.103:80/api/patientSafety/safetyManagementQuestions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      status
    })
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data)
  }

  return data
}
