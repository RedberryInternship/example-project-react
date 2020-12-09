import { useForm } from 'react-hook-form'
import { GoToNextPage } from 'screens/authentication/registration/types'

/**
 * Registration second step hook.
 */
export default (setActivePage: any) => {
  const {
    control,
    handleSubmit,
    getValues,
    errors,
    triggerValidation,
  } = useForm(
    {
      validateCriteriaMode: 'all',
      submitFocusError: true,
    },
  )

  /**
   * Go to next page.
   */
  const buttonClickHandler: GoToNextPage = async () => {
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
