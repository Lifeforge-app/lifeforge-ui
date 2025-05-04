import { Button } from '@components/buttons'

function SubmitButton({
  submitButtonProps,
  submitLoading,
  openType,
  onSubmitButtonClick
}: {
  submitButtonProps: React.ComponentProps<typeof Button>
  submitLoading: boolean
  openType?: 'create' | 'update' | null
  onSubmitButtonClick: () => Promise<void>
}) {
  return (
    <>
      {['create', 'update'].includes(openType ?? '') ? (
        <Button
          className="mt-6 w-full"
          icon={openType === 'create' ? 'tabler:plus' : 'tabler:pencil'}
          loading={submitLoading}
          onClick={() => {
            onSubmitButtonClick().catch(console.error)
          }}
        >
          {openType === 'create' ? 'Create' : 'Update'}
        </Button>
      ) : (
        <Button
          className="mt-4"
          {...submitButtonProps}
          loading={submitLoading}
          onClick={() => {
            onSubmitButtonClick().catch(console.error)
          }}
        />
      )}
    </>
  )
}

export default SubmitButton
