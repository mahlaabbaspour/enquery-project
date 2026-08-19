// // import { toast } from 'react-toastify'

// export const createMeeting = async ({
//   title,
//   start_date,
//   end_date,
//   ward_id,
//   location,
//   description,
//   previous_meetings
// }: any) => {
//   const res = await fetch('http://192.168.1.103:80/api/meetings', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       title,
//       start_date,
//       end_date,
//       ward_id,
//       location,
//       description,
//       previous_meetings
//     })
//   })

//   const data = await res.json()

//   return data
// }

// export const fetchMeetings = async () => {
//   const res = await fetch('http://192.168.1.103:80/api/meetings')
//   const result = await res.json()

//   return result.data
// }

// export const fetchMeeting = async (id: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${id}`)
//   const result = await res.json()

//   return result.data
// }

// export const deleteMeeting = async ({ meetingId }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${meetingId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

//   console.log(meetingId, 'meetingid')

//   if (!res.ok) {
//     const text = await res.text()

//     console.log(text)
//     alert(text)
//   }

//   return true
// }

// export const updateMeeting = async ({
//   id,
//   title,
//   start_date,
//   end_date,
//   ward_id,
//   location,
//   description,
//   previous_meetings,
//   agenda,
//   invitation_message,
//   invitation_send_time
// }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       title,
//       start_date,
//       end_date,
//       ward_id,
//       location,
//       description,
//       previous_meetings,
//       agenda,
//       invitation_message,
//       invitation_send_time
//     })
//   })

//   const data = await res.json()

//   console.log(res, 'پاسخ')

//   return data
// }

// export const fetchWards = async () => {
//   const res = await fetch('http://192.168.1.103:80/api/wards/upsertData')
//   const result = await res.json()

//   return result.data
// }

// export const fetchMeetingMembers = async (id: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${id}/meetingMembers`)
//   const result = await res.json()

//   return result.data
// }

// export const createMeetingMember = async ({ user_ids, organization_role_id, meetingId }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingMembers`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       user_ids,
//       organization_role_id
//     })
//   })

//   const data = await res.json()

//   if (!res.ok || data.status === false) {
//     const errors = data.data?.join('\n') || ''

//     alert(`${data.message}\n${errors}`)
//   }

//   return data
// }

// export const deleteMeetingMember = async ({ meetingId, id }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingMembers/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

//   if (!res.ok) {
//     const text = await res.text()

//     alert(text)
//   }

//   return true
// }

// export const updadteVisitorLeader = async ({ MeetingId, visitor_leader_id }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${MeetingId}/updateVisitorLeader`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       visitor_leader_id
//     })
//   })

//   const data = await res.json()

//   if (!res.ok) {
//     alert(data)
//   }

//   return data
// }

// export const updadteVisitedLeader = async ({ MeetingId, visited_leader_id }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${MeetingId}/updateVisitedLeader`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       visited_leader_id
//     })
//   })

//   const data = await res.json()

//   if (!res.ok) {
//     alert(data)
//   }

//   return data
// }

// export const updateMeetingQuestions = async ({ MeetingId, questioner_id, questionId }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${MeetingId}/meetingQuestions/${questionId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       questioner_id
//     })
//   })

//   const data = await res.json()

//   if (!res.ok) {
//     alert(data)
//   }

//   return data
// }

// export const fetchMeetingQuestion = async (meetingId: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions`)

//   const result = await res.json()

//   return result?.data ?? []
// }

// export const fetchShowMeetingAnswer = async (meetingId: any, questionId: any, id: any) => {
//   const res = await fetch(
//     `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses/${id}`
//   )

//   const result = await res.json()

//   return result?.data ?? []
// }

// export const createAnswer = async ({ meetingId, questionId, responder_id, response_text }: any) => {
//   const res = await fetch(
//     `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         responder_id,
//         response_text
//       })
//     }
//   )

//   const data = await res.json()

//   if (!res.ok || data.status === false) {
//     const errors = data.data?.join('\n') || ''

//     alert(`${data.message}\n${errors}`)
//   }

//   return data
// }

// export const updateAnswer = async ({ meetingId, questionId, responder_id, response_text, id }: any) => {
//   const res = await fetch(
//     `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses/${id}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         responder_id,
//         response_text
//       })
//     }
//   )

//   const data = await res.json()

//   if (!res.ok) {
//     alert(data)
//   }

//   return data
// }

// export const fetchAnswers = async (meetingId: any, questionId: any) => {
//   const res = await fetch(
//     `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses`
//   )

//   const result = await res.json()

//   return result.data
// }

// export const deleteAnswer = async ({ meetingId, questionId, id }: any) => {
//   const res = await fetch(
//     `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses/${id}`,
//     {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   )

//   if (!res.ok) {
//     const text = await res.text()

//     alert(text)
//   }

//   return true
// }

// export const updateQuestioner = async ({ id, questioner_id, meetingId }: any) => {
//   const res = await fetch(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       questioner_id
//     })
//   })

//   const data = await res.json()

//   if (!res.ok) {
//     console.log(data)

//     // toast.error(data)
//   }

//   return data
// }

import axios from 'axios'
import { toast } from 'react-toastify'

export const api = axios.create({
  baseURL: 'http://192.168.1.103:80/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const handleError = (error: any) => {
  const message = error?.response?.data?.message || error?.response?.data || 'خطایی رخ داده است'

  toast.error(message)
}

export const createMeeting = async (data: any) => {
  try {
    const res = await api.post('/meetings', data)

    return res.data
  } catch (error) {
    console.log(error, 'error')
    handleError(error)
  }
}

export const fetchMeetings = async () => {
  try {
    const res = await api.get('/meetings')

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const fetchMeetingShow = async (id: any) => {
  try {
    const res = await api.get(`/meetings/${id}`)

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const deleteMeeting = async (meetingId: any) => {
  try {
    await api.delete(`/meetings/${meetingId}`)
    toast.success('جلسه حذف شد')

    return true
  } catch (error) {
    handleError(error)
  }
}

export const updateMeeting = async ({ data, id }: any) => {
  try {
    const res = await api.put(`/meetings/${id}`, data)

    return res.data
  } catch (error: any) {
    console.log('ERROR DATA:', error.response?.data)
    console.log('ERROR STATUS:', error.response?.status)
    throw error
  }
}

export const fetchWards = async () => {
  try {
    const res = await api.get('/wards/upsertData')

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const fetchMeetingMembers = async (id: any) => {
  try {
    const res = await api.get(`/meetings/${id}/meetingMembers`)

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const createMeetingMember = async ({ meetingId, ...data }: any) => {
  try {
    const res = await api.post(`/meetings/${meetingId}/meetingMembers`, data)

    if (res.data.status === false) {
      const errors = res.data.data?.join('\n') || ''

      toast.error(`${res.data.message}\n${errors}`)
    }

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const deleteMeetingMember = async ({ meetingId, id }: any) => {
  try {
    await api.delete(`/meetings/${meetingId}/meetingMembers/${id}`)
    toast.success('عضو حذف شد')

    return true
  } catch (error) {
    handleError(error)
  }
}

export const updadteVisitorLeader = async ({ MeetingId, visitor_leader_id }: any) => {
  try {
    const res = await api.put(`/meetings/${MeetingId}/updateVisitorLeader`, {
      visitor_leader_id
    })

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const updadteVisitedLeader = async ({ MeetingId, visited_leader_id }: any) => {
  try {
    const res = await api.put(`/meetings/${MeetingId}/updateVisitedLeader`, {
      visited_leader_id
    })

    console.log(res.data)

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const updateMeetingQuestions = async ({ MeetingId, questionId, questioner_id }: any) => {
  try {
    const res = await api.put(`/meetings/${MeetingId}/meetingQuestions/${questionId}`, { questioner_id })

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const fetchMeetingQuestion = async (meetingId: any) => {
  try {
    const res = await api.get(`/meetings/${meetingId}/meetingQuestions`)

    return res.data?.data ?? []
  } catch (error) {
    handleError(error)
  }
}

export const fetchShowMeetingAnswer = async (meetingId: any, questionId: any, id: any) => {
  try {
    const res = await api.get(`/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses/${id}`)

    return res.data?.data ?? []
  } catch (error) {
    handleError(error)
  }
}

export const createAnswer = async ({ meetingId, questionId, ...data }: any) => {
  try {
    const res = await api.post(`/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses`, data)

    if (res.data.status === false) {
      const errors = res.data.data?.join('\n') || ''

      toast.error(`${res.data.message}\n${errors}`)
    }

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const updateAnswer = async ({ meetingId, questionId, id, ...data }: any) => {
  try {
    const res = await api.put(
      `/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses/${id}`,
      data
    )

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const fetchAnswers = async (meetingId: any, questionId: any) => {
  const res = await axios.get(
    `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses`
  )

  return res.data
}

export const deleteAnswer = async ({ meetingId, questionId, id }: any) => {
  try {
    await axios.delete(
      `http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses/${id}`
    )

    toast.success('پاسخ با موفقیت حذف شد')

    return true
  } catch (error: any) {
    const serverMessage = error?.response?.data?.message || error?.response?.data || 'خطایی رخ داده است'

    toast.error(serverMessage)

    return false
  }
}

export const updateQuestioner = async ({ id, questioner_id, meetingId }: any) => {
  try {
    const res = await axios.put(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingQuestions/${id}`, {
      questioner_id
    })

    toast.success('با موفقیت بروزرسانی شد')

    return res.data
  } catch (error: any) {
    const serverMessage = error?.response?.data?.message || error?.response?.data || 'خطا در بروزرسانی'

    toast.error(serverMessage)

    return null
  }
}

export const fetchApproval = async (id: any) => {
  try {
    const res = await api.get(`/meetings/${id}/meetingApprovals`)

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const fetchPriorities = async () => {
  try {
    const res = await api.get('/priorities/upsertData')

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const fetchUsers = async () => {
  try {
    const res = await api.get('/users')

    return res.data.data
  } catch (error) {
    handleError(error)
  }
}

export const createApproval = async ({ data, id }: any) => {
  try {
    const res = await axios.post(`http://192.168.1.103:80/api/meetings/${id}/meetingApprovals`, data)

    return res.data
  } catch (error) {
    console.log(error, 'error')
    handleError(error)
  }
}

export const updateApproval = async ({ data, meetingId, id }: any) => {
  try {
    data.append('_method', 'PUT')

    const res = await axios.post(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingApprovals/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('API RESPONSE:', res.data)

    return res.data
  } catch (error) {
    console.log('UPDATE APPROVAL ERROR:', error)
    handleError(error)
  }
}

export const deleteApproval = async ({ meetingId, id }: any) => {
  try {
    await axios.delete(`http://192.168.1.103:80/api/meetings/${meetingId}/meetingApprovals/${id}`)

    toast.success('مصوبه با موفقیت حذف شد')

    return true
  } catch (error: any) {
    const serverMessage = error?.response?.data?.message || error?.response?.data || 'خطایی رخ داده است'

    toast.error(serverMessage)

    return false
  }
}

export const updateToggleAttendance = async ({ MeetingId, memberId }: any) => {
  try {
    const res = await api.post(`/meetings/${MeetingId}/meetingMembers/${memberId}/toggleAttendance`)

    console.log(res.data)

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const sendOtp = async ({ MeetingId, memberId }: any) => {
  try {
    const res = await api.post(`/meetings/${MeetingId}/meetingMembers/${memberId}/sendOtp`)

    console.log(res.data)

    // const otpCode = res.data.data.otpCode

    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const verifyAttendance = async ({ MeetingId, memberId, data }: any) => {
  console.log(
    {
      MeetingId,
      memberId,
      data
    },
    'data ersaly'
  )

  try {
    const res = await api.post(`/meetings/${MeetingId}/meetingMembers/${memberId}/verifyAttendance`, data)

    console.log(res.data, 'data veryfy')

    return res.data
  } catch (error: any) {
    console.log(error?.response?.data)
    handleError(error)
  }
}
