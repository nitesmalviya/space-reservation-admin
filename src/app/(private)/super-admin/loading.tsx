import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <Loader size="lg" />
    </div>
  );
}
