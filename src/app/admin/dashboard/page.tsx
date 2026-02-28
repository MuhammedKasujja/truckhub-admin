export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
        />
      ))}
    </div>
  );
}
