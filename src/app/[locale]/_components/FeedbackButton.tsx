import { useRouter } from "next/navigation";

const FeedbackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/en/customer-feedback")}
      className="w-full p-3 bg-[#111954] text-white font-semibold rounded-md mt-4"
    >
      Your Feedback
    </button>
  );
};

export default FeedbackButton;