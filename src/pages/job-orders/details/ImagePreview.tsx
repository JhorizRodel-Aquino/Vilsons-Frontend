import { useState, useEffect } from "react";
import Icon from "../../../components/Icon";
import useDeleteData from "../../../hooks/useDeleteData";
import ErrorModal from "../../../components/ErrorModal";

export default function ImagePreview({ images, API_URL, onSuccess }: { images: any; API_URL: string, onSuccess: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState<"before" | "after">("before");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFilename, setSelectedFilename] = useState<string | null>(null)

  const maxVisible = 5;

  const handleOpen = (setType: "before" | "after", index: number) => {
    setCurrentSet(setType);
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const {
    loading,
    error,
    closeError,
    deleteData,
  } = useDeleteData('/images');

  const handleDelete = async () => {
    if (!selectedFilename) return
    const success = await deleteData(selectedFilename);
    if (success) {
      onSuccess();
      setSelectedFilename(null)
      handleClose()
    }
  }

  useEffect(() => {
    if (selectedFilename) {
      handleDelete();
    }
  }, [selectedFilename])

  const handleClose = () => setIsModalOpen(false);

  const renderImages = (list: any[], setType: "before" | "after") => {
    const visible = list.slice(0, maxVisible);
    const extra = list.length - maxVisible;

    return (
      <div className="flex flex-wrap gap-2 relative">
        {visible.length > 0 ?
          visible.map((img, i) => (
            <div key={i} className="relative cursor-pointer group">
              {/* Delete Button - Thumbnail */}
              <button type="button" className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => { setSelectedFilename(img.filename) }}>
                <Icon name='delete' />
              </button>

              <div onClick={() => handleOpen(setType, i)}>
                <img
                  src={`${API_URL}/images/${img.filename}`}
                  className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                  alt=""
                />
                {i === visible.length - 1 && extra > 0 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-semibold rounded-lg"
                    onClick={() => handleOpen(setType, i)}
                  >
                    +{extra}
                  </div>
                )}
              </div>
            </div>
          ))
          :
          <p className="italic">No images</p>
        }
      </div>
    );
  };

  const currentImages = images?.[currentSet] || [];

  // ✅ Keyboard navigation (←, →, Esc)
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % currentImages.length);
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentImages.length]);

  return (
    <>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {/* Before Section */}
        <section className="card w-full">
          <h2 className="font-bold text-primary mb-4">Before</h2>
          {renderImages(images?.before || [], "before")}
        </section>

        {/* After Section */}
        <section className="card w-full">
          <h2 className="font-bold text-primary mb-4">After</h2>
          {renderImages(images?.after || [], "after")}
        </section>

        {/* Modal Preview */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-6 text-white text-2xl font-bold hover:opacity-80 cursor-pointer"
            >
              ✕
            </button>

            {/* Delete Button - Modal */}
            <button type="button" className="absolute top-3 right-16 p-2 cursor-pointer" onClick={() => { setSelectedFilename(currentImages[activeIndex].filename) }}>
              <Icon name='delete' color="light" />
            </button>

            {/* Image Navigation */}
            <div className="flex items-center gap-4">
              <button
                className="text-white text-5xl p-2 hover:text-gray-300 cursor-pointer"
                onClick={() =>
                  setActiveIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1))
                }
              >
                ‹
              </button>

              <img
                src={`${API_URL}/images/${currentImages[activeIndex].filename}`}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
                alt=""
              />

              <button
                className="text-white text-5xl p-2 hover:text-gray-300 cursor-pointer"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % currentImages.length)
                }
              >
                ›
              </button>
            </div>

            {/* Pagination Indicator */}
            <p className="text-white mt-4 text-sm">
              {activeIndex + 1} / {currentImages.length}
            </p>
          </div>
        )}
      </div>

      {error && <ErrorModal error={error!} closeError={closeError} />}
    </>
  );
}