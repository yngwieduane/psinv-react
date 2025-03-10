import FeedbackForm from "../_components/FeedbackForm";
export default function FeedbackPage() {
  return (
    <div className="container mx-auto max-w-[1200px] flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Your Feedback Here</h1>
        <FeedbackForm /> {/* No Feedback Button */}
      </div>
    </div>
  );
}