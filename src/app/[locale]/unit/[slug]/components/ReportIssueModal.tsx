import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ReportIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    unitName: string;
    unitRef?: string;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose, unitName, unitRef }) => {
    const [issueType, setIssueType] = useState('');
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const receiver = "callcenter@psinv.net,yngwie.g@psinv.net";

            const formatIssueType = (type: string) => {
                const map: Record<string, string> = {
                    'price_incorrect': 'Price is not correct',
                    'unit_unavailable': 'Unit is not available',
                    'project_unavailable': 'Project is not available',
                    'wrong_information': 'Wrong Information',
                    'other': 'Other'
                };
                return map[type] || type;
            };

            const emailBody = `
                <table style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; border:1px solid #d9d9d9;">
                    <tr>
                        <td colspan="2" style="background:#0B4F63; color:#fff; font-weight:700; font-size:18px; padding:12px;">
                            Unit Issue Report
                        </td>
                    </tr>
                    <tr>
                        <td style="width:35%; border:1px solid #d9d9d9; padding:10px; font-weight:700;">Unit Name</td>
                        <td style="width:65%; border:1px solid #d9d9d9; padding:10px;">${unitName}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Unit Reference</td>
                        <td style="border:1px solid #d9d9d9; padding:10px;">${unitRef || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Issue Type</td>
                        <td style="border:1px solid #d9d9d9; padding:10px;">${formatIssueType(issueType)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Additional Details</td>
                        <td style="border:1px solid #d9d9d9; padding:10px;">${details || 'None provided'}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">URL</td>
                        <td style="border:1px solid #d9d9d9; padding:10px;">
                            <a href="${typeof window !== 'undefined' ? window.location.href : '#'}">${typeof window !== 'undefined' ? window.location.href : 'N/A'}</a>
                        </td>
                    </tr>
                </table>
            `;

            const mailRes = await fetch("https://registration.psinv.net/api/sendemail3.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    body: emailBody,
                    receiver,
                    subject: `Unit Issue Report - ${unitName}`,
                    fromName: "PSI Website",
                    filename: "",
                    filedata: "",
                }),
            });

            if (mailRes.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIssueType('');
                    setDetails('');
                    onClose();
                }, 2000);
            } else {
                console.error("Failed to send email report");
                alert("Failed to send the report. Please try again later.");
            }
        } catch (error) {
            console.error("Error sending report:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative dark:bg-gray-800 dark:border-neutral-800">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-500 dark:text-gray-300 transition-colors z-10"
                    aria-label="Close modal"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Report an Issue</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Help us improve by reporting any issues with <span className="font-semibold text-gray-700 dark:text-gray-300">{unitName}</span> {unitRef && `(${unitRef})`}.
                    </p>
                </div>

                <div className="p-6">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report Submitted</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Thank you for your feedback. We will look into this right away.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="issueType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Issue Type</label>
                                <select
                                    id="issueType"
                                    required
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors"
                                >
                                    <option value="" disabled>Select an issue...</option>
                                    <option value="price_incorrect">Price is not correct</option>
                                    <option value="unit_unavailable">Unit is not available</option>
                                    <option value="project_unavailable">Project is not available</option>
                                    <option value="wrong_information">Wrong Information</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="details" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Additional Details (Optional)</label>
                                <textarea
                                    id="details"
                                    rows={4}
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Please provide any additional context..."
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !issueType}
                                className="w-full bg-primary hover:bg-[#111954] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Report'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportIssueModal;
