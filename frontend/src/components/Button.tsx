interface IButton {
  onClick: () => void,
  children: React.ReactNode
}

export const Button = ({ onClick, children }: IButton) => {
  return (
    <button onClick={onClick} className="text-white text-xl  focus:text-2xl tracking-widest font-bold hover:font-extrabold  w-3/4 h-2/10 shadow-2xl shadow-lime-700  bg-lime-500 hover:bg-lime-600  py-4 px-6 rounded-lg">
      {children}
    </button>
  )
}