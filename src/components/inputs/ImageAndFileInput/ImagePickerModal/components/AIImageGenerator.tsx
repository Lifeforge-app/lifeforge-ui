import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@lifeforge/ui/components/buttons'
import { useLifeforgeUIContext } from '@lifeforge/ui/providers/LifeforgeUIProvider'
import fetchAPI from '@lifeforge/ui/utils/fetchAPI'

import TextAreaInput from '../../../TextAreaInput'

function AIImageGenerator({
  setFile,
  setPreview,
  defaultPrompt
}: {
  setFile: React.Dispatch<React.SetStateAction<string | File | null>>
  setPreview: React.Dispatch<React.SetStateAction<string | null>>
  defaultPrompt: string
}) {
  const { apiHost } = useLifeforgeUIContext()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

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

      setGeneratedImage(response)
    } catch {
      toast.error('Failed to generate image')
    }
  }

  useEffect(() => {
    setPrompt(defaultPrompt)
  }, [defaultPrompt])

  return !generatedImage ? (
    <>
      <TextAreaInput
        icon="tabler:edit"
        name="Prompt"
        namespace="common.misc"
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
      <img
        alt=""
        className="h-96 h-full rounded-lg object-contain shadow-custom"
        src={generatedImage}
      />
      <Button
        className="mt-6 w-full"
        icon="tabler:check"
        onClick={() => {
          setFile(generatedImage)
          setPreview(generatedImage)
        }}
      >
        Select
      </Button>
    </div>
  )
}

export default AIImageGenerator
