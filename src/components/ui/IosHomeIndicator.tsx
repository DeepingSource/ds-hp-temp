interface IosHomeIndicatorProps {
  /** Use dark pill for light backgrounds (default: false = light pill for dark bg) */
  dark?: boolean;
}

/** iOS home indicator — ~34% of screen width, matching real iPhone 15 proportion */
export default function IosHomeIndicator({ dark = false }: IosHomeIndicatorProps) {
  return (
    <div className="shrink-0 flex items-end justify-center pb-[10px] pt-[6px]">
      <div
        className={`w-[34%] h-[5px] rounded-full ${dark ? 'bg-black/20' : 'bg-white/35'}`}
        aria-hidden="true"
      />
    </div>
  );
}
