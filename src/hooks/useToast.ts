import { useCallback } from 'react'
import {
	RootState,
	toastSliceInitialState,
	toastSliceActions,
} from '../store/store'
import { useDispatch, useSelector } from 'react-redux'

type ToastBody = Omit<typeof toastSliceInitialState, 'showToast'>

export const useToast = () => {
	const { showToast, ...data } = useSelector((state: RootState) => state.toast)
	const dispatch = useDispatch()

	const toast = useCallback(
		(data: ToastBody) => {
			dispatch(toastSliceActions.hideToast())
			setTimeout(() => {
				dispatch(toastSliceActions.showToast(data))
			}, 100)
		},
		[dispatch]
    )
    
    const hideToast = useCallback(() => {
        dispatch(toastSliceActions.hideToast())
    }, [dispatch])

	return {
		isToastVisible: showToast,
		toast,
        hideToast,
        data
	}
}
