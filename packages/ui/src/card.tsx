export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border border-orange-300 rounded p-4">
      <h2 className="text-xl border-b border-orange-300 pb-2">
        {title}
      </h2>
      <p>{children}</p>
      </div>
  );
}
