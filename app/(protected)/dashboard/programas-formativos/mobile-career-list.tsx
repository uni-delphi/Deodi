import { BubbleItem, BubbleType } from "./page";

interface Props {
    items: BubbleItem[];
    onSelect: (career: BubbleItem) => void;
    colorByType: BubbleType;
}

export const MobileCareerList: React.FC<Props> = ({ items, onSelect, colorByType }) => {
    return (
        <div className="w-full px-4 pb-24 space-y-3">
            {items.map(item => (
                <button
                    key={item.label}
                    onClick={() => onSelect(item)}
                    className="
                        w-full flex items-center justify-between
                        p-4 rounded-2xl
                        bg-white shadow-sm border
                        active:scale-[0.98]
                        transition
                    "
                >
                    <div className="flex flex-col text-left">
                        <span className="font-medium text-gray-800">
                            {item.label}
                        </span>
                        <span className="text-xs text-gray-500">
                            {item.type}
                        </span>
                    </div>

                    <div
                        className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            text-white text-xs font-bold
                            ${colorByType[item.type]}
                        `}
                    >
                        {item.type.toUpperCase()}
                    </div>
                </button>
            ))}
        </div>
    );
};
