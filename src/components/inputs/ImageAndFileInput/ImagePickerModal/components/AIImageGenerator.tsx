import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@lifeforge/ui/components/buttons'
import { useLifeforgeUIContext } from '@lifeforge/ui/providers/LifeforgeUIProvider'
import fetchAPI from '@lifeforge/ui/utils/fetchAPI'

import TextAreaInput from '../../../TextAreaInput'

function AIImageGenerator({
  file,
  setFile,
  setPreview,
  defaultPrompt
}: {
  file: string | File | null
  setFile: React.Dispatch<React.SetStateAction<string | File | null>>
  setPreview: React.Dispatch<React.SetStateAction<string | null>>
  defaultPrompt: string
}) {
  const { apiHost } = useLifeforgeUIContext()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit() {
    if (prompt === '') {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)

    try {
      const response = await fetchAPI<string>(
        apiHost,
        '/ai/image-generation/generate-image',
        {
          method: 'POST',
          body: { prompt }
        }
      )

      setFile(response)
      setPreview(response)
    } catch {
      toast.error('Failed to generate image')
    }
  }

  useEffect(() => {
    setPrompt(defaultPrompt)
  }, [defaultPrompt])

  return !file ? (
    <>
      <TextAreaInput
        icon="tabler:edit"
        name="Prompt"
        tKey="imagePicker"
        namespace="common.modals"
        placeholder="A description of the image you want to generate"
        value={prompt}
        setValue={setPrompt}
        darker
        required
      />
      <Button
        icon="mage:stars-c"
        className="mt-6 w-full"
        disabled={prompt === ''}
        loading={loading}
        onClick={onSubmit}
      >
        Generate
      </Button>
    </>
  ) : (
    <div>
      <div className="flex h-96 w-full items-center justify-center rounded-lg bg-bg-200 p-8 shadow-custom dark:bg-bg-800/50">
        <img
          alt=""
          className="h-full rounded-lg object-contain"
          src={file as string}
        />
      </div>
      <Button
        className="mt-6 w-full"
        icon="tabler:refresh"
        onClick={() => {
          setFile(null)
          setPreview(null)
        }}
        variant="secondary"
      >
        Regenerate
      </Button>
    </div>
  )
}

export default AIImageGenerator
