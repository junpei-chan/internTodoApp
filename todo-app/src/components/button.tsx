type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export function Button({ onClick, children }: Props) {
  return (
    <button
      type="button"
      className="w-fit border rounded-lg py-1 px-2 font-bold cursor-pointer"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}