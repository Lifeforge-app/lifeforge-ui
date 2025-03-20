import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@components/buttons'

function MissingAPIKeyScreen({
  requiredAPIKeys
}: {
  requiredAPIKeys: string[]
}) {
  const { t } = useTranslation('apps.apiKeys')

  return (
    <div className="flex-center size-full flex-1 flex-col gap-4">
      <Icon className="size-28" icon="tabler:key-off" />
      <h2 className="text-4xl font-semibold">{t('missing.title')}</h2>
      <p className="text-center text-lg text-bg-500">
        {t('missing.description')}
      </p>
      <p className="mt-4 mb-8 text-center text-lg text-bg-500">
        {t('missing.requiredKeysAre')} <code>{requiredAPIKeys.join(', ')}</code>
      </p>
      <Button iconAtEnd as={Link} icon="tabler:arrow-right" to="/api-keys">
        Config API Keys
      </Button>
    </div>
  )
}

export default MissingAPIKeyScreen
