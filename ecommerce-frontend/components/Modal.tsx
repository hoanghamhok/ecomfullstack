import React from "react";
export default function Modal({ isOpen, onClose, children }: 
            { isOpen: boolean; onClose: () => 
                void; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed z-40 inset-0 flex items-center 
                            justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[350px] text-gray-900">
        {children}
        {/*<div className="text-right mt-4">
          <button onClick={onClose} className="px-4 py-2 
                bg-gray-400 text-white rounded hover:bg-gray-500">
            
          </button>
        </div>*/}
      </div>
    </div>
  );
}