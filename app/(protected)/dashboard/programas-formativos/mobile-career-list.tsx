import { BubbleItem, BubbleType } from "./page";

interface Props {
    items: BubbleItem[];
    onSelect: (career: BubbleItem) => void;
    colorByType: Record<number, string>;
}

export const MobileCareerList: React.FC<Props> = ({ items, onSelect, colorByType }) => {
    return (
        <div className="w-full px-4 pb-24 space-y-3">
            {items.map((item, index) => (
                <button
                    key={item.nombre_ruta}
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
                            {item.nombre_ruta}
                        </span>
                        <span className="text-xs text-gray-500">
                            {item.type}
                        </span>
                    </div>

                    <div
                        className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            text-white text-xs font-bold
                            ${colorByType[Math.floor(Math.random() * (3 - 1 + 1)) + 1]}
                        `}
                    >
                        {item.type}
                    </div>
                </button>
            ))}
        </div>
    );
};
