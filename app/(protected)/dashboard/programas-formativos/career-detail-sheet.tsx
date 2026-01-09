import { CareerDetail } from "./carrer-detail";
import { BubbleItem } from "./page";

interface Props {
    career: BubbleItem;
    onClose: () => void;
}


export const CareerDetailSheet: React.FC<Props> = ({ career, onClose }) => {
    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={onClose}
            />

            <aside
                className="
                    fixed bottom-0 left-0 right-0 z-50
                    bg-white rounded-t-3xl
                    max-h-[90vh] overflow-y-auto
                    p-6
                    animate-slide-up
                "
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500"
                >
                    ✕
                </button>
                <CareerDetail career={career} onClose={onClose} />
            </aside>
        </>
    );
};
