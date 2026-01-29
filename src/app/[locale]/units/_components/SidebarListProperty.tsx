'use client';
import DynamicForm from "../../_components/DynamicForm";

export default function SidebarListProperty() {

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 ">
            <h3 className="text-lg font-bold text-[#353455] mb-4">List Your Property</h3>
            <DynamicForm formType="propertyListing" />
        </div>
    );
}
