// Vobi Done: remove unused vars
import { useForm } from 'react-hook-form'

export default (setActivePage: any) => {
  const {
    control,
    handleSubmit,
    getValues,
    errors,
    triggerValidation,
  } = useForm({
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })

  const buttonClickHandler = async (): Promise<void> => {
    setActivePage(2)
  }

  return {
    buttonClickHandler,
    handleSubmit,
    control,
    getValues,
    errors,
    triggerValidation,
  }
}
