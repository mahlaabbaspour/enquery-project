import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import {
  api,
  createAnswer,
  createApproval,
  createMeeting,
  createMeetingMember,
  deleteAnswer,
  deleteApproval,
  deleteMeeting,
  deleteMeetingMember,
  updateAnswer,
  updateApproval,
  updateMeeting,
  updateToggleAttendance,
  verifyAttendance
} from '@/libs/admin/meeting'

export const useFetchMeetings = () => {
  return useQuery({
    queryKey: ['meeting'],
    queryFn: async () => {
      const res = await api.get('/meetings')

      return res.data?.data
    }
  })
}

export function useCreateMeeting() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meeting'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateMeeting() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meeting'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteMeeting() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meeting'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export const useFetchMeetingMembers = (meetingId: any) => {
  return useQuery({
    queryKey: ['meetingMember', meetingId],

    queryFn: async () => {
      const res = await api.get(`/meetings/${meetingId}/meetingMembers`)

      return res.data?.data
    }
  })
}

export function useCreateMeetingMember() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createMeetingMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingMember'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteMeetingMember() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteMeetingMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingMember'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export const useFetchApproval = (meetingId: any) => {
  return useQuery({
    queryKey: ['approval'],

    queryFn: async () => {
      const res = await api.get(`/meetings/${meetingId}/meetingApprovals`)

      return res.data?.data
    }
  })
}

export function useCreateApproval() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createApproval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approval'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateApproval() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateApproval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approval'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteApproval() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteApproval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approval'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export const useFetchAnswer = ({ meetingId, questionId }: any) => {
  return useQuery({
    queryKey: ['answer', meetingId, questionId],

    queryFn: async () => {
      const res = await api.get(`/meetings/${meetingId}/meetingQuestions/${questionId}/meetingQuestionResponses`)

      return res.data?.data
    },
    enabled: !!meetingId && !!questionId
  })
}

export function useCreateAnswer() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answer'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteAnswer() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answer'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateAnswer() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answer'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateToggleAttendance() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateToggleAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingMember'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useVerifyAttendance() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verifyAttendance,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meetingMember', variables.MeetingId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
