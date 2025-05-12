type Props = {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ onClose, children } : Props) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/[0.5]"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg p-8 w-1/2 z-10">
          <button
            className="absolute top-5 right-5 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            閉じる
          </button>
          {children}
        </div>
      </div>
    </>
  )
}