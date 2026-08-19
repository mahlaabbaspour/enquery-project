import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createEnquiry, getEnquiry, updateEnquiry } from '@/libs/admin/enquiry/enquiry'

export function useCreateEnquiry() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation<any, any, any>({
    mutationFn: createEnquiry,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['enquiries']
      })

      toast.success('درخواست با موفقیت ایجاد شد')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'خطایی رخ داد!')
    }
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}

export function useGetEnquiry(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['enquiry', id],
    queryFn: () => getEnquiry(id),
    enabled: !!id
  })

  return {
    data,
    isLoading,
    error
  }
}

export function useUpdateEnquiry() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateEnquiry,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['enquiry']
      })

      toast.success('درخواست با موفقیت ویرایش شد')
    },

    onError: (error: any) => {
      toast.error(error?.message ?? 'خطایی رخ داد!')
    }
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}
