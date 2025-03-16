import { Scanner } from '@yudiel/react-qr-scanner'

import { ModalHeader, ModalWrapper } from '@components/modals'

function QRCodeScanner({
  isOpen,
  onClose,
  onScanned
}: {
  isOpen: boolean
  onClose: () => void
  onScanned: (data: string) => void
}) {
  return (
    <ModalWrapper isOpen={isOpen} minHeight="30rem">
      <ModalHeader
        icon="tabler:qrcode"
        title="qrCodeScanner"
        onClose={onClose}
      />
      {isOpen && (
        <div className="relative aspect-square h-full w-full">
          <Scanner
            allowMultiple={false}
            classNames={{
              container:
                'size-full! [&_svg]:size-full! [&_div_div_div:has(svg)]:hidden',
              video:
                'top-1/2! left-1/2! absolute! -translate-x-1/2! -translate-y-1/2!'
            }}
            onScan={codes => {
              onClose()
              onScanned(codes[0].rawValue)
            }}
          />
        </div>
      )}
    </ModalWrapper>
  )
}

export default QRCodeScanner
