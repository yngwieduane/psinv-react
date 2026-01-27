"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePathname, useRouter } from "next/navigation";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  nationality: z.string().min(1, "Nationality is required"),
  hearAbout: z.string().min(1, "This field is required"),
  resume: z.any().optional(),
  jobid: z.string().min(1, "Job ID is required"),
  agreement1: z
    .boolean()
    .refine((val) => val, { message: "You must agree to this" }),
  agreement2: z.boolean().optional(),
  agreement3: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;
interface JobApplicationFormProps {
  jobId: string | number;
}
const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      agreement1: true,
      agreement2: true,
      agreement3: true,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [nationalities, setNationalities] = useState<
    { id: string; name: string }[]
  >([]);
  const [resumeFileName, setResumeFileName] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );
  useEffect(() => {
    if (jobId) {
      setValue("jobid", jobId.toString());
    }
  }, [jobId, setValue]);
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("/api/external/getCountries");
        const data = await res.json();
        const list = (data?.result || []).map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
        setNationalities(list);
      } catch (err) {
        console.error("Error loading countries:", err);
      }
    }
    fetchCountries();
  }, []);

  const onSubmit = async (data: any) => {
    setStatusMessage(null);
    setStatusType(null);

    try {
      const formData = new FormData();
      formData.append("jobid", data.jobid);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("nationality", data.nationality);
      formData.append("hearAbout", data.hearAbout);
      if (data.resume?.[0]) {
        formData.append("resume", data.resume[0]);
      }

      const res = await fetch("/api/external/sendJobs", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && !result.error) {
        setStatusMessage("Application submitted successfully!");
        setStatusType("success");
      } else {
        setStatusMessage("Submission failed. Please try again later.");
        setStatusType("error");
      }
    } catch (err) {
      setStatusMessage("An error occurred. Please try again.");
      setStatusType("error");
      console.error("Form submission error:", err);
    }
  };
  return (
    <div className="rounded-[16px] border-2 border-[#E35F27] bg-[rgba(227,95,39,0.03)] p-10">
      <h2 className="text-center text-3xl font-bold text-[#111954] mb-8">
        APPLY <span className="text-[#E35F27]">NOW</span>
      </h2>
      {statusMessage && (
        <div
          className={`mb-4 text-center text-sm font-semibold ${statusType === "success" ? "text-green-600" : "text-red-600"
            }`}
        >
          {statusMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="text-[18px] text-[#252525] font-normal mb-[10px] block font-['Open_Sans']">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("firstName")}
            placeholder="First name"
            className="w-full text-[18px] font-normal font-['Open_Sans'] border border-[#a6a6a64f] bg-white shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] p-[10px] h-[50px] rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-[18px] text-[#252525] font-normal mb-[10px] block font-['Open_Sans']">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("lastName")}
            placeholder="Family name"
            className="w-full text-[18px] font-normal font-['Open_Sans'] border border-[#a6a6a64f] bg-white shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] p-[10px] h-[50px] rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-[18px] text-[#252525] font-normal mb-[10px] block font-['Open_Sans']">
            Phone number <span className="text-red-500">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="AE"
                className="w-full text-[18px] font-normal font-['Open_Sans'] border border-[#a6a6a64f] bg-white shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] p-[10px] h-[50px] rounded"
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="text-[18px] text-[#252525] font-normal mb-[10px] block font-['Open_Sans']">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            {...register("nationality")}
            className="w-full text-[18px] font-normal font-['Open_Sans'] border border-[#a6a6a64f] bg-white shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] p-[10px] h-[50px] rounded"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your nationality
            </option>
            {nationalities.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
          {errors.nationality && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nationality.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-[18px] text-[#252525] font-normal mb-[10px] block font-['Open_Sans']">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            placeholder="Email address"
            className="w-full text-[18px] font-normal font-['Open_Sans'] border border-[#a6a6a64f] bg-white shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] p-[10px] h-[50px] rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-[18px] text-[#252525] font-normal mb-[10px] block font-['Open_Sans']">
            How did you hear about us? <span className="text-red-500">*</span>
          </label>
          <select
            {...register("hearAbout")}
            className="w-full text-[18px] font-normal font-['Open_Sans'] border border-[#a6a6a64f] bg-white shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] p-[10px] h-[50px] rounded-md"
            defaultValue=""
          >
            <option value="" disabled>
              How did you hear about us?
            </option>
            <option value="Referral">Referral</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Social media">Social media</option>
            <option value="Direct Email">Direct Email</option>
            <option value="Career Fair">Career Fair</option>
          </select>
          {errors.hearAbout && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hearAbout.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-[#111954] mb-1"
          >
            Upload Resume <span className="text-red-500">*</span>
          </label>

          <div className="relative flex items-center gap-4">
            {/* Hidden file input */}
            <input
              id="resume"
              type="file"
              {...register("resume")}
              className="hidden"
              onChange={(e) =>
                setResumeFileName(e.target.files?.[0]?.name || "")
              }
            />

            {/* Resume */}
            <label
              htmlFor="resume"
              className="fileLabelItem flex w-full items-center justify-center border border-[#a6a6a64f] bg-white opacity-100 
       shadow-[0px_20px_13px_0px_rgba(41,72,152,0.03),0px_8.148px_6.519px_0px_rgba(41,72,152,0.02)] 
       p-[10px] h-[50px] font-semibold py-2 px-4 rounded cursor-pointer hover:bg-orange-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
                width="20"
                height="20"
                viewBox="0 0 25 26"
                fill="none"
              >
                <path
                  d="M12.6539 11.6542C12.6356 11.63 12.6122 11.6103 12.5856 11.5968C12.5589 11.5833 12.5297 11.5763 12.5001 11.5763C12.4704 11.5763 12.4412 11.5833 12.4145 11.5968C12.3879 11.6103 12.3645 11.63 12.3462 11.6542L9.61187 15.2521C9.58933 15.282 9.57534 15.3179 9.57151 15.3558C9.56768 15.3936 9.57415 15.4318 9.5902 15.4659C9.60624 15.5001 9.63121 15.5289 9.66224 15.549C9.69327 15.5691 9.72912 15.5797 9.76568 15.5796H11.5699V21.7343C11.5699 21.846 11.6578 21.9374 11.7652 21.9374H13.23C13.3375 21.9374 13.4253 21.846 13.4253 21.7343V15.5822H15.2344C15.398 15.5822 15.4883 15.3867 15.3882 15.2546L12.6539 11.6542Z"
                  fill="#E35F27"
                />
                <path
                  d="M19.8096 9.31074C18.6914 6.24355 15.8423 4.0625 12.5049 4.0625C9.16748 4.0625 6.31836 6.24102 5.2002 9.3082C3.10791 9.87949 1.5625 11.8625 1.5625 14.2188C1.5625 17.0244 3.74756 19.2969 6.44287 19.2969H7.42188C7.5293 19.2969 7.61719 19.2055 7.61719 19.0938V17.5703C7.61719 17.4586 7.5293 17.3672 7.42188 17.3672H6.44287C5.62012 17.3672 4.84619 17.027 4.27002 16.41C3.69629 15.7955 3.39111 14.9678 3.41797 14.1096C3.43994 13.4393 3.65967 12.8096 4.05762 12.2789C4.46533 11.7381 5.03662 11.3445 5.67139 11.1693L6.59668 10.918L6.93604 9.98867C7.146 9.40977 7.43896 8.86895 7.80762 8.37891C8.17156 7.8932 8.60267 7.46624 9.08691 7.11191C10.0903 6.37813 11.272 5.98965 12.5049 5.98965C13.7378 5.98965 14.9194 6.37813 15.9229 7.11191C16.4087 7.46738 16.8384 7.89395 17.2021 8.37891C17.5708 8.86895 17.8638 9.4123 18.0737 9.98867L18.4106 10.9154L19.3335 11.1693C20.6567 11.54 21.582 12.7918 21.582 14.2188C21.582 15.0592 21.2671 15.8514 20.6958 16.4455C20.4156 16.7386 20.0823 16.971 19.7152 17.1292C19.3481 17.2874 18.9545 17.3683 18.5571 17.3672H17.5781C17.4707 17.3672 17.3828 17.4586 17.3828 17.5703V19.0938C17.3828 19.2055 17.4707 19.2969 17.5781 19.2969H18.5571C21.2524 19.2969 23.4375 17.0244 23.4375 14.2188C23.4375 11.865 21.897 9.88457 19.8096 9.31074Z"
                  fill="#E35F27"
                />
              </svg>
              <span
                className={`truncate text-center ${resumeFileName ? "text-black" : "text-[#cecece]"
                  }`}
              >
                {resumeFileName || "Upload your file here"}
              </span>
            </label>
          </div>

          {typeof errors.resume?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
          )}
        </div>
        <input type="hidden" {...register("jobid")} />
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-[#111954] hover:bg-[#E35F27] text-white font-semibold py-3 rounded transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
